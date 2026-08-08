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
├── agentic-toolkit.json     <-- Your custom orchestration settings (Tracked by parent)
├── [Target Tool Dir]/       <-- Auto-generated runtime folder (e.g., .opencode, .claude)
└── scripts/agentic-toolkit/ <-- This Submodule Repository (Central Tracking)
    ├── package.json         <-- Defines CLI executable and scoped dependencies
    ├── start.js             <-- The Core Javascript Engine Execution Script
    ├── agents/              <-- Central tracking folder for your global agent Markdown files
    │   └── Agent.md.sample  <-- Template for creating new agents
    └── skills/              <-- Central tracking folder for your global skill Markdown files
        └── SKILL.md.sample  <-- Template for creating new skills
```

---

## 🚀 How to Setup and Run

### 1. Bootstrapping a New Project
To add this toolkit to any repository, initialize it as a submodule under the `./scripts` directory:

```bash
git submodule add <your-agent-toolkit-git-url> scripts/agentic-toolkit
```

### 2. Daily Execution Commands
You can run the sync engine from your parent project root using `npx`. You do not need to install anything globally:

```bash
# Forward Sync: Wipe the transient tool directory and copy down fresh global assets
npx ./scripts/agentic-toolkit agentic-toolkit --config ./agentic-toolkit.json

# Reverse Sync (Save): Pull local workspace modifications back into this submodule
npx ./scripts/agentic-toolkit agentic-toolkit --config ./agentic-toolkit.json --save

# Delta Sync (Save New): Isolate and capture only brand-new skills back into this submodule
npx ./scripts/agentic-toolkit agentic-toolkit --config ./agentic-toolkit.json --saveIfNew
```

### 3. Parent Project Optimization (Node.js/JS Projects)
If your parent project is a JavaScript application, copy these scripts into your root `package.json` to create short, clean commands that safely pass flags without terminal argument swallowing:

```json
"scripts": {
  "agentic-toolkit": "npx ./scripts/agentic-toolkit agentic-toolkit --config ./agentic-toolkit.json",
  "agent:sync": "npm run agentic-toolkit",
  "agent:save": "npm run agentic-toolkit -- --save",
  "agent:save-new": "npm run agentic-toolkit -- --saveIfNew"
}
```

### 4. Git Housekeeping
To prevent auto-generated tool runtime environments from cluttering your code history, add these lines to your parent repository's root `.gitignore` file:

```text
# Exclude auto-generated compiled AI runtimes
.opencode/
.claude/
.agents/
```

---

## ⚙️ Configuration File (`agentic-toolkit.json`)

To explicitly control which tool the engine targets, place an `agentic-toolkit.json` file in your parent project's root directory:

```json
{
  "extends": "opencode.json",
  "active_tool": "opencode"
}
```
*   `active_tool`: Dictates the destination target (`opencode`, `claude`, or `standard-agents`).
*   `extends`: Optional. Instructs the engine to read an existing native tool config file (like `opencode.json`) and merge your custom toolkit layers cleanly on top of it.
*   **Auto-Discovery Fallback:** If this file is completely missing, the script will automatically check for the presence of `opencode.json` or `claude.json` and map the target folders seamlessly.
*   **Custom Config Path:** Pass `--config <path>` to use a configuration file from a different location.

---

## 📝 Creating New Assets

Use the `.sample` templates in the `agents/` and `skills/` directories as starting points:

```bash
# Create a new agent
cp agents/Agent.md.sample agents/MyAgent.md

# Create a new skill
cp skills/SKILL.md.sample skills/MySkill.md
```
