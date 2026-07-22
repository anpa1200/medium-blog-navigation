import React, {useMemo, useState} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import articleCatalog from '../data/article-catalog.json';

const PAGE_SIZE = 24;

function ArticleCard({article, routeBase}) {
  const articleUrl = `/${routeBase}/${article.local_path}`;
  return (
    <article className="article-card">
      <div className="article-card__topline">
        <span className="category-badge">{article.category}</span>
        <time className="article-date" dateTime={article.published_at}>
          {article.published_at}
        </time>
      </div>
      <h2><Link to={articleUrl}>{article.title}</Link></h2>
      {article.summary && <p>{article.summary}</p>}
      <dl className="article-evidence" aria-label="Preserved article material">
        <div><dt>Images</dt><dd>{article.images}</dd></div>
        <div><dt>Code blocks</dt><dd>{article.code_blocks}</dd></div>
      </dl>
      <div className="article-actions">
        <Link className="article-primary-link" to={articleUrl}>Read on 1200km</Link>
        <a href={article.source_url} rel="noopener noreferrer">Original source ↗</a>
      </div>
    </article>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  const routeBase = siteConfig.customFields.articleRouteBase;
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [year, setYear] = useState('all');
  const [visible, setVisible] = useState(PAGE_SIZE);

  const categories = useMemo(
    () => [...new Set(articleCatalog.map((article) => article.category))].sort(),
    [],
  );
  const years = useMemo(
    () => [...new Set(articleCatalog.map((article) => article.year))].sort().reverse(),
    [],
  );
  const totals = useMemo(
    () => articleCatalog.reduce(
      (result, article) => ({
        images: result.images + article.images,
        code: result.code + article.code_blocks,
      }),
      {images: 0, code: 0},
    ),
    [],
  );
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return articleCatalog.filter((article) => {
      const matchesQuery = !needle || [
        article.title,
        article.summary,
        article.category,
        article.published_at,
      ].join(' ').toLowerCase().includes(needle);
      return matchesQuery
        && (category === 'all' || article.category === category)
        && (year === 'all' || article.year === year);
    });
  }, [category, query, year]);

  const resetFilters = () => {
    setQuery('');
    setCategory('all');
    setYear('all');
    setVisible(PAGE_SIZE);
  };

  return (
    <Layout
      title="Security Research Articles"
      description="Read the complete local 1200km archive of security research articles, guides, labs, and case studies."
    >
      <main id="main-content">
        <header className="hero hero--blog">
          <div className="container">
          <p className="eyebrow">1200km research library</p>
          <h1>Security research articles, available locally.</h1>
          <p className="hero-subtitle">
            Browse the complete local archive of technical articles originally published by
            Andrey Pautov. Every card opens a full article on 1200km.com; Medium remains a
            secondary source link.
          </p>
          <dl className="archive-stats" aria-label="Article archive totals">
            <div><dt>Articles</dt><dd>{articleCatalog.length}</dd></div>
            <div><dt>Preserved images</dt><dd>{totals.images.toLocaleString()}</dd></div>
            <div><dt>Code/config blocks</dt><dd>{totals.code.toLocaleString()}</dd></div>
          </dl>
          <div className="hero-actions">
            <a className="button button--primary button--lg" href="#article-library">Browse articles</a>
            <Link className="button button--secondary button--lg" to={`/${routeBase}`}>Browse by year</Link>
            <a className="button button--outline button--lg" href="https://1200km.com/search.html">Search all 1200km research</a>
          </div>
          </div>
        </header>

        <section id="article-library" className="section" aria-labelledby="article-library-title">
          <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Full archive</p>
              <h2 id="article-library-title">Find an article</h2>
            </div>
            <p id="article-result-count" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? 'article' : 'articles'} found
            </p>
          </div>

          <form className="archive-filters" role="search" onSubmit={(event) => event.preventDefault()}>
            <label className="archive-search">
              <span>Search articles</span>
              <input
                type="search"
                value={query}
                placeholder="Search titles, summaries, topics, or years"
                onChange={(event) => { setQuery(event.target.value); setVisible(PAGE_SIZE); }}
                aria-describedby="article-result-count"
              />
            </label>
            <label>
              <span>Category</span>
              <select value={category} onChange={(event) => { setCategory(event.target.value); setVisible(PAGE_SIZE); }}>
                <option value="all">All categories</option>
                {categories.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <label>
              <span>Year</span>
              <select value={year} onChange={(event) => { setYear(event.target.value); setVisible(PAGE_SIZE); }}>
                <option value="all">All years</option>
                {years.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </label>
            <button className="button button--secondary" type="button" onClick={resetFilters}>Clear filters</button>
          </form>

          {filtered.length > 0 ? (
            <>
              <div className="article-grid">
                {filtered.slice(0, visible).map((article) => (
                  <ArticleCard key={article.id} article={article} routeBase={routeBase} />
                ))}
              </div>
              {visible < filtered.length && (
                <div className="load-more">
                  <button className="button button--primary button--lg" type="button" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                    Load more articles
                  </button>
                  <p>Showing {Math.min(visible, filtered.length)} of {filtered.length}</p>
                </div>
              )}
            </>
          ) : (
            <div className="empty-state">
              <h2>No matching articles</h2>
              <p>Try a broader search or clear the active filters.</p>
              <button className="button button--primary" type="button" onClick={resetFilters}>Clear filters</button>
            </div>
          )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
