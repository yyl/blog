+++
date = '2025-02-20T06:37:30-08:00'
draft = true
title = 'Add RSS to My Site'
+++

- theme has a way to enable RSS, but that feed has only description, not full text, and it includes pages like About
- change it from `.Summary` to `.Content`

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