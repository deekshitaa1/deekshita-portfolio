import { forwardRef } from 'react';
import VariableFontText from './VariableFontText';
import './Experience.css';

const EXPERIENCE = [
  {
    number: '01',
    role: 'ARTIFICIAL INTELLIGENCE INTERN',
    company: 'TECHGLOBAL PRIVATE LIMITED',
    period: 'FEB 2026 — JUN 2026',
    type: 'HYBRID',
    description:
      'Worked on Python-based AI workflows involving data preparation, validation, feature engineering, model and application integration, and structured output handling.',
    skills:
      'Python · Machine Learning · APIs · Streamlit · Data Processing',
  },
  {
    number: '02',
    role: 'DATA SCIENCE INTERN',
    company: 'SABUDH FOUNDATION',
    period: 'JUL 2025 — DEC 2025',
    type: 'REMOTE',
    description:
      'Worked across data cleaning, preprocessing, exploratory data analysis, statistical analysis, feature engineering, SQL transformations, and reproducible machine learning workflows.',
    skills:
      'Python · Pandas · NumPy · SQL · EDA · Statistics · Scikit-learn',
  },
];

const Experience = forwardRef(function Experience(_props, ref) {
  return (
    <section
      ref={ref}
      className="experience-section"
      id="experience"
      aria-label="Experience"
    >
      <div className="experience-top">
        <span className="experience-kicker">
          EXPERIENCE / 01
        </span>

        <VariableFontText
          as="h2"
          className="experience-heading"
          text="Experience"
        />
      </div>

      <div className="experience-list">
        {EXPERIENCE.map((item) => (
          <article
            className="experience-item"
            key={item.number}
          >
            <div className="experience-number">
              {item.number}
            </div>

            <div className="experience-main">
              <div className="experience-meta">
                <span>{item.period}</span>
                <span>{item.type}</span>
              </div>

              <h3>{item.role}</h3>

              <div className="experience-company">
                {item.company}
              </div>

              <p>{item.description}</p>

              <div className="experience-skills">
                {item.skills}
              </div>
            </div>

            <div className="experience-arrow">
              ↗
            </div>
          </article>
        ))}
      </div>
    </section>
  );
});

export default Experience;
