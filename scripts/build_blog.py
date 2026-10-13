#!/usr/bin/env python3
"""Build static blog pages from Blog/inbox/*.txt.
First non-empty line is the title; remaining lines are the article.
"""
from datetime import date
from html import escape
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]
INBOX = ROOT / "Blog" / "inbox"
POSTS = ROOT / "Blog" / "posts"
INDEX = ROOT / "Blog" / "blog" / "index.html"
CSS = "../../css/apple.css?v=20261013-blog-feature"
JS = "../../js/apple.js?v=20261013-blog-feature"
ICON = "../../images/icon.png"
BASE_STYLE = """
.blog-shell{width:min(920px,calc(100% - 40px));margin:0 auto;padding:clamp(48px,8vw,100px) 0 90px}
.blog-eyebrow{font-size:.75rem;letter-spacing:.16em;text-transform:uppercase;opacity:.65}
.blog-heading{font-size:clamp(2.7rem,7vw,5.8rem);letter-spacing:-.065em;line-height:.98;margin:.35em 0 .45em}
.blog-intro{max-width:620px;line-height:1.7;opacity:.75;margin-bottom:46px}
.blog-list{display:grid;grid-template-columns:1fr;gap:0}
.blog-card{display:block;text-decoration:none;color:inherit;padding:25px 0;border-top:1px solid var(--line,rgba(128,128,128,.25))}
.blog-card h2{font-size:clamp(1.35rem,3vw,2rem);letter-spacing:-.035em;margin:0 0 10px}
.blog-card p{line-height:1.7;opacity:.75;margin:0 0 12px}
.blog-date{font-size:.78rem;opacity:.6}
.blog-empty{border:1px dashed var(--line,rgba(128,128,128,.35));border-radius:16px;padding:28px;line-height:1.7;opacity:.8}
.blog-article{width:min(760px,calc(100% - 40px));margin:0 auto;padding:clamp(48px,8vw,100px) 0 100px}
.blog-article h1{font-size:clamp(2.3rem,6vw,4.8rem);letter-spacing:-.06em;line-height:1.03;margin:.35em 0}
.blog-article .article-body{font-size:clamp(1.03rem,1.5vw,1.16rem);line-height:1.9;margin-top:42px;overflow-wrap:anywhere}
.blog-article .article-body p{margin:0 0 1.45em}
.blog-article .article-body img{display:block;width:100%;height:auto;max-height:620px;object-fit:cover;border-radius:16px;margin:30px auto 12px}
.blog-article .image-caption{font-size:.82rem;opacity:.65;margin-top:-2px;margin-bottom:30px}
.blog-back{display:inline-block;margin-top:36px}
@media(max-width:600px){.blog-shell,.blog-article{width:calc(100% - 36px)}}
/* Keep blog content comfortably inset even if global site CSS overrides main margins. */
html body main.blog-shell{box-sizing:border-box!important;width:calc(100% - 80px)!important;max-width:920px!important;margin-left:auto!important;margin-right:auto!important;padding-left:0!important;padding-right:0!important}
html body main.blog-article{box-sizing:border-box!important;width:calc(100% - 80px)!important;max-width:760px!important;margin-left:auto!important;margin-right:auto!important;padding-left:0!important;padding-right:0!important}
@media(max-width:700px){html body main.blog-shell,html body main.blog-article{width:calc(100% - 36px)!important}}

"""
def slugify(value):
    value = value.lower().strip()
    value = value.replace("ı", "i").replace("ğ", "g").replace("ü", "u").replace("ş", "s").replace("ö", "o").replace("ç", "c")
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return value or "blog-yazisi"

def published_date(path):
    try:
        value = subprocess.check_output(["git", "log", "-1", "--format=%cs", "--", str(path.relative_to(ROOT))], cwd=ROOT, text=True, stderr=subprocess.DEVNULL).strip()
        return date.fromisoformat(value) if value else date.today()
    except Exception:
        return date.today()

def paragraphs(text):
    blocks = re.split(r"\n\s*\n", text.strip())
    rendered = []
    for block in blocks:
        if not block.strip():
            continue
        stripped = block.strip()
        image_match = re.fullmatch(r"!\[([^\]]*)\]\((https?://[^\s)]+)\)", stripped)
        if image_match:
            alt, url = image_match.groups()
            rendered.append(f'<figure><img src="{escape(url, quote=True)}" alt="{escape(alt, quote=True)}" loading="lazy"><figcaption class="image-caption">{escape(alt)}</figcaption></figure>')
            continue
        lines = [escape(line.strip()) for line in block.splitlines() if line.strip()]
        rendered.append("<p>" + "<br>\n".join(lines) + "</p>")
    return "\n".join(rendered)

def document(title, content, page_title=None):
    description = escape(re.sub(r"<[^>]+>", " ", content)[:155], quote=True)
    return f'''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="{description}">
  <title>{escape(page_title or title)} — Güven ÇALIŞKAN</title>
  <link rel="icon" href="{ICON}">
  <link rel="stylesheet" href="{CSS}">
  <script>
    try{{const s=localStorage.getItem("siteTheme")||localStorage.getItem("theme");document.documentElement.dataset.theme=s||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}}catch(e){{}}
  </script>
  <style>{BASE_STYLE}</style>
</head>
<body>
  <header class="nav">
    <div class="nav-inner">
      <a class="brand" href="../../">Güven ÇALIŞKAN</a>
      <nav class="nav-links">
        <a href="../../">Home</a><a href="../../about.html">About</a><a href="../../resume.html">Resume</a><a href="../../projects.html">Projects</a><a href="../../art.html">Art</a><a class="active" href="../blog/index.html">Blog</a><a href="../../contact.html">Contact</a>
      </nav>
      <div class="nav-tools">
        <button class="theme" type="button" data-theme-toggle aria-label="Switch theme" aria-pressed="false">◐</button>
        <details class="mobile-menu"><summary aria-label="Open navigation">☰</summary><nav class="mobile-nav" aria-label="Mobile navigation">
          <a href="../../">Home</a><a href="../../about.html">About</a><a href="../../resume.html">Resume</a><a href="../../projects.html">Projects</a><a href="../../art.html">Art</a><a href="../blog/index.html">Blog</a><a href="../../contact.html">Contact</a>
        </nav></details>
      </div>
    </div>
  </header>
  {content}
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-copyright">GÜVEN ©<span data-current-year>2026</span></div>
        <div class="footer-made">Made with ❤️ &amp; ☕️</div>
      </div>
      <nav class="footer-nav" aria-label="Footer navigation">
        <a href="../../">Home</a>
        <a href="../../about.html">About</a>
        <a href="../../resume.html">Resume</a>
        <a href="../../projects.html">Projects</a>
        <a href="../../art.html">Art</a>
        <a href="../blog/index.html">Blog</a>
        <a href="../../contact.html">Contact</a>
      </nav>
      <div class="footer-actions">
        <a href="https://www.linkedin.com/in/guneyguven" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" title="LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.3 18H5.8V9.5h2.5ZM7 8.35a1.45 1.45 0 1 1 0-2.9 1.45 1.45 0 0 1 0 2.9ZM18.2 18h-2.5v-4.15c0-.99-.02-2.27-1.38-2.27-1.39 0-1.6 1.08-1.6 2.2V18h-2.5V9.5h2.4v1.16h.04a2.63 2.63 0 0 1 2.37-1.3c2.54 0 3.01 1.67 3.01 3.84Z"/></svg>
        </a>
        <a href="mailto:guneyguven@live.com" aria-label="Send email" title="Email">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5h17a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1h-17a1 1 0 0 1-1-1v-11a1 1 0 0 1 1-1Zm.6 2 7.9 6 7.9-6H4.1Zm15.4 9V9.8L12.6 15a1 1 0 0 1-1.2 0L4.5 9.8v6.7h15Z"/></svg>
        </a>
        <a class="footer-top" href="#" aria-label="Back to top" title="Back to top">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 14 7-7 7 7" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>
  </footer>
  <script src="{JS}" defer></script>
</body>
</html>
'''

def main():
    INBOX.mkdir(parents=True, exist_ok=True)
    POSTS.mkdir(parents=True, exist_ok=True)
    INDEX.parent.mkdir(parents=True, exist_ok=True)
    # All HTML files in Blog/posts are generated from the current inbox; remove stale outputs first.
    for generated in POSTS.glob("*.html"):
        generated.unlink()
    entries = []
    seen = set()
    for source in sorted(INBOX.glob("*.txt")):
        raw = source.read_text(encoding="utf-8-sig").strip()
        if not raw:
            continue
        lines = raw.splitlines()
        title_index = next((i for i, line in enumerate(lines) if line.strip()), None)
        if title_index is None:
            continue
        title = lines[title_index].strip().lstrip("#").strip()
        body = "\n".join(lines[title_index + 1:]).strip()
        slug = slugify(source.stem)
        if slug in seen:
            slug = slug + "-" + slugify(title)
        seen.add(slug)
        published = published_date(source)
        body_html = paragraphs(body) if body else "<p>Bu yazının içeriği hazırlanıyor.</p>"
        excerpt = re.sub(r"\s+", " ", body)[:190]
        article = f'''<main class="blog-article">
  <p class="blog-eyebrow">Writing · Ideas · Practice</p>
  <h1>{escape(title)}</h1>
  <div class="blog-date">{published.strftime("%d %B %Y")}</div>
  <div class="article-body">{body_html}</div>
  <a class="blog-back" href="../blog/index.html">← All articles</a>
</main>'''
        (POSTS / f"{slug}.html").write_text(document(title, article), encoding="utf-8")
        entries.append((published, title, excerpt, slug))
    entries.sort(key=lambda item: (item[0], item[1].lower()), reverse=True)
    if entries:
        cards = []
        for published, title, excerpt, slug in entries:
            extra = "…" if len(excerpt) >= 190 else ""
            cards.append(f'''<a class="blog-card" href="../posts/{escape(slug)}.html">
  <h2>{escape(title)}</h2>
  <p>{escape(excerpt)}{extra}</p>
  <span class="blog-date">{published.strftime("%d %B %Y")}</span>
</a>''')
        listing = '<div class="blog-list">\n' + "\n".join(cards) + '\n</div>'
    else:
        listing = '<div class="blog-empty">The first article is on its way. New writing will appear here soon.</div>'
    content = f'''<main class="blog-shell">
  <p class="blog-eyebrow">Notes · Ideas · Perspectives</p>
  <h1 class="blog-heading">Blog<span aria-hidden="true">.</span></h1>
  <p class="blog-intro">Writing on engineering, project management, artificial intelligence, Kaizen, digital transformation and the ideas connecting them.</p>
  {listing}
</main>'''
    INDEX.write_text(document("Blog", content), encoding="utf-8")
    print(f"Built {len(entries)} blog post(s).")

if __name__ == "__main__":
    main()
