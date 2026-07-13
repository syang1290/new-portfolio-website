import { Link } from "react-router-dom";

export function Resume() {
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
        
        <section className="resume-section">
          <h2 className="section-title">Education</h2>
          <div className="resume-item">
            <div className="item-header">
              <strong>University of California - Irvine</strong>
              <span>GPA: 3.85/4.0</span>
            </div>
            <div className="item-sub">
              <span>B.S. Computer Science</span>
              <span>Expected June 2028</span>
            </div>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="section-title">Skills</h2>
          <ul className="skills-list">
            <li><strong>Languages:</strong> Java, Python, HTML, Javascript, TypeScript, CSS, SQL</li>
            <li><strong>Frameworks:</strong> FastAPI, Redis, Celery, TensorFlow, Flask, Vite/React, TailwindCSS, SQLite</li>
            <li><strong>Platforms:</strong> VS Code, GitHub, IntelliJ, Docker, AWS S3</li>
            <li><strong>Skills:</strong> Strong Communication, System Design and Leadership Skills</li>
          </ul>
        </section>

        <section className="resume-section">
          <h2 className="section-title">Projects</h2>
          
          <div className="resume-item">
            <div className="item-header">
              <strong>Plotwise</strong>
              <span className="tech-stack">React, FastAPI, TypeScript, OpenAI, Mapbox</span>
            </div>
            <ul className="resume-bullets">
              <li>Developed a spatial intelligence engine using React, FastAPI, and TypeScript to automate Accessory Dwelling Unit (ADU) feasibility analysis.</li>
              <li>Engineered a zoning parser with GPT-5-mini to extract architectural data from municipal information.</li>
              <li>Integrated Mapbox GL JS for interactive visualization and real time spatial data rendering.</li>
              <li>Architected a secure cloud infrastructure on Vercel and Render with CI/CD and CORS configurations.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="item-header">
              <strong>Invasive Species Detection Project</strong>
              <span className="tech-stack">TensorFlow, Flask, Python</span>
            </div>
            <ul className="resume-bullets">
              <li>Designed and trained a Convolutional Neural Network (CNN) using TensorFlow to identify 15+ invasive species, processing a dataset of 5,000+ images for high-precision classification.</li>
              <li>Developed a full-stack dashboard with Flask to visualize detection hotspots, aiding local ecologists in managing 2,000+ acres of natural habitat.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="item-header">
              <strong>American Sign Language Model</strong>
              <span className="tech-stack">JavaScript, PyScript, Google's Teachable Machines</span>
            </div>
            <ul className="resume-bullets">
              <li>Engineered a real-time computer vision application that translates ASL gestures into text with 90%+ accuracy, utilizing PyScript to run Python logic directly in the browser.</li>
              <li>Presented the prototype at Tufts University’s Engineering with AI event, demonstrating the potential for accessible communication tools in healthcare.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="item-header">
              <strong>ZotBlog: Blogging Platform API</strong>
              <span className="tech-stack">Python, Flask, SQLite</span>
            </div>
            <ul className="resume-bullets">
              <li>Developed a RESTful API with Flask supporting standard CRUD operations and custom search logic, handling data persistence for hundreds of unique blog entries.</li>
              <li>Designed a relational database schema in SQLite using indexing to optimize query performance for wildcard search terms across titles, categories, and tags.</li>
              <li>Standardized error handling and API documentation, ensuring consistent 201, 400, and 404 response codes for seamless integration with frontend clients.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="section-title">Work Experience</h2>
          <div className="resume-item">
            <div className="item-header">
              <strong>Lead Swim Instructor</strong>
              <span>June 2023 – Sept 2023</span>
            </div>
            <ul className="resume-bullets">
              <li>Developed and executed personalized lesson plans for 40+ students aged 4-12, tailoring coaching styles to individual learning paces and safety requirements.</li>
              <li>Spearheaded an annual opening day marketing initiative that increased program registration by 15% through community outreach and live demonstrations.</li>
            </ul>
          </div>
        </section>

        <section className="resume-section">
          <h2 className="section-title">Activities / Awards</h2>
          <ul className="activities-list">
            <li>
              <span><strong>UCI Google Development Group</strong> — Technical Lead</span>
              <span className="location">Irvine, CA</span>
            </li>
            <li>
              <span><strong>UCI ICS Student Council</strong> — AAA Committee Member</span>
              <span className="location">Irvine, CA</span>
            </li>
            <li>
              <span><strong>Cyber @ UCI</strong> — Infrastructure Team Member</span>
              <span className="location">Irvine, CA</span>
            </li>
            <li>
              <strong>USACO Silver | ACSL Finalist | Eagle Scout</strong>
            </li>
            <li>
              <span><strong>Cornell University</strong> — Online Certificate in Machine Learning Foundations</span>
              <span className="location">08/2026</span>
            </li>
          </ul>
        </section>

      </main>
    </div>
  );
}