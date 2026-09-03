import { forwardRef } from 'react';
import VariableFontText from './VariableFontText';
import './Skills.css';

const SKILLS = [
  {
    number: '01',
    title: 'DATA ANALYTICS',
    items:
      'Python · SQL · Pandas · NumPy · EDA · Data Cleaning · Data Validation · Statistics · Feature Engineering · Power BI · Data Visualization',
  },
  {
    number: '02',
    title: 'MACHINE LEARNING',
    items:
      'Scikit-learn · Regression · Classification · Clustering · Anomaly Detection · Predictive Analytics · Model Evaluation',
  },
  {
    number: '03',
    title: 'GENERATIVE AI',
    items:
      'LLMs · RAG · AI Agents · Prompt Engineering · Embeddings · Semantic Search · Information Retrieval · Document Intelligence',
  },
  {
    number: '04',
    title: 'DATA ENGINEERING',
    items:
      'PostgreSQL · MySQL · SQL Server · MongoDB · ETL/ELT · Data Pipelines · APIs · pgvector · Docker',
  },
  {
    number: '05',
    title: 'SOFTWARE ENGINEERING',
    items:
      'Python · TypeScript · JavaScript · React · FastAPI · Node.js · REST APIs · WebSockets · Git · Testing · Debugging',
  },
  {
    number: '06',
    title: 'CLOUD & TOOLS',
    items:
      'AWS · Google Cloud · GitHub · VS Code · Jupyter Notebook · Streamlit · Docker',
  },
];

const Skills = forwardRef(function Skills(_props, ref) {
  return (
    <section
      ref={ref}
      className="skills-section"
      id="skills"
      aria-label="Skills"
    >
      <div className="skills-header">
        <span className="skills-kicker">
          CAPABILITIES / 02
        </span>

        <VariableFontText
          as="h2"
          className="skills-heading"
          text="Skills"
        />
      </div>

      <div className="skills-grid">
        {SKILLS.map((skill) => (
          <article
            className="skill-card"
            key={skill.number}
          >
            <span className="skill-number">
              {skill.number}
            </span>

            <h3>{skill.title}</h3>

            <p>{skill.items}</p>
          </article>
        ))}
      </div>
    </section>
  );
});

export default Skills;
