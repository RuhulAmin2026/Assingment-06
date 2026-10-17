import { Link } from "react-router-dom"; import "./Logo.css";

interface LogoProps { showWordmark?: boolean; }

export default function Logo({ showWordmark = true, }: LogoProps) { return ( <Link className="brand" to="/" aria-label="FitLog home"> <span className="brand__mark" aria-hidden="true"> <img
src="/images/logo/fitlog-logo.svg"
alt=""
/> </span>

  {showWordmark && (
    <span className="brand__word">
      FIT<span>LOG</span>
    </span>
  )}
</Link>


); }