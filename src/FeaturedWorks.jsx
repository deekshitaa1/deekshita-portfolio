import { forwardRef, useEffect, useRef, useState } from 'react';
import VariableFontText from './VariableFontText';
import './FeaturedWorks.css';

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/*
 * Featured portfolio projects
 *
 * Layout:
 * 01 — AIM                  → full width
 * 02 — OmniRAG              → half width
 * 03 — NexoraAgri           → half width
 * 04 — CodeSync             → full width
 *
 * The existing Dossier layout/animation is preserved.
 */

const PROJECTS = [
  {
    seed: 'aim',
    span: 'big',
    name: 'AIM',
    category: 'COMMERCIAL INTELLIGENCE',
    description:
      'An end-to-end commercial analytics platform transforming prospect and conversion data into actionable business intelligence through exploratory analysis, predictive modeling, segmentation, anomaly detection, dashboards, and APIs.',
    tech:
      'Python · SQL · PostgreSQL · FastAPI · Power BI · Scikit-learn',
    link: 'https://aim-commercial-intelligence-dashboard.onrender.com/',
    repo: 'https://github.com/deekshitaa1/AIM-Commercial-Intelligence',
  },

  {
    seed: 'omnirag',
    span: 'half',
    name: 'OmniRAG',
    category: 'ENTERPRISE RAG PLATFORM',
    description:
      'An enterprise-oriented retrieval pipeline for document ingestion, extraction, chunking, embeddings, vector storage, and semantic retrieval using PostgreSQL and pgvector.',
    tech:
      'Python · FastAPI · PostgreSQL · pgvector · Embeddings',
    repo: 'https://github.com/deekshitaa1/OmniRAG',
  },

  {
    seed: 'nexoraagri',
    span: 'half',
    name: 'NexoraAgri',
    category: 'AGRICULTURAL DECISION INTELLIGENCE',
    description:
      'An agricultural decision-intelligence application combining soil, crop, moisture, rainfall, and weather data with machine learning to generate data-driven recommendations.',
    tech:
      'Python · Pandas · NumPy · Scikit-learn · Streamlit',
    repo: 'https://github.com/deekshitaa1/NexoraAgri',
  },

  {
    seed: 'codesync',
    span: 'big',
    name: 'CodeSync',
    category: 'REAL-TIME COLLABORATIVE IDE',
    description:
      'A real-time collaborative browser IDE enabling multiple users to code together through shared rooms, synchronized editing, presence, cursor tracking, and WebSocket communication.',
    tech:
      'TypeScript · React · Node.js · Python · WebSockets',
    link: 'https://codesync-1-goz9.onrender.com/',
    repo: 'https://github.com/deekshitaa1/CodeSync',
  },
];

/*
 * Generates a stable visual when an actual project screenshot
 * has not yet been added to the assets folder.
 *
 * This avoids the old random picsum.photos placeholders.
 */
const PROJECT_VISUALS = {
  aim: {
    title: 'AIM',
    label: 'COMMERCIAL INTELLIGENCE',
    metric: '$1.127B',
    metricLabel: 'EXPECTED REVENUE',
  },

  omnirag: {
    title: 'OmniRAG',
    label: 'RETRIEVAL PIPELINE',
    metric: 'RAG',
    metricLabel: 'SEMANTIC RETRIEVAL',
  },

  nexoraagri: {
    title: 'NexoraAgri',
    label: 'DECISION INTELLIGENCE',
    metric: 'ML',
    metricLabel: 'DATA-DRIVEN RECOMMENDATIONS',
  },

  codesync: {
    title: 'CodeSync',
    label: 'COLLABORATIVE IDE',
    metric: 'LIVE',
    metricLabel: 'REAL-TIME SYNC',
  },
};

function ProjectVisual({ seed, name }) {
  const visual = PROJECT_VISUALS[seed];

  return (
    <div
      className={`proj-visual proj-visual--${seed}`}
      aria-label={`${name} project preview`}
    >
      <div className="proj-visual-grid" />

      <div className="proj-visual-content">
        <span className="proj-visual-label">
          {visual?.label || 'DATA & AI ENGINEERING'}
        </span>

        <div className="proj-visual-center">
          <strong>{visual?.metric || name}</strong>

          <span>
            {visual?.metricLabel || 'PROJECT'}
          </span>
        </div>

        <div className="proj-visual-system">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="proj-visual-name">
        {visual?.title || name}
      </div>
    </div>
  );
}

function Slide({
  seed,
  span,
  side = 'left',
  photo,
  fit,
  name,
  category,
  description,
  tech,
  link,
  repo,
}) {
  const projectImage = photo || null;

  return (
    <article
      className={[
        'proj-slide',
        `proj-slide--${span}`,
        `proj-slide--from-${side}`,
        fit === 'contain' ? 'proj-slide--contain' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="proj-media">
        {projectImage ? (
          <img
            src={projectImage}
            alt={`${name} project preview`}
            loading="lazy"
            draggable="false"
          />
        ) : (
          <ProjectVisual
            seed={seed}
            name={name}
          />
        )}
      </div>

      <div className="proj-info">
        <span
          className="proj-line"
          aria-hidden="true"
        />

        <div className="proj-heading">
          <span className="proj-category">
            {category}
          </span>

          <h3 className="proj-name">
            {name}
          </h3>
        </div>

        <p className="proj-desc">
          {description}
        </p>

        <p className="proj-tech">
          {tech}
        </p>

        <div className="proj-links">
          {link && link !== '#' && (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
            >
              Live Project ↗
            </a>
          )}

          {repo && repo !== '#' && (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

const FeaturedWorks = forwardRef(function FeaturedWorks(
  _props,
  ref
) {
  const projectsRef = useRef(null);
  const [modal, setModal] = useState(null);

  /*
   * Close modal with Escape and prevent background scrolling.
   * Kept for compatibility if video/media expansion is added later.
   */
  useEffect(() => {
    if (!modal) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setModal(null);
      }
    };

    document.addEventListener('keydown', onKeyDown);

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener(
        'keydown',
        onKeyDown
      );

      document.body.style.overflow =
        previousOverflow;
    };
  }, [modal]);

  /*
   * Dossier-style scroll reveal.
   */
  useEffect(() => {
    const root = projectsRef.current;

    if (!root) return;

    const slides = Array.from(
      root.querySelectorAll('.proj-slide')
    );

    if (prefersReducedMotion) {
      slides.forEach((slide) => {
        slide.classList.add('is-in');
      });

      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            'is-in',
            entry.isIntersecting
          );
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    slides.forEach((slide) => {
      observer.observe(slide);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={ref}
      className="fw-section"
      id="projects"
      aria-label="Featured Works"
    >
      <VariableFontText
        as="h2"
        className="fw-heading"
        text="Featured Works"
      />

      <div
        className="fw-projects"
        ref={projectsRef}
      >
        {/* =========================================
            PROJECT 01 — AIM
            Full-width
        ========================================== */}

        <Slide
          {...PROJECTS[0]}
          side="left"
        />

        {/* =========================================
            PROJECTS 02 + 03
            Two-column layout
        ========================================== */}

        <div className="proj-row">
          <Slide
            {...PROJECTS[1]}
            side="left"
          />

          <Slide
            {...PROJECTS[2]}
            side="right"
          />
        </div>

        {/* =========================================
            PROJECT 04 — CODESYNC
            Full-width
        ========================================== */}

        <Slide
          {...PROJECTS[3]}
          side="right"
        />
      </div>

      {/* =========================================
          Optional media modal
          Currently unused because projects use
          static visual previews.
      ========================================== */}

      {modal && (
        <div
          className="fw-modal"
          role="dialog"
          aria-modal="true"
          aria-label={modal.name}
          onClick={() => setModal(null)}
        >
          <button
            type="button"
            className="fw-modal-close"
            onClick={(event) => {
              event.stopPropagation();
              setModal(null);
            }}
            aria-label="Close"
          >
            &times;
          </button>

          {modal.src && (
            <video
              src={modal.src}
              autoPlay
              loop
              playsInline
              controls={false}
              onClick={(event) =>
                event.stopPropagation()
              }
            />
          )}
        </div>
      )}
    </section>
  );
});

export default FeaturedWorks;
