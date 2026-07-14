import { useTheme } from "../../hooks/useTheme";
import { SECTIONS, NAV_PROGRESS } from "../../constants/sections";

interface NavbarProps {
  onNavigate: (progress: number) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  const { toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="nav-container">
        <a href="#" className="logo">
          <span className="logo-dot" />
          Gretel Rodriguez
        </a>
        <nav className="nav-menu">
          {SECTIONS.map((section, i) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="nav-link"
              id={`nav-link-${section.navLabel.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(NAV_PROGRESS[i]);
              }}
            >
              {section.navLabel}
            </a>
          ))}
        </nav>
        <div className="nav-status">
          <span className="status-indicator" />
          <span className="status-text">Scroll to control video scrubbing</span>
        </div>
        <button className="theme-toggle header-theme-toggle" id="theme-toggle" onClick={toggleTheme} aria-label="Toggle light/dark theme">
          <svg className="sun-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m2.12 2.12l4.24 4.24M1 12h6m6 0h6m-16.78 7.78l4.24-4.24m2.12-2.12l4.24-4.24" />
          </svg>
          <svg className="moon-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>
      </div>
    </header>
  );
}
