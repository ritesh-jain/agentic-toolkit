---
name: git-log-pretty
description: >
  Display git log in a readable, formatted view with commit hashes,
  authors, and dates. Use when reviewing recent commits, preparing
  standup notes, or checking project history. Do not use for finding
  specific commits by message, analyzing diffs, or checking file
  history. Returns a formatted git log with color-coded output and
  summary statistics.
license: MIT
metadata:
  author: project-team
  version: "1.0"
---

## What I Do

Display git log in a clean, readable format with:
- Commit hash (abbreviated)
- Author name
- Relative date
- Commit message

## When to Use Me

- Reviewing recent commits
- Preparing standup notes
- Checking project history

## Instructions

Run the following command and present the output:

!`git log --oneline --graph --decorate -20`

Format the output for readability and highlight any merge commits.
