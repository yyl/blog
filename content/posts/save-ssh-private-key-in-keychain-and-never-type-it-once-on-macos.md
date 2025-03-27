+++
date = '2025-03-27T06:25:38-07:00'
draft = false
title = "Save SSH Private Key in Keychain so you don't need to type it anymore on MacOS"
tags = ['howto', 'github', 'macos', 'ssh', 'keychain', 'passphrase']
+++

In the [previous post]({{< ref "understanding-ssh-and-using-it-to-clone-a-github-repository.md" >}}) I talk about setting up SSH to connect to Github as a better method than HTTPS to clone Github repository. However, it still requires me to type in my SSH passphrase for every connection:

```
yyl@home dir % ssh -T git@github.com
Enter passphrase for key '/Users/yyl/.ssh/id_ed25519':    <---- ask for passphrase every time!
Hi yyl! You've successfully authenticated, but GitHub does not provide shell access.
```

I'd like to not need to type it every time. Turns out it is indeed possible MacOS! I followed this [great instruction](https://apple.stackexchange.com/a/250572) and it takes me 2 minutes to set it up (Github has the same instruction too although more buried [in the SSH setup guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent#adding-your-ssh-key-to-the-ssh-agent) ). Once I have it set up, I no longer need to type the passphrase when connecting to Github or any host using SSH:

```
yyl@home dir % ls -al ~/.ssh    <---- command to see all my ssh keys
total 32
drwx------   6 yyl  staff   192 Mar 23 20:27 .
drwxr-xr-x+ 33 yyl  staff  1056 Mar 24 21:18 ..
-rw-------   1 yyl  staff   464 Mar 23 19:53 id_ed25519    <---- my private key
-rw-r--r--   1 yyl  staff    99 Mar 23 19:53 id_ed25519.pub
-rw-------   1 yyl  staff   828 Mar 23 20:27 known_hosts
-rw-r--r--   1 yyl  staff    92 Mar 23 15:30 known_hosts.old
yyl@home dir % ssh-add --apple-use-keychain ~/.ssh/id_ed25519 <---- command to add the private key to keychain
Enter passphrase for /Users/yyl/.ssh/id_ed25519:    <---- type the passphrase one last time
Identity added: /Users/yyl/.ssh/id_ed25519 (my_email@gmail.com)
yyl@home dir % touch ~/.ssh/config    <---- command to create a new config file if not exist
yyl@home dir % vim ~/.ssh/config    <---- add the Host text from the link to the file
yyl@home dir % ssh -T git@github.com
Hi yyl! You've successfully authenticated, but GitHub does not provide shell access.    <---- look ma, no passphrase!
```

That's it! 