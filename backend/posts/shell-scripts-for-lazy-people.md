---
title: Shell Scripts for Lazy People: Automate Your Linux Like a Lazy Cat
slug: shell-scripts-for-lazy-people
excerpt: Stop repeating the same terminal commands every day. A few lines of shell script can save you time — and let you nap like a proper cat.
tags: [linux, shell-script, productivity]
coverImage: /assets/blog/shell-scripts-for-lazy-people.png
published: true
---

Save commands, gain time to sleep (like any good cat would)

If you find yourself typing the same command every single day in the terminal, you might need a little feline help.

You know that moment when you run `git pull`, then `cd` into a folder, then `npm install`, then another command... and by the end you realize you just spent 10 minutes doing something that could've been automatic? Yeah. That's exactly what shell scripts are for.

Automating tasks on Linux might sound like something only sysadmins or terminal wizards do, but the truth is even the laziest cats can write a useful script with just 3 lines.

And once you realize you can turn your daily routine of commands into a magic button that does everything for you… the game changes.

## So, what exactly is a shell script?

A shell script is just a sequence of commands you'd normally type into the terminal, but saved into a `.sh` file so it can run like a little program.

It's like writing down a instant-noodle recipe so you don't have to ask how to make it every time. Except instead of boiling water and seasoning packets, you've got commands like `cd`, `cp`, `mv`, `git`, `curl`, and so on.

Simple example:

```
#!/bin/bash

cd ~/projetos/sudo-apt-cat

git pull origin main

npm run dev
```

Save this as `start.sh`, give it permission with `chmod +x start.sh`, and that's it. Now you just run `./start.sh` and go make yourself a coffee.

## Automations that are genuinely useful day to day

Here are a few practical scripts you can start using right now:

### 1. Automatic backup of a folder

```
#!/bin/bash

DATE=$(date +%Y-%m-%d)

cp -r ~/Documents/projects ~/Backups/projects-$DATE
```

### 2. Clean up temp files every Friday

```
#!/bin/bash

find ~/Downloads -type f -name "*.tmp" -delete

echo "Temporary files cleaned successfully. 🧹"
```

### 3. Check disk usage and send an alert

```
#!/bin/bash

USAGE=$(df -h / | awk 'NR==2 {print $5}' | sed 's/%//')

if [ $USAGE -gt 80 ]; then

  echo "Disk usage above 80%! You might want to check that."

fi
```

### 4. Update packages and clean the system with one click

```
#!/bin/bash

sudo apt update && sudo apt upgrade -y

sudo apt autoremove -y && sudo apt autoclean

echo "System updated and cleaned! 🧼"
```

These are just simple examples, but they already show how a shell script can become a great ally in your routine.

## Why does this matter?

In the dev world, time and focus are valuable resources. Automating repetitive tasks isn't just strategic laziness (though it is also that). It's about creating flow in your day.

Every script you write is one less thing to think about operationally, and one more mental space freed up for actual problem-solving.

On top of that, understanding shell scripting is a gateway into more complex automations, CI/CD, DevOps, server maintenance, and even data scraping.

You don't need to be a terminal ninja to benefit from automation. You just need to pay attention to your own routine and notice where you're wasting energy on things a machine could handle for you.
