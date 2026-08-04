import React from 'react';

export default function Footer() {
  return (
    <footer className="site-footer" data-site-shell="standalone" data-site-shell-version="2026-07-24.1">
      <div className="shared-footer-inner">
        <a className="shared-footer-brand" href="/">
          <img src="/assets/ap-logo.png" alt="" width="32" height="32" loading="lazy" decoding="async" />
          <span><strong>Andrey Pautov</strong><small>Security research</small></span>
        </a>
        <nav className="shared-footer-links" aria-label="Footer navigation">
          <a href="/cti.html">Research</a>
          <a href="/guides.html">Library</a>
          <a href="/projects.html">Products &amp; Labs</a>
          <a href="/adversarygraph/">AdversaryGraph</a>
          <a href="/about.html">About</a>
        </nav>
        <nav className="shared-footer-meta" aria-label="Site information">
          <a href="/privacy.html">Privacy / Data Handling</a>
          <a href="/about.html#contact">Contact</a>
          <a href="https://github.com/anpa1200" target="_blank" rel="noopener noreferrer">GitHub<span className="visually-hidden"> (opens in a new tab)</span><span aria-hidden="true"> ↗</span></a>
        </nav>
      </div>
      <div className="shared-footer-bottom">
        <span>© {new Date().getFullYear()} Andrey Pautov · Original research and tooling</span>
        <a href="#top" data-back-to-top>Back to top ↑</a>
      </div>
    </footer>
  );
}
