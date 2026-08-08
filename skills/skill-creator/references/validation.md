# SKILL.md Validation Reference

Complete validation checklist for SKILL.md files.

---

## File Structure Validation

### File Name and Location

| Rule | Constraint |
|------|------------|
| File name | Must be `SKILL.md` (all caps) |
| Directory name | Must match `name` field in frontmatter |
| Location | Must be inside a directory matching the skill name |

**Valid structure:**
```
my-skill/
├── SKILL.md          # ✓ Correct
```

**Invalid structure:**
```
my-skill/
├── skill.md          # ✗ Wrong case
├── Skill.md          # ✗ Wrong case
MY-SKILL/
├── SKILL.md          # ✗ Directory name mismatch
```

---

## Frontmatter Validation

### `name` Field (Required)

| Rule | Constraint |
|------|------------|
| Length | 1-64 characters |
| Characters | Lowercase letters, numbers, hyphens only |
| Start | Cannot start with hyphen |
| End | Cannot end with hyphen |
| Consecutive | Cannot contain consecutive hyphens (`--`) |
| Match | Must match parent directory name |

**Valid examples:**
```yaml
name: pdf-processing
name: data-analysis
name: code-review
name: test123
```

**Invalid examples:**
```yaml
name: PDF-Processing    # uppercase not allowed
name: -pdf              # cannot start with hyphen
name: pdf-              # cannot end with hyphen
name: pdf--processing   # consecutive hyphens not allowed
name: pdf_processing    # underscore not allowed
```

### `description` Field (Required)

| Rule | Constraint |
|------|------------|
| Length | 1-1024 characters |
| Content | Must describe what it does AND when to use it |

**Description must include:**
1. What it does (core capability)
2. When to invoke (trigger conditions)
3. What NOT to use it for (exclusions)
4. What it returns (output structure)

**Good example:**
```yaml
description: >
  Create consistent releases and changelogs from merged PRs. Use when
  preparing a tagged release or generating release notes. Do not use for
  feature branch merges, hotfix deployments, or version bumps without
  release notes. Returns a structured release with version bump
  recommendation, changelog entries, and a ready-to-run gh release command.
```

**Poor examples:**
```yaml
description: Helps with releases           # Too vague
description: Release                       # Missing context
description: A skill for releases...       # Missing "when to use"
```

### `license` Field (Optional)

| Rule | Constraint |
|------|------------|
| Format | License name or reference to bundled license file |
| Length | No specific limit |

**Examples:**
```yaml
license: MIT
license: Apache-2.0
license: Proprietary. LICENSE.txt has complete terms
```

### `compatibility` Field (Optional)

| Rule | Constraint |
|------|------------|
| Length | 1-500 characters |
| Content | Environment requirements (product, packages, network) |

**Examples:**
```yaml
compatibility: Designed for Claude Code (or similar products)
compatibility: Requires git, docker, jq, and access to the internet
compatibility: Requires Python 3.14+ and uv
```

Most skills do not need this field.

### `metadata` Field (Optional)

| Rule | Constraint |
|------|------------|
| Type | Map from string keys to string values |
| Keys | String |
| Values | String |

**Example:**
```yaml
metadata:
  author: example-org
  version: "1.0"
  audience: developers
  workflow: github
```

### `allowed-tools` Field (Optional)

| Rule | Constraint |
|------|------------|
| Format | Space-separated string or YAML list |
| Values | Tool names |

**Examples:**
```yaml
allowed-tools: Read Grep Glob Bash
allowed-tools: Read, Write, Edit, Bash
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
```

### Claude-Specific Fields

| Field | Type | Description |
|-------|------|-------------|
| `when_to_use` | String | Additional trigger context |
| `argument-hint` | String | Autocomplete hint |
| `arguments` | List | Named positional arguments |
| `disable-model-invocation` | Boolean | Prevent Claude auto-invocation |
| `user-invocable` | Boolean | Hide from `/` menu |
| `disallowed-tools` | List | Tools to remove while active |
| `model` | String | Model override |
| `effort` | String | Effort level override |
| `context` | String | Run in forked subagent |
| `agent` | String | Subagent type |
| `background` | Boolean | Run in background |
| `hooks` | Object | Lifecycle hooks |
| `paths` | List | Glob patterns for activation |
| `shell` | String | Shell for inline commands |

---

## Body Content Validation

### Structure

| Rule | Constraint |
|------|------------|
| Format | Markdown after frontmatter |
| Length | Under 500 lines recommended |
| Sections | Recommended but not required |

**Recommended sections:**
- What I Do
- When to Use Me
- Instructions
- Output Format
- Examples

### Quality

| Rule | Constraint |
|------|------------|
| Clarity | Clear, actionable instructions |
| Completeness | Covers edge cases |
| Conciseness | No redundant phrases |
| Examples | Input/output examples provided |

**Conciseness guidelines:**
- State what to do rather than narrating how or why
- Remove "Please" and "You should"
- Use bullet points instead of prose

---

## Platform-Specific Validation

### OpenCode

| Rule | Constraint |
|------|------------|
| `name` | Required, must match directory |
| `description` | Required, 1-1024 characters |
| Other fields | Ignored (not processed) |

### Claude

| Rule | Constraint |
|------|------------|
| `name` | Optional, defaults to directory name |
| `description` | Required for auto-invocation |
| `allowed-tools` | Space or comma-separated, or YAML list |
| `arguments` | Space-separated string or YAML list |

### Cross-Platform

| Rule | Constraint |
|------|------------|
| Directory structure | Follows Agent Skills specification |
| File name | `SKILL.md` (all caps) |
| Frontmatter | YAML format |

---

## Validation Checklist

Use this checklist to validate your skill:

### File Structure
- [ ] File is named `SKILL.md` (all caps)
- [ ] File is in a directory matching the skill name

### Frontmatter
- [ ] `name` is 1-64 characters
- [ ] `name` contains only lowercase letters, numbers, hyphens
- [ ] `name` does not start or end with hyphen
- [ ] `name` does not contain consecutive hyphens
- [ ] `name` matches directory name
- [ ] `description` is 1-1024 characters
- [ ] `description` includes what, when, not-for, returns

### Body Content
- [ ] Has clear, step-by-step instructions
- [ ] Includes input/output examples
- [ ] Uses proper markdown formatting
- [ ] Under 500 lines (or moved to separate files)
- [ ] File references are one level deep

### Optional
- [ ] `license` field included if applicable
- [ ] `compatibility` field included if applicable
- [ ] `metadata` field included if applicable
- [ ] `allowed-tools` field included if applicable

---

## Automated Validation

Use the [skills-ref](https://github.com/agentskills/agentskills/tree/main/skills-ref) library to validate skills programmatically:

```bash
skills-ref validate ./my-skill
```

This checks that `SKILL.md` frontmatter is valid and follows all naming conventions.
