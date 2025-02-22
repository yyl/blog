+++
date = '2025-02-20T06:37:30-08:00'
draft = true
title = 'Add RSS to My Site'
+++

- theme has a way to enable RSS, but that feed has only description, not full text, and it includes pages like About
- change it from `.Summary` to `.Content`
- version too old https://discourse.gohugo.io/t/problem-with-rss-xmlescape/47682/2
- cloudflare has an older hugo https://developers.cloudflare.com/pages/framework-guides/deploy-a-hugo-site/#:~:text=To%20use%20a%20specific%20or,is%20recommended%20for%20newer%20versions).
- but the theme still by default shows only home xml, not section xml: override the layouts/partials/header.html

```
06:37:32.630  hugo v0.118.2-da7983ac4b94d97d776d7c2405040de97e95c03d+extended linux/amd64 BuildDate=2023-08-31T11:23:51Z VendorInfo=gohugoio
```

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