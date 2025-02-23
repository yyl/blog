I have an outline below for my blog post "How I add RSS feed to my site". Please expand it into a proper article. Please try to write it in the style and voice of Michael Lynch's personal blog (https://mtlynch.io). I attached a file (mtlynch1.pdf) of an example post he writes as a reference if you can't find any. Please also write it so tech novice can read the post - explain technical concepts with relative easy and non-technical way. The article length is less important but keep it in a length such that readers can comfortably finish it within 10 minutes. Write it in markdown to preserve formatting and links.

- Tries [the RSS configuration provided by the theme](https://github.com/nanxiaobei/hugo-paper?tab=readme-ov-file#options) but there are two issues
  - the feed contains only a snippet of the content instead of the full content: I prefer the feed to deliver full content so that my subscribers do not need to come to my website to read them
  - the feed is the home feed and includes everything from my website including non-article pages like About page: I do not want to include non-Article pages since they are not readable content
- To fix both issues, I need to create a RSS template myself to override the default configuration
  - [the Hugo documentation on RSS](https://gohugo.io/templates/rss/) leads me to the [original template](https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/_default/rss.xml)
  - I copy and paste it into `section.rss.xml`, not `home.rss.xml` because I intend to include only the articles I write which are in the "posts" section
  - Hugo has the concept of home and section (see attachment)
  - I also need to change the template so it pulls the full content instead of just a snippet
  - It is straightforward: change the `.Summary` to `.Content` in the [line 55](https://github.com/gohugoio/hugo/blob/e07028cb90901931cd71a210f9d0b237d1bcc99f/tpl/tplimpl/embedded/templates/_default/rss.xml#L55) `<description>{{ .Content | transform.XMLEscape | safeHTML }}</description>`
  - With that, I should have a feed generated at `{my-website-url}/posts/index.xml` that includes the full content of all articles
- However adding the rss template to my project causes Cloudflare Pages to fail to build my website
  - Error message: `can't evaluate field XMLEscape in type interface {}`
  - The build log (code 1 below) shows it uses hugo v0.118.2 during the build
  - However, according to [this reply in a discussion on a similar issue](https://discourse.gohugo.io/t/problem-with-rss-xmlescape/47682/2), hugo adds support for `XMLEscape` in v0.121.0, newer than the version used in Cloudflare Pages
  - The [hugo documentation from Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#use-a-specific-or-newer-hugo-version) shows a way to specify the desired version needed, so I set it to be the latest v0.144.2
  - That resolves the build issue
- When it is built, I notice the RSS icon provided by the theme still shows `{my-website-url}/index.xml` aka home RSS, not section RSS
  - To make it point to the correct URL, I need to override the template the theme uses to generate this icon and its link
  - The one to override for my theme: `layouts/partials/header.html`
  - The specific part of the template that needs to be changed is in code 2 below
  - The first `if` controls the generation of URL that the RSS icon uses, so change it from `{{ `index.xml` | absURL }}` to `{{ `posts/index.xml` | absURL }}` should do the trick
- Finally my website has a RSS feed now!

## code 1
```
06:37:32.630  hugo v0.118.2-da7983ac4b94d97d776d7c2405040de97e95c03d+extended linux/amd64 BuildDate=2023-08-31T11:23:51Z VendorInfo=gohugoio
```

## code 2
```
href="{{ if eq . `rss` }}
        {{ `posts/index.xml` | absURL }}
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

## code 3
``` 
<item>
  <title>{{ .Title }}</title>
  <link>{{ .Permalink }}</link>
  <pubDate>{{ .PublishDate.Format "Mon, 02 Jan 2006 15:04:05 -0700" | safeHTML }}</pubDate>
  {{- with $authorEmail }}<author>{{ . }}{{ with $authorName }} ({{ . }}){{ end }}</author>{{ end }}
  <guid>{{ .Permalink }}</guid>
  <description>{{ .Content | transform.XMLEscape | safeHTML }}</description>
</item>
```    