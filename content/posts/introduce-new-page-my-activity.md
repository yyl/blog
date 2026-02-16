+++
date = '2026-02-15T20:35:44-08:00'
draft = false
title = 'Introduce New Page - My Activity'
tags = ["build", "hugo", "reading digest generator", "how-to", "coding", "HTML", "my activity", "ai"]
+++

I added a new page for this blog called "My Activity". You can access it at the top right of the page, and it looks like this:

![Screenshot of My Activity Page](/my_activity_page_intro.png)

The page contains data about some of my activities: reading (articles, blogs, news), movies watched, etc. There are five categories right now. All data come from various web services (e.g. reading data is from Readwise, travel data from Foursquare). 

To get these data, I built a simple program to periodically fetch data from all relevant services and store them into database ([codebase here](https://github.com/yyl/digital-footprint-dump)). It is straightforward but not trivial, because it needs to interact with different services, some provide APIs, others don't (so I rely on file export). It is also not technically challenging because all service interfaces are clearly defined, one just needs to understand and follow them. Such program is perfect for AI to write, and indeed AI wrote 100% of the code.

With data in the database, The program then pushes the data to my blog Github repo in Hugo format. The blog then renders the data into HTML graphs. 

Both the data fetching program and the graphs are built mostly by AI - I'm very impressed by what AI can do now in terms of coding. There are still issues like didn't update README.md to reflect the latest code change, didn't refactor duplicate code across classes, etc. But these are such minor issues that they don't affect functionality at all. I would write another blog specifically on AI coding agents later. 