import { Link } from 'react-router-dom';

type BrandProps = {
  inverse?: boolean;
  onClick?: () => void;
};

const Brand = ({ inverse = false, onClick }: BrandProps) => (
  <Link to="/" onClick={onClick} className={`brand ${inverse ? 'brand--inverse' : ''}`} aria-label="ClickForge home">
    <img src="/assets/logo-mark.png" alt="ClickForge" />
  </Link>
);

export default Brand;
