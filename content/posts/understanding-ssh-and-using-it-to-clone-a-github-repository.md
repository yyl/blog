+++
date = '2025-03-23T14:47:51-07:00'
draft = false
title = 'Understanding SSH and using it to clone a Github repository'
tags = ['github', 'workflow', 'howto', 'ssh', 'technical', 'open_source']
+++

In this post I try to learn a little bit about SSH, and show you how to clone a Github repository via SSH. I've scrambled most secrets, keys or identities in the terminal output but it should not affect the reading or the functionality.

I have tried to clone some github repositories to my local machine for development lately. The easiest way to do that used to be `HTTPS` - "Clone using the web URL" option: I copy and paste the repo HTTPS URL, run `git clone {URL}`, that's it. 

But now it's been failing:

```
yyl@terminal folder % git clone https://github.com/yyl/awesome_repo.git
Cloning into 'awesome_repo'...
Username for 'https://github.com': yyl
Password for 'https://user@github.com':
remote: Support for password authentication was removed on August 13, 2021.
remote: Please see https://docs.github.com/get-started/getting-started-with-git/about-remote-repositories#cloning-with-https-urls for information on currently recommended modes of authentication.
fatal: Authentication failed for 'https://github.com/user/awesome_repo.git'
```

[The link in the output](https://docs.github.com/en/get-started/git-basics/about-remote-repositories#cloning-with-https-urls) points out that GitHub is no longer accepting account passwords for authentication since August 2021. Instead, users need to create and use [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens). Ouch! I don't wanna use or hold another authentication secret!

Luckily, Github provides a few other ways to clone the repo, including through SSH. In the rest of the post I will demonstrate how I set up SSH on my new Macbook and clone the repo from Github to local. I assume you have a rough idea of what SSH is, and some basic knowledge around using it - don't worry, I will try to explain along the way!

## Try to connect via SSH the first time

```
yyl@terminal folder % ssh git@github.com
The authenticity of host 'github.com (xxx.xx.xxx.x)' can't be established.
ED25519 key fingerprint is SHA256:xxxxxxxxxxxxxxxxxxxxx.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'github.com' (ED25519) to the list of known hosts.
yyl@github.com: Permission denied (publickey).
```

The command (`ssh git@github.com`) failed but what it does is try to connect to github.com via the SSH client `ssh`. It did a few things:

1. it creates the directory `~/.ssh` for me: everything related to SSH connections is in here (this is only for using ssh the first time)
2. it tries to check it's really `github.com` that is connecting with us (server authentication)
3. it tries to check the user (me) has the proper credentials the remote server (`github.com`) requires (user authentication)
4. if both succeeds, establish the connection

It failed at the 3rd step: the ssh client rejects me as I don't have a valid key pair for authentication yet. The solution? Generate one!

## Generate a new pair of SSH keys

```
yyl@terminal folder % ssh-keygen -t ed25519 -C "your_email@example.com"

Generating public/private ed25519 key pair.
Enter file in which to save the key (~/.ssh/id_ed25519):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in ~/.ssh/id_ed25519
Your public key has been saved in ~/.ssh/id_ed25519.pub
The key fingerprint is:
SHA256:xxxxxxxxxxxxxx your_email@example.com
The key's randomart image is:
+--[ED25519 256]--+
| xxxx xx   x     |
|x xx x x x       |
|xxx x xxx        |
|xxxx xxxx x x    |
|xxx x xx x       |
|x xx   xxx       |
|  x    x         |
|   x   xxx       |
|       xxxx      |
+----[SHA256]-----+
```

The command `ssh-keygen` generates a new pair of public/private keys on my laptop. It means a few things:

1. The private key is saved to `~/.ssh/id_ed25519` as noted in the output unless one specifies alternative file
2. The public key is saved to `~/.ssh/id_ed25519.pub` correspondingly
3. It asks for a passphrase which will be asked when trying to establish a SSH connection using this key pair
4. The `randomart` image at the end is a visualization of the key such that people could visually distinguish different keys - I scrabbled mine, usually it would have different symbols inside

Before we try to connect again, I run `ls -al ~/.ssh` and this is what I see:

```
yyl@terminal folder % ls -al ~/.ssh
total 24
drwx------   5 yyl  staff   160 Mar 23 19:53 .
drwxr-xr-x+ 33 yyl  staff  1056 Mar 23 15:30 ..
-rw-------   1 yyl  staff   464 Mar 23 19:53 id_ed25519
-rw-r--r--   1 yyl  staff    99 Mar 23 19:53 id_ed25519.pub
-rw-r--r--   1 yyl  staff    92 Mar 23 15:30 known_hosts
```

As said now there are a pair of keys inside. Besides that, the file `known_hosts` contains all the hosts (remote servers) that I have tried to connect and agree to save to the file. If I look at the file content, it should contain just one host (github.com):

```
yyl@terminal folder % cat ~/.ssh/known_hosts
github.com ssh-ed25519 xxxxxxxxxxxxxxxxxxxxxxxx
```

The `xxx` part is the public key provided by github.com to us for authentication.

## Connect to Github with my new keys

OK, with new keys, lets try to connect again:

```
yyl@terminal folder % ssh git@github.com
yyl@github.com: Permission denied (publickey).
```

The server authentication failed again - the remote server (github.com) does not recognize my public key. It turns out we need to [add the public key to Github website](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account#adding-a-new-ssh-key-to-your-account)!

After the key is added to the Github account, let's try to connect one more time:

```
yyl@terminal folder % ssh -T git@github.com
Enter passphrase for key '~/.ssh/id_ed25519':
Hi yyl! You've successfully authenticated, but GitHub does not provide shell access.
```

Great! The connection is working. Now it's time to clone a repo:

```
yyl@terminal folder % git clone git@github.com:yyl/awesome_repo.git
Cloning into 'awesome_repo'...
Enter passphrase for key '~/.ssh/id_ed25519':
remote: Enumerating objects: 26, done.
remote: Counting objects: 100% (26/26), done.
remote: Compressing objects: 100% (17/17), done.
remote: Total 26 (delta 8), reused 25 (delta 7), pack-reused 0 (from 0)
Receiving objects: 100% (26/26), 12.05 KiB | 4.02 MiB/s, done.
Resolving deltas: 100% (8/8), done.
```

That's it!