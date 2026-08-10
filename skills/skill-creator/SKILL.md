---
name: skill-creator
description: >
  Creates new skill definitions following the Agent Skills specification.
  Use when asked to create a new skill, add a new capability, or build
  automation for AI agents. Returns a complete SKILL.md file with proper
  frontmatter, instructions, and examples following cross-platform conventions.
---

## What I Do

I create new skill definitions that work across multiple AI platforms. I handle the entire workflow from requirements gathering to file creation, ensuring all specification fields are included and the description format is correct.

## When to Use Me

Use this skill when:
- Creating a new skill for your project
- Adding automation capabilities for AI agents
- Building reusable prompt-based workflows
- Converting manual procedures into skills

## Instructions

### Step 1: Gather Requirements

Ask the user for:
- **Skill name** (lowercase, hyphens only, 1-64 chars, must match directory name)
- **Purpose** (what automation it provides)
- **Trigger conditions** (when to invoke)
- **Exclusions** (what NOT to use it for)
- **Input format** (what data it expects)
- **Output format** (what it produces)
- **Target platforms** (claude, opencode, or both)

### Step 2: Create Directory Structure

Following the [Agent Skills specification](https://agentskills.io/specification):

```
skill-name/
├── SKILL.md          # Required: metadata + instructions
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
├── assets/           # Optional: templates, resources
└── ...               # Any additional files or directories
```

At minimum, create the directory with `SKILL.md`.

### Step 3: Write SKILL.md Frontmatter

The `SKILL.md` file must contain YAML frontmatter followed by Markdown content.

Read [frontmatter.md](references/frontmatter.md) for the complete field reference, including:
- All available fields with constraints and examples
- Platform-specific requirements (Specification, Claude, OpenCode)
- Description format requirements with examples
- Dynamic context and string substitutions

Also read [SKILL_TEMPLATE.md](references/SKILL_TEMPLATE.md) for the canonical skill format.

Based on the target platforms:
- **Single target** (`claude` or `opencode`): Include only fields for that platform
- **Multiple targets**: Include all fields for all targets (superset)

Follow the reference to select the appropriate fields and write the frontmatter for your skill.

### Step 4: Write Body Content

The Markdown body after frontmatter contains the skill instructions. No format restrictions - write whatever helps agents perform the task effectively.

Read [prompt.md](references/prompt.md) for the complete body reference, including:
- Recommended structure (What I Do, When to Use Me, Instructions, etc.)
- Content types (reference, task, background knowledge)
- Dynamic context and string substitutions (Claude-specific)
- Conciseness guidelines and common patterns

Follow the reference to write clear, effective instructions for your skill.

Keep `SKILL.md` under 500 lines. Move detailed reference material to separate files.

### Step 5: Add Supporting Files (Optional)

Use relative paths from the skill root:

```markdown
See [the reference guide](references/REFERENCE.md) for details.

Run the extraction script:
scripts/extract.py
```

Keep file references one level deep from `SKILL.md`.

**Directory conventions:**

| Directory | Purpose |
|-----------|---------|
| `scripts/` | Executable code (Python, Bash, JavaScript) |
| `references/` | Additional documentation (REFERENCE.md, FORMS.md, etc.) |
| `assets/` | Static resources (templates, images, data files) |

### Step 6: Validate

Read [validation.md](references/validation.md) for the complete validation checklist, including:
- File structure requirements
- Frontmatter field constraints with valid/invalid examples
- Body content quality rules
- Platform-specific validation rules

Run through the checklist to ensure your skill follows all conventions.

### Step 7: Output Format

This skill returns structured content for the calling agent to write to files. Use XML-style `<file>` tags with a `path` attribute for each file.

**Note:** The parent agent is responsible for creating files at the appropriate location. This skill only provides the file contents. The parent agent will determine where to place the skill directory based on its configuration and user preferences.

**Single file output:**

```xml
<file path="/SKILL.md">
---
name: [skill-name]
description: >
  [description]
---

[body content]
</file>
```

**Multiple file output:**

Return all files in separate `<file>` tags. The agent will use its `Write` tool to create each file.

```xml
<file path="/SKILL.md">
---
name: [skill-name]
description: >
  [description]
---

[body content]
</file>

<file path="/scripts/helper.sh">
#!/bin/bash
[script content]
</file>

<file path="/references/guide.md">
# Guide

[reference content]
</file>
```

### Step 8: Summary

After returning all file content, provide a brief summary of what was created:

```markdown
## Summary

Created skill: [skill-name]
- SKILL.md: Main skill file with frontmatter and instructions
- scripts/helper.sh: [brief description]
- references/guide.md: [brief description]
```

## Examples

See the [assets/examples/](assets/examples/) directory for complete examples:
- [simple-git-skill.md](assets/examples/simple-git-skill.md) - Simple reference skill
- [code-generation-skill.md](assets/examples/code-generation-skill.md) - Task-based skill with allowed-tools
- [background-knowledge-skill.md](assets/examples/background-knowledge-skill.md) - Background knowledge skill (Claude-specific)
