# 🚀 Cross-Platform AI Agent & Skill Sync Engine

Welcome! This repository is a tool-agnostic, FOSS-aligned configuration pipeline and asset repository designed to manage your custom AI coding personas (`agents`) and automated utility capabilities (`skills`).

## 🎯 What This Project Does

Different AI coding tools expect configuration files in different locations at your project root:
*   **OpenCode** looks inside `.opencode/`
*   **Claude Code** looks inside `.claude/`
*   **Standard Platforms** use `.agents/`

This repository sits inside your various parent projects (Java, Node.js, Go, Python, etc.) as a **Git Submodule**. When executed, it acts as a standalone local CLI tool that automatically purges and copies your global agent personas and custom skills into the specific directories your active IDE extensions require. 

It completely eliminates cross-platform file system issues (like broken symlinks on Windows/WSL) by using a clean **Copy-on-Demand** workflow.

---

## 📂 Repository Layout

```text
[Parent Project Root] (Any Language Stack)
├── agent-config.json         <-- Your custom orchestration settings (Tracked by parent)
├── [Target Tool Dir]/        <-- Auto-generated runtime folder (e.g., .opencode, .claude)
└── agents/                    <-- This Submodule Repository (Central Tracking)
    ├── package.json          <-- Defines CLI executable and scoped dependencies
    ├── agent-sync.js         <-- The Core Javascript Engine Execution Script
    ├── agents/               <-- Central tracking folder for your global agent Markdown files
    └── skills/               <-- Central tracking folder for your global skill Markdown files
```

---

## 🚀 How to Setup and Run

### 1. Bootstrapping a New Project
To add this toolkit to any repository, initialize it as a submodule under the `./agents` directory:

```bash
git submodule add <your-agent-toolkit-git-url> agents
```

### 2. Daily Execution Commands
You can run the sync engine from your parent project root using `npx`. You do not need to install anything globally:

```bash
# Forward Sync: Wipe the transient tool directory and copy down fresh global assets
npx ./agents agent-sync

# Reverse Sync (Save): Pull local workspace modifications back into this submodule
npx ./agents agent-sync --save

# Delta Sync (Save New): Isolate and capture only brand-new skills back into this submodule
npx ./agents agent-sync --saveIfNew
```

### 3. Parent Project Optimization (Node.js/JS Projects)
If your parent project is a JavaScript application, copy these scripts into your root `package.json` to create short, clean commands that safely pass flags without terminal argument swallowing:

```json
"scripts": {
  "agent": "npx ./agents agent-sync",
  "agent:sync": "npm run agent",
  "agent:save": "npm run agent -- --save",
  "agent:save-new": "npm run agent -- --saveIfNew"
}
```

### 4. Git Housekeeping
To prevent auto-generated tool runtime environments from cluttering your code history, add these lines to your parent repository's root `.gitignore` file:

```text
# Exclude auto-generated compiled AI runtimes
.opencode/
.claude/
.agents/

# Ensure the central tracking submodule remains tracked
!agents/
```

---

## ⚙️ Configuration File (`agent-config.json`)

To explicitly control which tool the engine targets, place an `agent-config.json` file in your parent project's root directory:

```json
{
  "extends": "opencode.json",
  "active_tool": "opencode"
}
```
*   `active_tool`: Dictates the destination target (`opencode`, `claude`, or `standard-agents`).
*   `extends`: Optional. Instructs the engine to read an existing native tool config file (like `opencode.json`) and merge your custom toolkit layers cleanly on top of it.
*   **Auto-Discovery Fallback:** If this file is completely missing, the script will automatically check for the presence of `opencode.json` or `claude.json` and map the target folders seamlessly.
