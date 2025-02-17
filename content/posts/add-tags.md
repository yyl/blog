+++
date = '2025-02-17T20:00:01-08:00'
draft = false
title = 'How I add tags to the posts'
tags = ['howto', 'blog-setup', 'tags']
+++

I added tags to my posts so that each post has its own set of tags to give you an idea what the content is about. It looks like this at the bottom of the post:

![Tags in a post](/tags_screenshot.png)

In fact, Hugo has tags support by default. The system is called [Taxonomies](https://gohugo.io/content-management/taxonomies/). It allows users to freely define categorizations that can be used to classify the content. For example, if my blog is movie reviews, then I can create a Taxonomy called genre, and label each post based on the type of the movie it reviews. The good news is Hugo creates a Taxonomy called `tags` already for users (as well as `categorization`). To add tags to a post, I just need to put them in the front matter of the post. The code below shows the front matter of this post with tags added:

```
+++
date = '2025-02-16T20:00:01-08:00'
draft = true
title = 'I add tags to the posts'
tags = ['howto', 'blog-setup', 'tags']
+++
```

With tags on each post, there are 2 more features I can add. The first one is to list all tags used in my blog, and it looks like this:

![A page showing all tags created](/taxonomy_list_screenshot.png)

To enable this, I simply add [this template](https://gohugo.io/templates/taxonomy/) provided by Hugo to my site at `my-hugo-site/layouts/_default/taxonomy.html`. 

Another one is to show all the posts that use a particular tag when someone clicks a tag in the post, and it looks like this:

![A page showing all posts use this tag](/term_page_screenshot.png)

To enable this, I add [another Hugo template](https://gohugo.io/templates/term/) to my site as a file at `my-hugo-site/layouts/_default/term.html`. A `term` means a key or an item of a certain taxonomy - in the `tags` taxonomy, it means a tag. 

One issue I notice after setting everything up is the link of each tag in a post is wrong. It should look like `{my-website-url}/tags/{the-tag-name}`, so that when someone clicks it it takes them to the `term` page I add above. Instead, it looks like `{my-website-url}posts/{this-post}/tags/{the-tag-name}`, resulting a `page not found (404)` error if I click it. The root cause is in the Hugo theme I use. In its post template, it uses `tags/{the-tag-name}` as the hyperlink instead of `/tags/{the-tag-name}`: the former is always treated as the postfix to be appended to the **current URL** (the post link), while the latter to the root URL (my website url). Adding the forward slash fixes the issue. 

Although to fix the issue, I have to copy and paste the template in question (`my-hugo-site/themes/paper/layouts/_default/single.html`) to my template folder (`my-hugo-site/layouts/_default/single.html`) to modifty it so that the latter overrides the former when Hugo generates the website. 
