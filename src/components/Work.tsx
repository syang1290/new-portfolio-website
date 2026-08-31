import { Link } from "react-router-dom";

export function Work() {
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
        <div className="project-list">
          
          <article className="project-item">
            <div className="project-header">
              <h2 className="project-title">Arbitrage Prediction Bot (Ongoing)</h2>
              <div className="project-links">
                <a href="https://github.com/syang1290/Prediction-Market-Arbitrage-Bot" target="_blank" rel="noreferrer" aria-label="GitHub Repo">
                  <svg viewBox="0 0 24 24" className="small-icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            <p className="project-description">
              Engineered a high-frequency arbitrage prediction bot entirely from scratch. Bypassing high-level trading libraries like PMXT, I designed bespoke quantitative models and a custom data pipeline to identify, predict, and execute cross-exchange arbitrage opportunities with strictly optimized latency constraints.
            </p>
          </article>


          <article className="project-item">
            <div className="project-header">
              <h2 className="project-title">Plotwise</h2>
              <div className="project-links">
                <a href="https://github.com/syang1290/PlotWise" target="_blank" rel="noreferrer" aria-label="View Project">
                  <svg viewBox="0 0 24 24" className="small-icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            <p className="project-description">
              Developed a spatial intelligence engine using React, FastAPI, and TypeScript to automate Accessory Dwelling Unit (ADU) feasibility analysis. It features a GPT-5-mini zoning parser to extract architectural data and Mapbox GL JS for interactive real-time spatial rendering, all deployed on a secure Vercel and Render cloud infrastructure.
            </p>
          </article>

          <article className="project-item">
            <div className="project-header">
              <h2 className="project-title">Invasive Species Detection Project</h2>
              <div className="project-links">
                <a href="#" target="_blank" rel="noreferrer" aria-label="GitHub Repo">
                  <svg viewBox="0 0 24 24" className="small-icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            <p className="project-description">
              Designed and trained a TensorFlow Convolutional Neural Network (CNN) on 5,000+ images to identify 15+ invasive species with high precision. I also built a full-stack Flask dashboard to visualize detection hotspots, aiding local ecologists in managing over 2,000 acres of natural habitat.
            </p>
          </article>

          <article className="project-item">
            <div className="project-header">
              <h2 className="project-title">American Sign Language Model</h2>
              <div className="project-links">
                <a href="https://swirlypath.pyscriptapps.com/asl-chatbot/latest/" target="_blank" rel="noreferrer" aria-label="Live PyScript Demo">
                  <svg viewBox="0 0 24 24" className="small-icon">
                    <path d="M12.001 2c-2.736 0-3.328.118-4.526.368-1.503.313-2.222 1.488-2.222 2.925v2.548h6.812v.707H5.215c-1.42 0-2.825.968-3.085 2.508-.189 1.127-.189 2.454 0 3.582.26 1.54 1.666 2.507 3.085 2.507h1.492v-2.316c0-1.874 1.545-3.411 3.447-3.411h4.636a2.036 2.036 0 0 0 2.029-2.035v-4.14C16.819 3.09 15.395 2 12.001 2zm-1.82 2.652c.456 0 .825.368.825.824 0 .456-.369.824-.825.824a.825.825 0 0 1-.825-.824c0-.456.369-.824.825-.824zm7.625 4.146c-1.42 0-2.825.967-3.085 2.507-.189 1.128-.189 2.455 0 3.582.26 1.54 1.665 2.508 3.085 2.508h2.094v2.09c0 1.258-1.424 2.217-4.168 2.217-2.744 0-3.328-.118-4.526-.368-1.502-.313-2.222-1.488-2.222-2.925v-1.123H6.847v1.895c0 1.83 1.426 2.915 3.327 3.326 1.272.274 2.146.369 5.011.369 2.865 0 3.74-.095 5.011-.369 1.901-.411 3.328-1.496 3.328-3.326v-5.632c0-1.875-1.545-3.412-3.447-3.412h-4.636a2.036 2.036 0 0 0-2.029 2.036v4.14c0 .878-.718 1.595-1.596 1.595h-1.603a1.597 1.597 0 0 1-1.596-1.595v-4.14c0-1.874 1.546-3.411 3.447-3.411h5.362v-1.393zm-3.666 8.547c.456 0 .825.368.825.825 0 .456-.369.824-.825.824a.825.825 0 0 1-.825-.824c0-.457.369-.825.825-.825z"/>
                  </svg>
                </a>
              </div>
            </div>
            <p className="project-description">
              Engineered a real-time computer vision application that translates ASL gestures into text with over 90% accuracy by utilizing PyScript to run Python logic directly in the browser. I presented this prototype at Tufts University’s Engineering with AI event.
            </p>
          </article>

          <article className="project-item">
            <div className="project-header">
              <h2 className="project-title">ZotBlog API</h2>
              <div className="project-links">
                <a href="https://github.com/syang1290/ZotBlog" target="_blank" rel="noreferrer" aria-label="GitHub Repo">
                  <svg viewBox="0 0 24 24" className="small-icon"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
            <p className="project-description">
              Developed a RESTful Flask API supporting standard CRUD operations and custom search logic to handle data persistence for hundreds of blog entries. The backend utilizes an optimized SQLite relational schema and standardized HTTP response codes for seamless frontend integration.
            </p>
          </article>

        </div>
      </main>
    </div>
  );
}