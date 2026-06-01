import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import CompassMark from './CompassMark';

const Footer = () => {
  const { language } = useContext(AppContext);

  const text = {
    en: {
      brand: 'DBT Compass',
      tagline: 'A diagnostic instrument for India\u2019s Direct Benefit Transfer ecosystem.',
      disclaimer1: 'Not affiliated with NPCI or any bank.',
      disclaimer2: 'Educational use only — no real data is transmitted.',
      year: 'All rights reserved',
      sections: { tools: 'Tools', resources: 'Resources' },
      links: {
        diagnostics: 'Run Diagnostic',
        learn: 'Learn how DBT works',
        home: 'Home',
      },
    },
    hi: {
      brand: 'DBT कंपास',
      tagline: 'भारत के डायरेक्ट बेनिफिट ट्रांसफर तंत्र के लिए एक निदान उपकरण।',
      disclaimer1: 'NPCI या किसी भी बैंक से संबद्ध नहीं है।',
      disclaimer2: 'केवल शैक्षिक उपयोग — कोई वास्तविक डेटा प्रसारित नहीं किया जाता।',
      year: 'सर्वाधिकार सुरक्षित',
      sections: { tools: 'उपकरण', resources: 'संसाधन' },
      links: {
        diagnostics: 'निदान चलाएं',
        learn: 'DBT कैसे काम करता है',
        home: 'होम',
      },
    },
  };
  const t = text[language];

  return (
    <footer className="relative mt-auto no-print">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rule to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-6">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <CompassMark size={36} />
              <span
                className="text-[1.35rem] text-ink tracking-tight"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontVariationSettings: '"opsz" 48, "wght" 500, "SOFT" 50',
                }}
              >
                {t.brand}
              </span>
            </Link>
            <p className="mt-5 max-w-md text-[0.92rem] leading-relaxed text-ink-soft">
              {t.tagline}
            </p>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-mute mb-4 font-sans font-medium">
              {t.sections.tools}
            </h4>
            <ul className="space-y-3">
              
              <li>
                <Link to="/diagnostics" className="text-[0.92rem] text-ink-soft hover:text-ink transition-colors">
                  {t.links.diagnostics}
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-[0.7rem] uppercase tracking-[0.2em] text-ink-mute mb-4 font-sans font-medium">
              {t.sections.resources}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/learn" className="text-[0.92rem] text-ink-soft hover:text-ink transition-colors">
                  {t.links.learn}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-rule flex justify-center text-center">
          <p className="text-[0.78rem] text-ink-mute tracking-tight">
            {t.disclaimer1} <span className="mx-2 text-rule">·</span> {t.disclaimer2}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
