import { useMemo, useState } from "react";
import blogs from "./blogs.json";

const categories = ["All", "Technology", "Lifestyle", "Creativity", "Travel"];

function BlogCard({ blog, onRead }) {
  return <article className="blog-card">
    <div className={`blog-art ${blog.color}`}><span>{blog.emoji}</span><small>{blog.category}</small></div>
    <div className="blog-content">
      <p className="meta">{blog.date} <span>·</span> {blog.readTime}</p>
      <h3>{blog.title}</h3>
      <p className="excerpt">{blog.excerpt}</p>
      <button className="read-link" onClick={() => onRead(blog)}>Read article <span>↗</span></button>
    </div>
  </article>;
}

function ArticleModal({ blog, onClose }) {
  if (!blog) return null;
  return <div className="modal-backdrop" onClick={onClose} role="presentation">
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
      <button className="close-button" onClick={onClose} aria-label="Close article">×</button>
      <div className={`modal-art ${blog.color}`}>{blog.emoji}</div>
      <p className="meta">{blog.category} · {blog.date} · {blog.readTime}</p>
      <h2 id="modal-title">{blog.title}</h2>
      <p>{blog.body}</p>
      <button className="primary-button" onClick={onClose}>Back to articles</button>
    </section>
  </div>;
}

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);

  const filteredBlogs = useMemo(() => blogs.filter((blog) => {
    const matchesCategory = activeCategory === "All" || blog.category === activeCategory;
    const text = `${blog.title} ${blog.excerpt} ${blog.category}`.toLowerCase();
    return matchesCategory && text.includes(search.toLowerCase().trim());
  }), [search, activeCategory]);

  return <div className="app-shell">
    <header className="topbar"><a className="brand" href="#top"><span className="brand-mark">l.</span> little blog</a><a className="top-link" href="#articles">Explore articles <span>↓</span></a></header>
    <main id="top">
      <section className="hero">
        <p className="overline">A LITTLE SPACE FOR BIG IDEAS</p>
        <h1>Stories for your<br /><em>curious mind.</em></h1>
        <p className="hero-copy">Notes on technology, creativity, everyday life, and the places that inspire us.</p>
        <a href="#articles" className="primary-button">Explore the blog <span>↘</span></a>
        <div className="hero-decoration" aria-hidden="true"><span>✳</span><span>✦</span><span>◌</span></div>
      </section>

      <section className="articles-section" id="articles">
        <div className="section-heading"><div><p className="overline">THE JOURNAL</p><h2>Latest articles</h2></div><p className="count">{filteredBlogs.length} articles</p></div>
        <div className="toolbar">
          <label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search articles..." aria-label="Search articles" /></label>
          <div className="filters" aria-label="Filter by category">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? "filter active" : "filter"}>{category}</button>)}</div>
        </div>
        {filteredBlogs.length > 0 ? <div className="blog-grid">{filteredBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} onRead={setSelectedBlog} />)}</div> :
          <div className="empty-state"><span>⌕</span><h3>No articles found</h3><p>Try another search or choose a different category.</p><button className="primary-button" onClick={() => {setSearch("");setActiveCategory("All");}}>Clear filters</button></div>}
      </section>
    </main>
    <footer className="footer"><a className="brand" href="#top"><span className="brand-mark">l.</span> little blog</a><p>A beginner React project · Built with curiosity.</p><a href="#top">Back to top ↑</a></footer>
    <ArticleModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
  </div>;
}
