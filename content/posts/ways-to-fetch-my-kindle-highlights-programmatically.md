+++
date = '2025-07-22T21:05:54-07:00'
draft = false
title = 'Ways to Fetch Kindle Highlights Programmatically'
tags = ['Amazon', 'Kindle', 'API', 'Readwise', 'reading', 'reading stats', 'reading digest']
+++

Like many people, I read books on Kindle. It is the e-ink digital reader device from Amazon. [Kindle](https://www.amazon.com/b/?node=11627044011) also allows users to create highlights and notes while they are reading. Users can search and read highlights and notes they create either on Kindle or online at https://read.amazon.com/notebook. However, Amazon does not have an official Kindle API to pull highlights and notes programmatically. It kinda makes sense - 3rd-party services that consume Kindle highlights/notes do not benefit Amazon directly. 

But, people find workarounds to that - primarily two ways.

First is through a browser extension. It asks users to log in with their Amazon account, and then the extension essentially open the notebook website and scraps all the highlights and notes on user behalf. [Readwise](https://docs.readwise.io/readwise/docs/importing-highlights/kindle#how-do-i-download-the-readwise-chrome-extension), a platform for users to create and manage reading highlights, uses it. 

Another way is through a file created on the Kindle - `Clippings.txt`. This file contains all the highlights/notes that are created by the account currently registered on the specific Kindle. Services like [Clippings](https://www.clippings.io) (the name tells it all) work exactly like that: it asks users to get that file from their Kindle device and upload to their website. There are also [open source libraries](https://github.com/paperboi/kindle2notion) work that way. 