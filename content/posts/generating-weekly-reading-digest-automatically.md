+++
date = '2025-10-10T08:37:50-07:00'
draft = false
title = 'Generating Weekly Reading Digest Automatically'
tags = ["automation", "build", "hugo", "google cloud", "Readwise", "Readwise api", "Github API", "Gemini", "reading digest generator", "how-to", "coding"]
+++

I have Gemini build a simple cloud application for me that generates a reading digest post automatically every Friday. The posts look like [this]({{< ref "2025-09-27-weekly-reading-digest.md" >}}). Each post includes the list of articles read, the list of highlights/notes made, basic stats like count of words read and metadata like count of tags in the articles read. The code that does the work is [here on Github](https://github.com/yyl/weekly-digest).

My motivation mainly is to keep track of what I have read. I constantly find myself not remembering what did I read throughout the week - mostly are news and articles from subscriptions. The digest gives myself a rough idea of the reading each week, and hopefully it's useful in the future for reference purposes.

The fact that most of my readings goes into one app ([Readwise](https://readwise.io/read)) which also offers [free APIs](https://readwise.io/api_deets) to pull reading history makes this possible. The system roughly works like this:

1. A scheduler triggers the code to run at the specific time every week
2. The code calls Readwise APIs to pull and extract my reading history
3. The code then writes the digest (markdown) that is compatible with Hugo, the static site generator library I use
4. The code finally pushes the new digest article into my Github repo that hosts the blog in a commit
5. The Github commit triggers Cloudflare Pages worker to deploy the latest blog that includes the digest
6. The digest is live on the blog!

Another component that really simplifies my work here is cloud services. They take care of things like the always-on scheduler, the trigger that activates the code, and the server that hosts the code. You can find more details on how it works from the repo but here's a high level system architecture with the services involved: 

```
Cloud Scheduler
    ↓ publishes message
Pub/Sub Topic
    ↓ triggers via Eventarc
Cloud Function
    ↓ fetches data
Readwise APIs
    ↓ returns documents & highlights
Data Processing → Markdown Generation
    ↓ commits file
GitHub API
    ↓ pushes to repository
Your Blog Repository
    ↓ webhook triggers
Cloudflare Pages
```

Services I used are from [Google Cloud](https://cloud.google.com/?hl=en), but these services are quite basic so any cloud service providers should have them. All services are free at my volume as well as the [Cloudflare Pages](https://pages.cloudflare.com), which is a separate service from Cloudflare. A system with same functionality without these services is still possible, but a trade-off between the level of control and the extra time it entails.

Using cloud services has its own learning curve. The issue that takes me the longest time building the system is not technical, but figuring out the proper permissions for the scheduler to trigger the cloud function through pub/sub messages.

Feel free to reuse the code if you have a similar need. For the system to work, you need to provide both the Readwise API key and Github access token in a `.env` file under the root directory. 
