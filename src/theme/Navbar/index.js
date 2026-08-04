import React from 'react';

/**
 * The article archive is part of 1200km, rather than a separate product.
 * Keep its navigation markup identical to the shared portfolio shell so the
 * archive inherits the same responsive menu, search trigger, and theme toggle.
 */
export default function Navbar() {
  return (
    <header id="top" className="site-header navbar" data-site-shell="standalone" data-site-shell-version="2026-07-24.1">
      <a className="skip-link" href="#__docusaurus_skipToContent_fallback">Skip to main content</a>
      <nav className="nav" aria-label="Primary navigation">
        <a className="brand" href="/">
          <img src="/assets/ap-logo.png" alt="" width="36" height="36" loading="lazy" decoding="async" />
          <span className="brand-copy"><strong>Andrey Pautov</strong><small>Security research</small></span>
        </a>
        <details className="nav-links" data-mobile-navigation>
          <summary className="nav-menu-toggle" aria-label="Open navigation" aria-controls="primary-nav-list">
            <span className="nav-menu-icon" aria-hidden="true"><span></span><span></span></span>
            <span className="nav-menu-text">Menu</span>
          </summary>
          <div className="nav-list" id="primary-nav-list">
            <a href="/cti.html">Research</a>
            <a className="active" aria-current="page" href="/guides.html">Library</a>
            <a href="/projects.html">Products &amp; Labs</a>
            <a className="nav-flagship" href="/adversarygraph/">AdversaryGraph</a>
            <details className="nav-more">
              <summary>More</summary>
              <div className="nav-more-list">
                <a href="/cyber-knowledge/">Cyber Knowledge</a>
                <a href="/about.html">About</a>
                <a href="/cv.html">CV</a>
                <a href="/external-validation.html">External validation</a>
              </div>
            </details>
          </div>
        </details>
        <div className="site-search-host site-search-host--standalone" data-site-search-theme data-search-state="loading" role="search" aria-label="Site search">
          <a className="site-search-fallback" data-site-search-control="fallback" href="/search.html" aria-label="Search all 1200km research">
            <span aria-hidden="true" className="site-search-fallback-icon"></span>
            <span className="site-search-fallback-text">Search research</span>
          </a>
        </div>
        <button className="theme-btn" id="theme-btn" type="button" aria-label="Toggle theme" title="Toggle theme">☀</button>
      </nav>
    </header>
  );
}
