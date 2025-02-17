+++
date = '2025-02-16T09:56:04-08:00'
draft = false
title = 'Give my website a name'
tags = ['howto', 'blog-setup', 'cloudflare-pages']
+++

My website has a name and a domain now, and looks like this:

![My website has a name now](/blog_screenshot_with_name.png)

This article talks about how I come up with the name and set up the website under the new domain.

The purpose of this site is so I can write. The reason I am writing is two: 1. remember stuff for me; 2. sharing stuff I did. It is basically a journal. The consistency of journaling and writing in general is chanllenging, so I want to keep my hopes low. All in all, "Mildly Journaling" sounds like what this site intends to be.

More importantly, the domain www.mildlyjournaling.com is available for cheap price ($10 a year). I bought the domain and followed [this instruction](https://developers.cloudflare.com/pages/configuration/custom-domains/) to map the domain to my website hosted on Cloudflare Pages. 

To change the name of the website so the content there actually says this name, I just modify the `hugo.toml` file in the root directory of the website files locally. Now the file looks like this:

```
languageCode = 'en-us'
title = 'Mildly Journaling'
theme = 'paper'
```

That's it!