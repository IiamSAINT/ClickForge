/**
 * ClickForge API
 *
 * This is deliberately dependency-light for an MVP. JSON files are suitable
 * for a single Node process with low traffic; move the repository functions
 * to Postgres/Supabase before running more than one server instance.
 */
const crypto = require('crypto');
const express = require('express');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'subscribers.json');

fs.mkdirSync(DATA_DIR, { recursive: true });
for (const file of [LEADS_FILE, SUBSCRIBERS_FILE]) {
  if (!fs.existsSync(file)) fs.writeFileSync(file, '[]', { mode: 0o600 });
}

app.disable('x-powered-by');
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'frontend/dist')));

const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests. Please try again in a few minutes.' }
});

function clean(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function normaliseEmail(email) {
  const value = clean(email, 200).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : '';
}

function normaliseWebsite(website) {
  const value = clean(website, 200);
  if (!value) return '';
  try {
    const url = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return ['http:', 'https:'].includes(url.protocol) && url.hostname ? url.href : '';
  } catch {
    return '';
  }
}

function readJSON(file) {
  try {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

function writeJSON(file, records) {
  const temporaryFile = `${file}.${process.pid}.${crypto.randomUUID()}.tmp`;
  fs.writeFileSync(temporaryFile, JSON.stringify(records, null, 2), { mode: 0o600 });
  fs.renameSync(temporaryFile, file);
}

function makeId() {
  return crypto.randomUUID();
}

function adminOnly(req, res, next) {
  const configuredKey = process.env.ADMIN_KEY;
  const suppliedKey = req.get('x-admin-key') || '';
  if (!configuredKey || suppliedKey.length !== configuredKey.length ||
      !crypto.timingSafeEqual(Buffer.from(suppliedKey), Buffer.from(configuredKey))) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
}

async function notifyTeam(subject, lines) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.NOTIFICATION_FROM;
  const to = process.env.NOTIFICATION_TO;
  if (!apiKey || !from || !to) return;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: to.split(',').map((email) => email.trim()), subject, text: lines.join('\n') })
    });
    if (!response.ok) console.error('Lead notification could not be sent:', await response.text());
  } catch (error) {
    // The submission is already safely stored; a notification failure must not
    // turn it into a customer-facing error.
    console.error('Lead notification failed:', error.message);
  }
}

// Audit / contact requests from the multi-step site form.
app.post('/api/audit-request', formLimiter, (req, res) => {
  const body = req.body || {};
  if (body.honeypot) return res.status(200).json({ success: true });

  const companyName = clean(body.companyName, 200);
  const website = normaliseWebsite(body.website);
  const name = clean(body.name, 200);
  const email = normaliseEmail(body.email);
  const goal = clean(body.goal, 100) || 'Not specified';

  if (!companyName || !website || !name || !email) {
    return res.status(400).json({ error: 'Company name, a valid website, name, and email are required.' });
  }

  const now = new Date().toISOString();
  const lead = {
    id: makeId(), type: 'audit_request', status: 'new', companyName, website,
    goal, name, email, submittedAt: now, updatedAt: now
  };
  const leads = readJSON(LEADS_FILE);
  leads.push(lead);
  writeJSON(LEADS_FILE, leads);

  void notifyTeam(`New ClickForge audit request — ${companyName}`, [
    `Name: ${name}`, `Email: ${email}`, `Company: ${companyName}`,
    `Website: ${website}`, `Goal: ${goal}`
  ]);
  res.status(201).json({ success: true, message: 'Audit request received.' });
});

// Newsletter subscribers are one record per email. Re-subscribing restores an
// opted-out record instead of duplicating it.
app.post('/api/newsletter', formLimiter, (req, res) => {
  const body = req.body || {};
  if (body.honeypot) return res.status(200).json({ success: true });
  const email = normaliseEmail(body.email);
  if (!email) return res.status(400).json({ error: 'Enter a valid email address.' });

  const now = new Date().toISOString();
  const subscribers = readJSON(SUBSCRIBERS_FILE);
  const existing = subscribers.find((subscriber) => subscriber.email === email);
  if (existing) {
    existing.status = 'active';
    existing.updatedAt = now;
    delete existing.unsubscribedAt;
  } else {
    subscribers.push({ id: makeId(), email, status: 'active', source: 'website', subscribedAt: now, updatedAt: now });
  }
  writeJSON(SUBSCRIBERS_FILE, subscribers);
  res.status(201).json({ success: true, message: 'You are subscribed.' });
});

app.post('/api/newsletter/unsubscribe', formLimiter, (req, res) => {
  const email = normaliseEmail((req.body || {}).email);
  if (!email) return res.status(400).json({ error: 'Enter a valid email address.' });
  const subscribers = readJSON(SUBSCRIBERS_FILE);
  const subscriber = subscribers.find((record) => record.email === email);
  if (subscriber) {
    const now = new Date().toISOString();
    subscriber.status = 'unsubscribed';
    subscriber.unsubscribedAt = now;
    subscriber.updatedAt = now;
    writeJSON(SUBSCRIBERS_FILE, subscribers);
  }
  // Do not disclose whether an address was in the list.
  res.json({ success: true, message: 'If that address was subscribed, it has been removed.' });
});

// Internal operations endpoints. These should additionally be network-restricted
// by your host in production.
app.get('/api/leads', adminOnly, (req, res) => res.json(readJSON(LEADS_FILE)));
app.get('/api/subscribers', adminOnly, (req, res) => res.json(readJSON(SUBSCRIBERS_FILE)));

app.patch('/api/leads/:id', adminOnly, (req, res) => {
  const allowedStatuses = new Set(['new', 'contacted', 'qualified', 'won', 'lost', 'archived']);
  const status = clean((req.body || {}).status, 30);
  if (!allowedStatuses.has(status)) return res.status(400).json({ error: 'Invalid lead status.' });
  const leads = readJSON(LEADS_FILE);
  const lead = leads.find((record) => record.id === req.params.id);
  if (!lead) return res.status(404).json({ error: 'Lead not found.' });
  lead.status = status;
  lead.updatedAt = new Date().toISOString();
  writeJSON(LEADS_FILE, leads);
  res.json(lead);
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'frontend/dist/index.html')));
app.listen(PORT, () => console.log(`ClickForge server running → http://localhost:${PORT}`));
