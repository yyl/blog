+++
date = '2026-03-11T21:04:58-07:00'
draft = false
title = 'Would I Ever Write Code Again'
tags = ['ai', 'antigravity', 'agent', 'coding agent', 'coding', 'review', 'ide', 'github', 'stat']
+++

I wanna write about my experience with coding agent.

I have been consistently using AI coding agent for about 3 months now. By “consistently”, I mean they write all my code now. The release of the Claude Opus 4.5 and Antigravity IDE are the catalyst. The former is really good at coding, and the latter has generous quota for both Gemini and Claude models for people on Google One Pro plan like me.

My Github contributions last year says it all:

![Github contribution heatmap](/github_contribution_2025.png)

I simply push (a lot) more code!

## Agent vs me

To see how much more code it generates, here’s a comparison of 2 of my repos: one is written completely by myself, the other completely by agents.

Some caveats:
* The hand-written repo is private, so you have to take my word for it
* These repos are ofc non-critical hobby code outside of work
* The effort spent on the 2 might be different though I have tried to find the 2 that is closest

| Stat name                 | Hand written | [Agent written](https://github.com/yyl/digital-footprint-dump) |
|---------------------------|---------------------------------------------------|--------------------------------------------------------------|
| Lifespan (days)           | 266                                               | 87                                                           |
| Commits                   | 49                                                | 127                                                          |
| Lines of code (LOC)       | 4719                                              | 10156                                                        |
| Files                     | 24                                                | 75                                                           |
| File size (LOC, median)   | 95                                                | 104                                                          |
| File size (LOC, avg)      | 196                                               | 135                                                          |
| Commit size (LOC, median) | 58                                                | 39                                                           |
| Commit size (LOC, avg)    | 145                                               | 146                                                          |

In this comparison, I used agents to generate twice the amount of code in less than a third of the time. If we calculate the coding velocity as `total LOCs / total lifespan`, agents (116.7) are **6.6x** faster than me (17.7)! Now I might be a slow coder, but the impact of agents is real.
The file size of the 2 repos seems on par, and agents seem having smaller commits - I don’t know the exact reason. It can be that agents did more “dirty work” like code cleanup, code health, adding tests, etc, which typically are small ([example 1](https://github.com/yyl/digital-footprint-dump/commit/f32081bfc56e0b1f471928371e8d254b937d35e5), [example 2](https://github.com/yyl/digital-footprint-dump/commit/3469bfae882c1c233c5a5171144ed053dcbdfcb6)).

I used [this script](https://github.com/yyl/utilities/blob/main/github_repo_stat.py) to generate stats per Github repo.

## What it means

Importantly, code from agents are not slop - they are more than decent. My personal projects are not complex, the example repo shared above is basically a set of clients that interact with APIs or process formatted files. I do feel like coding agents are good enough to completely write the code for projects this size and complexity. 

So my answer to the question in title is NO. If agents can write the same code (much) faster, me writing them seems pointless. After all, I did not write code for its own sake, I was writing code to solve a problem most of the time. While I do enjoy coding to some extent, that joy is much less compared to solving the problem itself. Maybe in some future scenarios where problems are super complex and I have to write code for some of it, but not right now.