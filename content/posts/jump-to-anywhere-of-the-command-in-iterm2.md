+++
date = '2025-04-19T15:08:01-07:00'
draft = true
title = 'Jump by word in the command line in iTerm2'
tags = ['TIL', 'howto', 'macos', 'iterm2', 'cli', ]
+++

I use iTerm2 as the terminal in macOS, but the conventional shortcuts `ctrl + ->/<-` to quickly jump backward/forward does not work in iTerm2 by default. I am always annoyed by that so I Google a little bit and found the solution. Here's how to set it up (bonus tip at the end):

![Screenshot of the iTerm2 setting for shortcut to jump around](/iterm2_keyboard_shortcut.png)

Steps:
1. Open `Settings`
2. Select `Profiles` tab
3. Select the profile you are using under the `Profile Name` (for me it's `Default`)
4. Select `Keys` tab, then `Key Mappings` tab
5. In the `Presets...` dropdown, select `Natural Text Editing`
6. Select `Keep`/`Remove` when it asks if you want to keep all current mappings before loading the preset (I choose `Remove` because I don't have any customized mappings set anyway)
7. That's it!

Bonus tip: apparently one can also hold `option` then click in the command to jump there! I personally still prefer keyboard shortcuts when two hands are on the keyboard though.