# Skill Repositories

Curated list of public repositories containing Claude skills and similar AI agent skill collections.

---

## URL Format

**Always use raw GitHub URLs** for fetching markdown content. This returns clean markdown instead of HTML.

Convert GitHub blob URLs to raw URLs:
- Blob: `https://github.com/[user]/[repo]/blob/[branch]/[path]`
- Raw: `https://raw.githubusercontent.com/[user]/[repo]/[branch]/[path]`

---

## How to Search Any Skill Repository (Generic)

**Discovery Priority** (check in order):
1. **`marketplace.json`** — Machine-readable index with all skills, descriptions, and categories. Found at `.claude-plugin/marketplace.json` or root.
2. **`README.md`** — Human-readable catalog organized by category with descriptions and links.
3. **`docs/catalog.md`** or **`docs/index.md`** — Alternative index files for some repos.
4. **`install.sh`** — Script listing all skill names in a machine-readable array.
5. **GitHub Contents API** — `api.github.com/repos/[user]/[repo]/contents/[directory]` returns JSON listing of all files.

**Directory Patterns** (repos vary — check which applies):
- **Flat root**: `skills/[skill-name]/SKILL.md` (most common)
- **Category nested**: `skills/[category]/[skill-name]/SKILL.md` (nimadorostkar)
- **Plugin-based**: `{plugin-name}/skills/[skill-name]/SKILL.md` (mhattingpete, NeoLabHQ)
- **Root-level only**: `[skill-name]/SKILL.md` (ComposioHQ root skills, michalparkola)
- **Composio-style**: `composio-skills/[skill-name]/SKILL.md` (ComposioHQ main skills)

**For each skill found**:
1. Fetch the SKILL.md using the raw URL pattern
2. Check for additional files: `scripts/`, `references/`, `assets/`
3. Use GitHub Contents API to discover files: `api.github.com/repos/[user]/[repo]/contents/[path]`
4. Fetch all important files using raw URLs
5. Extract frontmatter and body content

---

## Primary Repositories

### 1. ComposioHQ/awesome-claude-skills

- **URL**: https://github.com/ComposioHQ/awesome-claude-skills
- **Description**: Comprehensive collection of 1000+ production-ready skills for Claude, Codex, Cursor, Gemini CLI, and more
- **marketplace.json**: `https://raw.githubusercontent.com/ComposioHQ/awesome-claude-skills/master/composio-skills/.claude-plugin/marketplace.json`
- **README**: `https://raw.githubusercontent.com/ComposioHQ/awesome-claude-skills/master/README.md`
- **Skills (root)**: `https://raw.githubusercontent.com/ComposioHQ/awesome-claude-skills/master/[skill-name]/SKILL.md`
- **Skills (composio)**: `https://raw.githubusercontent.com/ComposioHQ/awesome-claude-skills/master/composio-skills/[skill-name]/SKILL.md`

**How to Search**:
1. Fetch `marketplace.json` — contains all skills with name, description, category, and source path
2. Filter by category (crm, devops, social-media, email, storage-docs, etc.)
3. For each relevant skill, fetch SKILL.md from the path listed in marketplace.json
4. Root-level skills (~30) use `[skill-name]/SKILL.md`
5. Composio skills (~1000+) use `composio-skills/[skill-name]/SKILL.md`
6. Check for additional files in `scripts/`, `references/`, `assets/`

---

### 2. nimadorostkar/Claude-Skills-collection

- **URL**: https://github.com/nimadorostkar/Claude-Skills-collection
- **Description**: 137 skills organized by 17 categories with consistent structure and quality standards
- **catalog**: `https://raw.githubusercontent.com/nimadorostkar/Claude-Skills-collection/main/docs/catalog.md`
- **README**: `https://raw.githubusercontent.com/nimadorostkar/Claude-Skills-collection/main/README.md`
- **Skills**: `https://raw.githubusercontent.com/nimadorostkar/Claude-Skills-collection/main/skills/[category]/[skill-name]/SKILL.md`

**How to Search**:
1. Fetch `docs/catalog.md` — master index of ALL 137 skills organized by 17 categories
2. Categories: Languages, Development, Backend, Frontend, Mobile, DevOps, Data, Security, Testing, AI, Agent Tooling, Finance, Documents, Design, Writing, Productivity, Business
3. For deeper browsing, fetch `categories/[category-name].md` for per-category indexes
4. For each skill, fetch SKILL.md using the raw URL pattern (note: `skills/` prefix required)
5. Check for supporting files: `scripts/`, `references/`, `templates/SKILL.md`
6. Note: Skills follow a 9-section structure (Purpose, When to Use, Capabilities, Inputs, Outputs, Workflow, Best Practices, Examples, Notes)

---

### 3. abubakarsiddik31/claude-skills-collection

- **URL**: https://github.com/abubakarsiddik31/claude-skills-collection
- **Description**: Curated index of 218 skills across 13 categories — links to skills in other repos
- **README**: `https://raw.githubusercontent.com/abubakarsiddik31/claude-skills-collection/main/README.md`
- **Skills**: N/A — this repo contains no skill files, only an index

**How to Search**:
1. Fetch the README — this IS the entire repo (only file)
2. Parse the categorized markdown tables (13 categories, 218 skills)
3. Extract skill names and Source URLs from each table row
4. For relevant skills, follow the Source link to the upstream repo
5. Fetch the SKILL.md from the upstream repo using its native URL pattern
6. Best used as a discovery tool, not a direct skill source

---

### 4. anthropics/skills (Official)

- **URL**: https://github.com/anthropics/skills
- **Description**: Official Anthropic skills — the authoritative reference for skill structure and best practices
- **marketplace.json**: `https://raw.githubusercontent.com/anthropics/skills/main/.claude-plugin/marketplace.json`
- **skills.sh**: `https://skills.sh/anthropics/skills`
- **README**: `https://raw.githubusercontent.com/anthropics/skills/main/README.md`
- **Skills**: `https://raw.githubusercontent.com/anthropics/skills/main/skills/[skill-name]/SKILL.md`
- **Template**: `https://raw.githubusercontent.com/anthropics/skills/main/template/SKILL.md`
- **Spec**: `https://raw.githubusercontent.com/anthropics/skills/main/spec/agent-skills-spec.md`

**How to Search**:
1. Fetch `marketplace.json` — structured index with 3 plugin bundles (document-skills, example-skills, claude-api)
2. Fetch `skills.sh` for install counts and popularity rankings
3. Fetch README for high-level context
4. Fetch individual SKILL.md files using raw URL pattern
5. Check `spec/agent-skills-spec.md` for the official Agent Skills specification
6. Check `template/SKILL.md` for the official starting template
7. Each skill may contain `scripts/`, `references/`, `assets/` subdirectories

---

### 5. obra/superpowers

- **URL**: https://github.com/obra/superpowers
- **Description**: Skills for development workflows including TDD, git worktrees, and brainstorming
- **README**: `https://raw.githubusercontent.com/obra/superpowers/main/README.md`
- **Skills**: `https://raw.githubusercontent.com/obra/superpowers/main/skills/[skill-name]/SKILL.md`
- **GitHub API**: `https://api.github.com/repos/obra/superpowers/contents/skills`

**How to Search**:
1. Fetch README — find "What's Inside" → "Skills Library" section for categorized list
2. Use GitHub API for complete directory listing of all 14 skill directories
3. Each skill is in flat `skills/` namespace (no subdirectories)
4. Fetch SKILL.md using raw URL pattern
5. Check for supporting files: `scripts/`, `references/`, prompt templates
6. Note: `using-superpowers` is the meta-skill that bootstraps all others

---

### 6. michalparkola/tapestry-skills

- **URL**: https://github.com/michalparkola/tapestry-skills
- **Description**: Skills for Claude Code including article extraction, YouTube transcripts, and document summarization
- **README**: `https://raw.githubusercontent.com/michalparkola/tapestry-skills/main/README.md`
- **Skills**: `https://raw.githubusercontent.com/michalparkola/tapestry-skills/main/[skill-name]/SKILL.md`

**How to Search**:
1. Fetch README — contains table listing all 7 skills with descriptions
2. Each skill directory contains only SKILL.md (no additional files)
3. Fetch SKILL.md using raw URL pattern
4. Note: `learn-this` is the master orchestrator that calls other skills internally
5. Note: URL uses `tapestry-skills`, NOT `tapestry-skills-for-claude-code`

---

### 7. mhattingpete/claude-skills-marketplace

- **URL**: https://github.com/mhattingpete/claude-skills-marketplace
- **Description**: Marketplace-style plugin collection with engineering workflow, visual documentation, productivity, and code operations skills
- **marketplace.json**: `https://raw.githubusercontent.com/mhattingpete/claude-skills-marketplace/main/.claude-plugin/marketplace.json`
- **CLAUDE.md**: `https://raw.githubusercontent.com/mhattingpete/claude-skills-marketplace/main/CLAUDE.md`
- **README**: `https://raw.githubusercontent.com/mhattingpete/claude-skills-marketplace/main/README.md`
- **Skills**: `https://raw.githubusercontent.com/mhattingpete/claude-skills-marketplace/main/{plugin-name}/skills/{skill-name}/SKILL.md`

**How to Search**:
1. Fetch `marketplace.json` — lists all 4 plugins with name, description, version
2. Fetch each plugin's README.md for detailed skill descriptions
3. Fetch SKILL.md files using the plugin-based URL pattern
4. Check for `agents/` directories for agent definitions
5. Check for `commands/` directories for slash commands
6. Note: `execution-runtime/` is a standalone Python package, not a plugin
7. Note: Skills are auto-discovered from `skills/` subdirectory — NOT listed in plugin.json

---

### 8. NeoLabHQ/context-engineering-kit

- **URL**: https://github.com/NeoLabHQ/context-engineering-kit
- **Description**: Context engineering skills for prompt engineering, software architecture, and subagent development
- **Branch**: master (NOT main)
- **marketplace.json**: `https://raw.githubusercontent.com/NeoLabHQ/context-engineering-kit/master/.claude-plugin/marketplace.json`
- **README**: `https://raw.githubusercontent.com/NeoLabHQ/context-engineering-kit/master/README.md`
- **Skills (root)**: `https://raw.githubusercontent.com/NeoLabHQ/context-engineering-kit/master/skills/[skill-name]/SKILL.md`
- **Skills (plugin)**: `https://raw.githubusercontent.com/NeoLabHQ/context-engineering-kit/master/plugins/[plugin-name]/skills/[skill-name]/SKILL.md`

**How to Search**:
1. Fetch `marketplace.json` — lists all 13 plugins with name, description, version, category
2. Browse root `skills/` directory for 70+ independent skill definitions
3. Browse `plugins/[plugin-name]/skills/` for plugin-specific bundled skills
4. Fetch SKILL.md using raw URL pattern (note: branch is `master`)
5. Skills are independent of plugins (can be used standalone)

---

### 9. sanjay3290/ai-skills

- **URL**: https://github.com/sanjay3290/ai-skills
- **Description**: 24 cross-platform agent skills for databases, messaging, research, TTS, DevOps, and Google Workspace
- **marketplace.json**: `https://raw.githubusercontent.com/sanjay3290/ai-skills/main/.claude-plugin/marketplace.json`
- **README**: `https://raw.githubusercontent.com/sanjay3290/ai-skills/main/README.md`
- **Skills**: `https://raw.githubusercontent.com/sanjay3290/ai-skills/main/skills/[skill-name]/SKILL.md`

**How to Search**:
1. Fetch `marketplace.json` — authoritative list of all 24 skills
2. Fetch README for human-readable descriptions and categories
3. For each skill, fetch SKILL.md using raw URL pattern
4. Use GitHub API to discover files: `https://api.github.com/repos/sanjay3290/ai-skills/contents/skills/[name]`
5. Check for `references/` directories (some contain large supplementary docs)
6. Check for `scripts/` directories (contain implementation code)
7. Check for config files: `.env.example`, `config.example.json`, `connections.example.json`

---

### 10. rockscy/solo-skills

- **URL**: https://github.com/rockscy/solo-skills
- **Description**: Bilingual (EN+中文) skills for solo founders and indie developers
- **install.sh**: `https://raw.githubusercontent.com/rockscy/solo-skills/main/install.sh`
- **README**: `https://raw.githubusercontent.com/rockscy/solo-skills/main/README.md`
- **Skills**: `https://raw.githubusercontent.com/rockscy/solo-skills/main/skills/[skill-name]/SKILL.md`

**How to Search**:
1. Fetch `install.sh` — contains SKILLS array with all 7 skill names (machine-readable)
2. Fetch README for human-readable descriptions and links
3. Fetch SKILL.md using the correct URL pattern (note: `skills/` prefix required)
4. Each skill contains only SKILL.md (no additional files)
5. Note: Bilingual documentation (English + Chinese) in same file
