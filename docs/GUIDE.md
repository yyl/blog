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
├── functions/         # Cloudflare Pages Functions (serverless API)
│   └── api/
│       └── reactions.js  # Like/dislike reaction counts endpoint
│
├── static/            # Static assets (copied as-is to /public/)
│
├── themes/
│   └── paper/         # Paper theme (git submodule)
│
├── public/            # Generated site output (do not edit)
│
├── hugo.toml          # Site configuration
├── wrangler.toml      # Cloudflare Pages config (KV bindings)
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

**Data sources → charts:**

| YAML file | Section | Chart(s) | Type |
|-----------|---------|----------|------|
| `reading.yaml` | 📚 Reading | Articles Read (words bar + minutes line) | Combo (dual y-axis) |
| `books.yaml` | 📚 Reading | Books Finished | Bar |
| `travel.yaml` | 🗺️ Travel | Check-ins & Unique Places (bars + line markers) | Combo (single y-axis) |
| `movies.yaml` | 🎬 Movies | Movies Watched & Rating (bar + line) | Combo (dual y-axis) |
| `podcasts.yaml` | 🎧 Podcasts | Episodes Played; Feed Changes (added/removed) | Bar; Dual bar |
| `workouts.yaml` | 🏋️ Workout | Workouts & Minutes (bar + line) | Combo (dual y-axis) |
| `code.yaml` | 💻 Code | Monthly Commits; Lines Changed | Bar; Dual bar |

**Chart rendering details (in `activity.html`):**

- **`fillMonthGaps(data, fields)`** — utility that fills missing months with zeros so charts display a continuous timeline
- **Combo charts** use Chart.js mixed types (bar + line datasets) with `order` to draw lines in front of bars
- **Travel chart** uses a transparent bar with a top-border-only style to render Unique Places as disconnected horizontal line markers overlapping the Check-ins bars
- **Tooltips** on all combo charts use `interaction: { mode: 'index', intersect: false }` so hovering shows all data points for that month

### Navigation

Defined in `hugo.toml` under `[menu]`:

| Menu item   | URL          |
|-------------|--------------|
| About       | `/about/`    |
| My Activity | `/activity/` |

### Post Reactions (Like / Dislike)

Each blog post has 👍/👎 buttons that let visitors react. Counts are shared across all visitors.

**Architecture:**

- **Backend:** Cloudflare Pages Function at `functions/api/reactions.js`
- **Storage:** Cloudflare KV namespace bound as `REACTIONS`
- **Frontend:** Inline JS in `layouts/_default/single.html`, uses `localStorage` to remember each visitor's choice

**API:**

| Method | URL | Purpose |
|--------|-----|--------|
| `GET` | `/api/reactions?slug=<slug>` | Fetch current like/dislike counts |
| `POST` | `/api/reactions` | Submit or undo a reaction |

POST body: `{ slug, type: "like"|"dislike", undo?: true }`

KV key format: `reactions:<slug>` → `{ likes: N, dislikes: N }`

**Frontend behavior:**

- On page load, fetches counts via GET and restores active state from `localStorage`
- Clicking a button sends a POST, updates the count, and saves the choice to `localStorage`
- Clicking the same button again toggles it off (undo)
- Switching from like→dislike (or vice versa) undoes the old reaction first

**Cloudflare KV setup:**

1. Create a KV namespace named `REACTIONS` in the Cloudflare dashboard
2. Bind it to the Pages project: Settings → Functions → KV namespace bindings → Variable name `REACTIONS`
3. For local dev, the namespace ID goes in `wrangler.toml`; run `npx wrangler pages dev ./public`

### Theme

**Paper** – installed as a git submodule in `themes/paper/`. Custom layouts in `layouts/` override theme templates when filenames match.
