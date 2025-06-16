+++
date = '2025-06-15T14:54:34-07:00'
draft = false
title = 'Quick notes - How Does OAuth Work'
tags = ['oauth', 'authorization', 'developer', 'open source', 'web development', 'user data']
+++

Recently I am building a web app that pulls user data from an Internet consumer social app. In order for the app user to grant access to my web app to read their data, the app uses an OAuth flow to authorize the user and grant access to the client (my web app). Here are some quick notes about OAuth that I learned through the process.

- OAuth stands for Open Authorization because it is an open source authorization framework
- There are two versions of OAuth (1.0/2.0) and people usually mean OAuth 2.0 when they mention OAuth
- OAuth is used for users of service A to grant access to their service A data to service B
- OAuth makes it possible to authorize data access without involving user credentials (i.e. passwords)
- A typical OAuth flow involves 4 entities: 
	- resource owner: users of the app
	- client: the server that requests access
	- authorization server: the server that coordinates the authorization flow
	- resource server: where the user data actually resides
- A typical OAuth flow:
	- The client requests authorization from the authorization server, supplying its identification obtained from the latter before
	- The authorization server authenticates the client and verifies that the requested scopes are permitted
	- The user interacts with the authorization server to grant access
	- The authorization server redirects back to the client with either an access token
	- The client requests access to the said resource from the resource server using the token