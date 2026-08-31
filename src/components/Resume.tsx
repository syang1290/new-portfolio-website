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
          <h2 className="section-title">Work Experience</h2>
          <div className="resume-item">
            <div className="item-header">
              <strong>Tech Fellow @ CodePath</strong>
              <span>May 2026 – Present</span>
            </div>
            <ul className="resume-bullets">
              <li>Mentored 500+ students in Intermediate Cybersecurity (CYB102), providing comprehensive technical and facilitation assistance during active class sessions.</li>
              <li>Taught and applied industry-standard cybersecurity and network monitoring tools, including Wireshark, Docker, NGINX, Auditd, Snort, Splunk, and Catalyst.</li>
              <li>Structured peer breakout discussion questions and planned escalation workflows for 90+ breakout groups, reducing average technical blocker resolution time by 15%.</li>
            </ul>
          </div>

          <div className="resume-item">
            <div className="item-header">
              <strong>AI/ML Fellow @ Break Through Tech</strong>
              <span>June 2026 – Present</span>
            </div>
            <ul className="resume-bullets">
              <li>Selected from 4000+ applicants for a highly competitive fellowship focused on applying machine learning to practical tech industry challenges.</li>
              <li>Completed 100+ hours of rigorous coursework to earn a Machine Learning Foundations Certificate from Cornell University in preparation for an upcoming industry-partnered capstone project.</li>
              <li>Developed and trained machine learning models utilizing Python, Pandas, and Scikit-learn.</li>
           </ul>
          </div>

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
          </ul>
        </section>

      </main>
    </div>
  );
}