import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="page-container">
      <header className="navbar">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1 className="logo">Steve Yang</h1>
        </Link>
        
        <nav className="nav-links">
          <Link to="/about">about</Link>
          <Link to="/work">work</Link>
          <Link to="/resume">resume</Link>
        </nav>
      </header>

      <main className="content">
        <p className="details">
          Hi! I'm Steve, and I'm currently studying Computer Science at UC Irvine.
        </p>
        
        <p className="details">
          Recently, I've been focused on full-stack development, cybersecurity, and machine learning. I built an asynchronous image processing backend called ZotImage, developed a spatial intelligence engine for Plotwise, and built an arbitrage prediction market trading bot from scratch.
        </p>
        
        <p className="details">
          On campus, I serve as the Tech Lead for the Google Developer Group and organize events as an Alumni and Academic committee member for the ICS Student Council. I am also a Frontend Developer for the EasyVM infrastructure platform for Cyber @ UCI.
        </p>

        <div className="social-links">
          <a href="https://linkedin.com/in/steveyang12" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>

          <a href="https://github.com/syang1290" target="_blank" rel="noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>

          <a href="mailto:stevie3518@gmail.com" aria-label="Email">
            <svg viewBox="0 0 24 24" className="icon">
              <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.39l-9 5.73-9-5.73V21H1.5C.65 21 0 20.35 0 19.5v-15c0-.42.17-.8.44-1.07C.71 3.17 1.09 3 1.5 3h1.16l9.34 5.94L21.34 3H22.5c.41 0 .79.17 1.06.44.27.27.44.65.44 1.07z"/>
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
}