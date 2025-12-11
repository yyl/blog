+++
date = '2025-12-10T20:38:09-08:00'
draft = true
title = 'Trying Out Antigravity, the Google AI IDE'
tags = ['ai', 'antigravity', 'agent', 'coding agent', 'coding', 'review', 'ide']
+++

[Antigravity](https://antigravity.google) is a new AI/agentic IDE. It is very recently released by Google, and probably as a promotion it has a very generous free plan and an even better plus plan if one has a Google One plan, which I do. So I try it out and build a simple batch data exporter. The program is not complex: talk to APIs, get data, parse them and save into the database. 

Some thoughts:

Pros:
1. Have a "planning" mode where the AI model writes up a plan with overview and task breakdowns first, making it easy for users to follow
2. The IDE also allows users to select specific parts and drop comments for the model to revise, making it easy for users to make changes
3. The agent is able to run most commands for me, saving users time
4. The agent is intelligent enough to fetch the latest API docs online when I ask it to learn about details about some APIs

Cons:
1. It sometimes (1 out of 5) terminates with unknown error, likely due to the fact it is newly released and not stable yet
2. The agent needs improvement as it fails at some basic coding tasks (see below)
3. The IDE does not support uploading files as contexts - one has to put it into the code project the IDE currently operates at

The agent fails at 2 basic tasks:
1. I ask it to build the system based on a sample code I have, and then the system end up with 2 bugs in the code block that overlaps with the sample code - I would expect the agent to be intelligent enough to reuse the sample code when necessary, which then would not contain the bugs. But in this case the agent clearly does a bad job improvising.
2. There are 3 different API calls the program has, and one of them consistently fails initially. When it looks into the issue, it fixates on two API calls and getting stuck in a loop when the fix does not work. Turns out it is the 3rd call that causes the issue. Again I would expect it to be intelligent (or just comprehensive) enough to inspect all three calls. 

Overall it definitely improves my productivity because it would have taken me maybe half a day to get the system up on my own, but if I measure the time it takes me to get it up including planning, discussing options and debugging, it's probably within one hour. 