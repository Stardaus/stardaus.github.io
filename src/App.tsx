import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/layout/Layout';
import { SEOHead } from './components/seo/SEOHead';
import { Home } from './pages/Home';
import { Projects } from './pages/Projects';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';

function PageSEO() {
  const location = useLocation();
  
  if (location.pathname === '/') {
    return (
      <SEOHead
        title="Muhammad Firdaus bin Mustar | Pharmacist & App Builder"
        description="Government Pharmacist (MOH) with 10+ years of public healthcare experience in Selangor. Building practical software solutions, offline-first PWAs, and clinical workflow tools."
        type="website"
      />
    );
  }
  if (location.pathname === '/projects') {
    return (
      <SEOHead
        title="Clinical & Technical Projects"
        description="Searchable catalog of clinical PWA tools, FastAPI relational database applications, and published public health research."
        type="website"
      />
    );
  }
  if (location.pathname === '/about') {
    return (
      <SEOHead
        title="Curriculum Vitae | Muhammad Firdaus bin Mustar"
        description="Full Curriculum Vitae of Muhammad Firdaus bin Mustar, Registered Pharmacist (MOH) and Software Builder."
        type="website"
      />
    );
  }
  return null;
}

export function AppRoutes() {
  return (
    <Layout>
      <PageSEO />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </Router>
  );
}
