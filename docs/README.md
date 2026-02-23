Hugo site using the [Paper](https://github.com/nanxiaobei/hugo-paper) theme.  
**URL:** https://www.mildlyjournaling.com/

---

## Directory Layout

```
blog/
├── archetypes/        # Templates for new content
│   └── default.md     # Default front matter for `hugo new`
│
├── content/           # All site content (Markdown)
│   ├── about.md       # /about/ page
│   ├── activity.md    # /activity/ page (uses custom layout)
│   └── posts/         # Blog posts → /posts/<slug>/
│       └── *.md       # Individual posts (67 files)
│
├── data/              # Structured data files (accessible via .Site.Data)
│   └── activity/      # YAML data powering the Activity page charts
│
├── layouts/           # Custom templates (override theme defaults)
│   ├── _default/      # Default layout overrides
│   │   ├── single.html      # Single post template
│   │   ├── taxonomy.html    # Taxonomy list page
│   │   ├── term.html        # Taxonomy term page
│   │   └── section.rss.xml  # Custom RSS feed
│   ├── page/
│   │   └── activity.html    # Custom layout for /activity/
│   └── partials/
│       ├── header.html      # Site header partial
│       └── footer.html      # Site footer partial
│
├── static/            # Static assets (copied as-is to /public/)
│
├── themes/
│   └── paper/         # Paper theme (git submodule)
│
├── public/            # Generated site output (do not edit)
│
├── hugo.toml          # Site configuration
└── prompt/            # Misc prompts / notes
```

---

## Key Concepts

### Content → Layout Mapping

| Content file          | Layout used                          | URL            |
|-----------------------|--------------------------------------|----------------|
| `content/about.md`    | Theme default (`single.html`)        | `/about/`      |
| `content/activity.md` | `layouts/page/activity.html`         | `/activity/`   |
| `content/posts/*.md`  | `layouts/_default/single.html`       | `/posts/<slug>/` |

The `activity.md` page uses `layout: activity` in its front matter, which tells Hugo to use `layouts/page/activity.html`.

### Data Files

Files in `data/activity/` are YAML arrays of monthly records. They are loaded into templates via `{{ .Site.Data.activity.<name> }}` and rendered as Chart.js charts on the Activity page.

Each YAML file follows the same pattern:

```yaml
- month: "2025-01"
  field_1: 42
  field_2: 100
```

### Navigation

Defined in `hugo.toml` under `[menu]`:

| Menu item   | URL          |
|-------------|--------------|
| About       | `/about/`    |
| My Activity | `/activity/` |

### Theme

**Paper** – installed as a git submodule in `themes/paper/`. Custom layouts in `layouts/` override theme templates when filenames match.
