import React from 'react';
import { Badge } from '../components/ui/Badge';
import { ContactForm } from '../components/forms/ContactForm';
import { Award, BookOpen, GraduationCap, MapPin, Mail, Github, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const experiences = [
    {
      period: '2022 — PRESENT',
      role: 'Pharmacist',
      company: 'Klinik Kesihatan Tanjong Sepat, Selangor (MOH)',
      points: [
        'Manage daily primary care pharmacy operations, including prescription screening, dispensing, and patient counseling.',
        'Handle clinic drug inventory, procurement, and supply management.',
        'Develop local digital tools to streamline clinical reference data and improve departmental workflow.',
      ],
    },
    {
      period: '2019 — 2022',
      role: 'Pharmacist',
      company: 'Klinik Kesihatan Felda Soeharto, Selangor (MOH)',
      points: [
        'Managed outpatient pharmacy services, medication supply chains, and patient counseling in a rural clinic setting.',
        'Co-authored clinical research on dietary supplement usage among rural Type 2 Diabetes patients.',
      ],
    },
    {
      period: '2015 — 2019',
      role: 'Pharmacist',
      company: 'Klinik Kesihatan Selisek, Selangor (MOH)',
      points: [
        'Handled daily outpatient pharmacy operations, cold-chain maintenance, and patient adherence counseling.',
      ],
    },
    {
      period: '2014 — 2015',
      role: 'Provisionally Registered Pharmacist (PRP)',
      company: 'Hospital Banting, Selangor (MOH)',
      points: [
        'Completed provisional rotations in inpatient, outpatient, ward pharmacy services, and extemporaneous compounding.',
      ],
    },
  ];

  const skillMatrix = [
    {
      category: 'CLINICAL OPERATIONS',
      items: [
        'Primary Care Pharmacy',
        'Outpatient Dispensing',
        'Chronic Disease Management',
        'Drug Inventory & Procurement',
      ],
    },
    {
      category: 'TECHNICAL STACK',
      items: [
        'React & Vite',
        'TypeScript & JavaScript',
        'FastAPI (Python)',
        'PostgreSQL & Supabase',
      ],
    },
    {
      category: 'DATA & SYSTEMS',
      items: [
        'Relational Normalization',
        'Indexing & Performance',
        'Client-Side Caching & PWA',
        'RESTful API Integration',
      ],
    },
    {
      category: 'PUBLIC HEALTH',
      items: [
        'Clinical Research',
        'Formulary Digitalization',
        'Antimicrobial Guidelines',
        'Workflow Optimization',
      ],
    },
  ];

  const publication = {
    title:
      'Herbal and Dietary Supplement Use among Patients with Type 2 Diabetes Mellitus (T2DM) from a Rural Region in Malaysia: A Cross-Sectional Study',
    authors:
      'Wan, A. G. T., Hing, N. Y. L., Koh, K. Y., Choong, K. E., Hassim, H., Mustar, M. F., Kamal, N. M., & Nasir, N. M. (2025)',
    journal: 'Malaysian Journal of Pharmacy, 11(1)',
  };

  return (
    <div className="flex flex-col gap-16 md:gap-24 pt-4">
      {/* Bio Header with Profile Photo */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 swiss-border-b pb-12 items-start">
        {/* Profile Card */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="swiss-border bg-swiss-white dark:bg-swiss-black p-3 flex flex-col gap-3">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-swiss-gray-800 dark:text-swiss-gray-300 border-b border-swiss-gray-200 dark:border-swiss-gray-800 pb-2 px-1">
              <span>[REF: PORTRAIT_01]</span>
              <span className="text-swiss-accent font-bold flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> VERIFIED PHARMACIST
              </span>
            </div>

            <div className="relative aspect-square w-full overflow-hidden swiss-border bg-swiss-gray-100 dark:bg-swiss-gray-900 group">
              <img
                src="/profile.jpg"
                alt="Muhammad Firdaus bin Mustar"
                className="h-full w-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-col gap-1 p-2 font-mono text-xs uppercase bg-swiss-gray-50 dark:bg-swiss-gray-900 border border-swiss-gray-200 dark:border-swiss-gray-800">
              <span className="font-bold text-swiss-black dark:text-swiss-white">
                MUHAMMAD FIRDAUS BIN MUSTAR
              </span>
              <span className="text-[11px] text-swiss-gray-800 dark:text-swiss-gray-300">
                B.PHARM (HONS) OTAGO // MOH MALAYSIA
              </span>
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs uppercase tracking-widest text-swiss-accent font-bold">
            <span>// CURRICULUM VITAE</span>
            <span className="flex items-center gap-1 text-swiss-gray-800 dark:text-swiss-gray-300 font-normal">
              <MapPin className="h-3.5 w-3.5 text-swiss-accent" />
              BANTING, SELANGOR, MALAYSIA
            </span>
          </div>

          <h1 className="font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-swiss-black dark:text-swiss-white">
            MUHAMMAD FIRDAUS BIN MUSTAR
          </h1>

          <p className="font-sans text-lg text-swiss-gray-800 dark:text-swiss-gray-300 leading-relaxed">
            Government pharmacist with over 10 years of MOH public healthcare experience across hospital and primary care clinic settings in Selangor. Core background in clinical pharmacy operations, primary care dispensing, and public health research, combined with hands-on software development in building custom applications, local-first PWAs, and database tooling for clinical and organizational workflows.
          </p>

          <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs text-swiss-gray-800 dark:text-swiss-gray-300 uppercase">
            <a href="mailto:firdausmustar@gmail.com" className="flex items-center gap-1.5 hover:text-swiss-accent transition-colors">
              <Mail className="h-4 w-4 text-swiss-accent" />
              <span>firdausmustar@gmail.com</span>
            </a>
            <span>//</span>
            <a href="https://github.com/stardaus" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-swiss-accent transition-colors">
              <Github className="h-4 w-4 text-swiss-accent" />
              <span>github.com/stardaus</span>
            </a>
          </div>
        </div>
      </section>

      {/* Education & Professional Registration */}
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-swiss-black dark:text-swiss-white flex items-center gap-3">
          <span className="text-swiss-accent">[01]</span>
          <span>EDUCATION & REGISTRATION</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="swiss-border p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-swiss-accent font-mono text-xs uppercase font-bold">
              <GraduationCap className="h-4 w-4" />
              <span>ACADEMIC QUALIFICATION</span>
            </div>
            <h3 className="font-sans text-lg font-bold text-swiss-black dark:text-swiss-white">
              Bachelor of Pharmacy (B.Pharm) (Hons)
            </h3>
            <p className="font-mono text-xs text-swiss-gray-800 dark:text-swiss-gray-300">
              University of Otago, New Zealand (2013)
            </p>
          </div>

          <div className="swiss-border p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-swiss-accent font-mono text-xs uppercase font-bold">
              <Award className="h-4 w-4" />
              <span>PROFESSIONAL REGISTRATION</span>
            </div>
            <h3 className="font-sans text-lg font-bold text-swiss-black dark:text-swiss-white">
              Registered Pharmacist
            </h3>
            <p className="font-mono text-xs text-swiss-gray-800 dark:text-swiss-gray-300">
              Pharmacy Board of Malaysia (Lembaga Farmasi Malaysia)
            </p>
          </div>
        </div>
      </section>

      {/* Professional Experience Timeline */}
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-swiss-black dark:text-swiss-white flex items-center gap-3">
          <span className="text-swiss-accent">[02]</span>
          <span>PROFESSIONAL EXPERIENCE</span>
        </h2>

        <div className="flex flex-col swiss-border">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`p-6 md:p-8 flex flex-col md:flex-row md:items-start justify-between gap-6 ${
                index !== experiences.length - 1 ? 'swiss-border-b' : ''
              }`}
            >
              <div className="font-mono text-xs text-swiss-accent font-bold uppercase tracking-wider md:w-48 shrink-0">
                {exp.period}
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-sans text-xl font-bold tracking-tight text-swiss-black dark:text-swiss-white">
                  {exp.role} <span className="text-swiss-gray-800 dark:text-swiss-gray-300 font-normal">@ {exp.company}</span>
                </h3>
                <ul className="flex flex-col gap-2 font-sans text-sm text-swiss-gray-800 dark:text-swiss-gray-300 leading-relaxed">
                  {exp.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-swiss-accent font-mono">▸</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research & Publications */}
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-swiss-black dark:text-swiss-white flex items-center gap-3">
          <span className="text-swiss-accent">[03]</span>
          <span>PUBLICATIONS & RESEARCH</span>
        </h2>

        <div className="swiss-border p-6 md:p-8 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-swiss-accent font-mono text-xs uppercase font-bold">
            <BookOpen className="h-4 w-4" />
            <span>JOURNAL PUBLICATION</span>
          </div>

          <h3 className="font-sans text-lg font-bold leading-snug text-swiss-black dark:text-swiss-white">
            {publication.title}
          </h3>

          <p className="font-mono text-xs text-swiss-gray-800 dark:text-swiss-gray-300">
            {publication.authors}
          </p>

          <span className="font-mono text-xs font-bold text-swiss-accent uppercase">
            {publication.journal}
          </span>
        </div>
      </section>

      {/* Technical Matrix */}
      <section className="flex flex-col gap-8">
        <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-swiss-black dark:text-swiss-white flex items-center gap-3">
          <span className="text-swiss-accent">[04]</span>
          <span>CORE COMPETENCIES & TECH MATRIX</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillMatrix.map(col => (
            <div key={col.category} className="swiss-border p-6 flex flex-col gap-4">
              <span className="font-mono text-xs uppercase tracking-wider font-bold text-swiss-accent">
                {col.category}
              </span>
              <div className="flex flex-col gap-2">
                {col.items.map(item => (
                  <span key={item} className="font-mono text-xs text-swiss-black dark:text-swiss-white">
                    ▸ {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Direct Contact Form */}
      <section className="flex flex-col gap-8 pt-8 swiss-border-t">
        <div className="flex flex-col gap-2">
          <h2 className="font-mono text-xl font-bold uppercase tracking-wider text-swiss-black dark:text-swiss-white flex items-center gap-3">
            <span className="text-swiss-accent">[05]</span>
            <span>DIRECT INQUIRY</span>
          </h2>
          <p className="font-sans text-sm text-swiss-gray-800 dark:text-swiss-gray-300">
            Interested in discussing a custom app, simple PWA for your organization, clinical workflow tool, or research collaboration? Feel free to send an inquiry using the form below.
          </p>
        </div>

        <div className="swiss-border p-6 md:p-10 bg-swiss-white dark:bg-swiss-black">
          <ContactForm />
        </div>
      </section>
    </div>
  );
};
