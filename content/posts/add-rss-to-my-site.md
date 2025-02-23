+++
date = '2025-02-22T20:37:30-08:00'
draft = false
title = "Adding an RSS Feed to My Site"
tags = ['howto', 'blog-setup', 'cloudflare-pages', 'rss', 'hugo']
+++

I recently decided to add an RSS feed to my Hugo website. While it seemed straightforward at first, I ran into several gotchas that taught me more about Hugo's RSS system than I expected to learn.

## The simple solution that wasn't quite right

My Hugo theme, Paper, advertises built-in RSS support. I initially tried their [default RSS configuration](https://github.com/nanxiaobei/hugo-paper?tab=readme-ov-file#options), but it had two problems:

1. The feed only included snippets of each post instead of the full content. This meant subscribers had to click through to my site to read complete articles.
2. The feed included everything from my website, including non-article pages like my About page. I wanted the feed to focus only on my blog posts.

I could have lived with these limitations, but I prefer to give my readers the best possible experience. For me, that means allowing them to read full articles directly in their RSS reader.

## Creating a custom RSS template

To fix these issues, I needed to create my own RSS template. Hugo's [RSS documentation](https://gohugo.io/templates/rss/) pointed me to their [default RSS template](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/_default/rss.xml), which I could use as a starting point.

Here's where I learned something interesting about Hugo: it has two different types of RSS feeds. There's a "home" feed that includes all content and a "section" feed that only includes content from a specific section of your site.

Since I wanted my feed to include only blog posts, I created a template called `section.rss.xml` rather than `home.rss.xml`. This tells Hugo to generate the feed only for my "posts" section.

The modification to include full content instead of snippets was surprisingly simple. I just had to change one line in the template:

````xml
<description>{% raw %}{{ .Content | transform.XMLEscape | safeHTML }}{% endraw %}</description>
````

The key change was replacing `.Summary` with `.Content`. This tells Hugo to include the complete article text in the feed instead of just a preview.

## An unexpected build failure

Just when I thought I was done, Cloudflare Pages refused to build my site. The error message was cryptic:

```
Error: can't evaluate field XMLEscape in type interface {}
```

After some digging, I discovered that the `XMLEscape` function I was using wasn't available in the version of Hugo (v0.118.2) that Cloudflare Pages was using. The function was only added in Hugo v0.121.0.

Fortunately, Cloudflare Pages lets you [specify which Hugo version to use](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#use-a-specific-or-newer-hugo-version). I added this to my build configuration `HUGO_VERSION = "v0.144.2"`.

## One last tweak: fixing the RSS icon

With the build working, I noticed one final issue: the RSS icon in my site's header still pointed to the home feed (`/index.xml`) instead of my new section feed (`/posts/index.xml`).

To fix this, I needed to override the theme's header template. I copied the theme's `layouts/partials/header.html` to my site and modified the RSS link from `index.xml` to `posts/index.xml`:

```
href="{{ if eq . `rss` }}
        {{ `posts/index.xml` | absURL }} <--- change this line
      {{ else if eq . `mastodon` }}
        {{ index site.Params . }}
      {{ else }}
        {{ if eq . `threads` }}
          https://threads.net/
        {{ else if eq . `bluesky` }}
          https://bsky.app/profile/
          {{ else }}
            https://{{ . }}.com/
          {{ if eq . `linkedin` }}
            in/
          {{ end }}
        {{ end }}
        {{ index site.Params . }}
      {{ end }}"
```

This way, it generates the URL to be `{my-website-url}/posts/index.xml`, instead of `{my-website-url}/index.xml`. 

## The end result

After these changes, my site now has exactly the RSS feed I wanted:

- Full article content in the feed
- Only blog posts (no auxiliary pages)
- Proper RSS icon linking to the correct feed URL

While this took more work than I expected, I'm happy with the result. My readers can now enjoy my full articles directly in their RSS readers, which is exactly what I wanted.

The whole process taught me quite a bit about Hugo's RSS system and reminded me that even seemingly simple features can require diving deeper into a framework's internals than you might expect.

Let me know in the comments if you've had similar experiences setting up RSS feeds, or if you have any questions about the process!