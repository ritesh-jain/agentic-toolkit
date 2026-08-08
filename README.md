# 🚀 Cross-Platform AI Agent & Skill Sync Engine

A tool-agnostic, FOSS-aligned configuration pipeline built to manage custom AI coding personas (`agents`) and utility capabilities (`skills`) across diverse project stacks. 

By functioning as a standalone local Node.js binary, this engine abstracts away platform fragmentation—allowing you to maintain a single, pristine repository of prompt engineering assets that deploy dynamically into environments like **OpenCode**, **Claude Code**, or standard configuration runtimes.

---

## 🏛️ Architectural Overview

This repository is designed to live as a **Git Submodule** within various parent project repositories (Node.js, Java, Go, Python, etc.). 

It operates on a strict **Deterministic Copy-on-Demand** paradigm. It eliminates cross-platform file system vulnerabilities (such as broken symlinks or OS path mutations) by physically purging and layering configuration profiles into transient directories ignored by the parent project.

### System File Topology
```text
[Parent Project Root] (Any Language Stack)
├── agent-config.json         <-- Superset/Explicit orchestration manifest
├── [Target Tool Dir]/        <-- Generated transient runtime folder (e.g., .opencode, .claude)
└── agents/                    <-- This Submodule (Centralized Tracking Repo)
    ├── package.json          <-- Declares the binary orchestration hook
    ├── agent-sync.js         <-- Core JS Engine (Self-contained, Zero-dependency)
    ├── agents/               <-- Global reusable agent definitions (.json)
    └── skills/               <-- Global reusable utility scripts (.js / .md)
```

---

## ⚙️ Core Configuration Design

The engine evaluates execution states via a layered hierarchy, prioritizing explicit intent over implicit environmental foot-printing.

### 1. Explicit Superset Configuration (`agent-config.json`)
Placed at the parent project root, this file dictates precise mapping definitions and supports **Polymorphic Schema Inheritance**:

```json
{
  "extends": "opencode.json",
  "active_tool": "opencode"
}
```
*If `extends` is declared, the engine ingests the native tool parameters (e.g., model definitions or temperatures from `opencode.json`) and layers custom toolkit extensions smoothly on top.*

### 2. Implicit Footprint Auto-Discovery
If no `agent-config.json` is detected, the engine executes a zero-config fallback sequence, sniffing for native signatures:
*   `opencode.json` → Targets `/.opencode`
*   `claude.json` or `.clauderc` → Targets `/.claude`
*   *Default Fallback* → Targets `/.agents`

---

## 🚀 Usage & Workflows

Because this engine acts as an encapsulated package, it execution footprints are identical across all language ecosystems.

### Daily Execution Commands
Execute directly from your parent project root using `npx`:

```bash
# Forward Sync: Wipe target folder and compile down fresh assets
npx ./agents agent-sync

# Reverse Sync (Upstream Save): Pull modified active states back to the submodule
npx ./agents agent-sync --save

# Delta Sync (Save If New): Isolate and capture only brand-new workspace assets
npx ./agents agent-sync --saveIfNew
```

### Node.js/JS Parent Project Optimization
For JavaScript-heavy projects, bypass direct execution paths by mapping proxies directly into your root `package.json` to safely avoid script argument swallowing:

```json
"scripts": {
  "agent": "npx ./agents agent-sync",
  "agent:sync": "npm run agent",
  "agent:save": "npm run agent -- --save",
  "agent:save-new": "npm run agent -- --saveIfNew"
}
```

---

## 🛡️ DevOps & Housekeeping Practices

To preserve pristine Git environments, always ensure the auto-generated workspace runtime folders are omitted from parent tracking. 

Append the following blocks to your parent project's root `.gitignore` file:

```text
# Ignore transient, auto-generated agent targets
.opencode/
.claude/
.agents/

# Do NOT ignore the submodule directory tracking your assets
!agents/
```

## 🧠 Strategic Engineering Capabilities
*   **Encapsulated Runtime Isolation:** Dependencies required by advanced modules inside this toolkit are isolated strictly within this submodule folder, leaving parent project `node_modules` pristine.
*   **Bi-Directional State Continuity:** The `--save` and `--saveIfNew` mechanisms allow you to organically evolve prompts and tools inside your IDE's active AI agent runtime session, then reliably commit those updates back to this central submodule codebase.
