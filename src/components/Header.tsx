import { Bookmark, Dumbbell } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useFitLog } from "../context/FitLogContext";
import Logo from "./Logo";
import "./Header.css";

export default function Header() {
  const { plan, savedIds } = useFitLog();
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />
        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            <Dumbbell size={16} /> Workouts
          </NavLink>
          <NavLink to="/my-plan" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
            My Plan
          </NavLink>
        </nav>
        <div className="header-stats">
          <span><Dumbbell size={14} /> Plan <b>{plan.length}</b></span>
          <span><Bookmark size={14} /> Saved <b>{savedIds.length}</b></span>
        </div>
      </div>
    </header>
  );
}