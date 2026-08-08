# [Skill Name]

## Metadata

---
# ═══════════════════════════════════════════════════════════════════════════════
# CROSS-PLATFORM FIELDS (Supported by both Claude and OpenCode)
# ═══════════════════════════════════════════════════════════════════════════════

name: skill-name                    # Both: Skill identifier.
                                    #   Claude: Optional, defaults to directory name.
                                    #   OpenCode: Required. Lowercase alphanumeric with
                                    #     single hyphen separators. 1-64 chars. Must
                                    #     match directory name.

description: >                      # Both: Recommended. What the skill does and when to use it.
                                    #   Claude: Used to decide when to load automatically.
                                    #   OpenCode: Required. 1-1024 characters.
                                    #   Must include: what it does, when to invoke,
                                    #   what NOT to use it for, what it returns.
  Summarizes uncommitted changes and flags anything risky. Use when the
  user asks what changed, wants a commit message, or asks to review their
  diff. Do not use for committed history analysis, comparing branches, or
  generating changelogs for releases. Returns a structured summary with
  change categories, risk assessment, and specific file references.

license: MIT                        # Both: Optional. License covering the skill.

compatibility: [platform]           # Both: Optional. Environment requirements.
                                    #   Claude: String up to 500 characters.
                                    #   OpenCode: String.

metadata:                           # Both: Optional. Free-form key-value data.
  audience: [e.g., developers]      #   Claude: Must be a YAML map.
  workflow: [e.g., github]          #   OpenCode: Must be string-to-string map.

# ═══════════════════════════════════════════════════════════════════════════════
# CLAUDE-SPECIFIC FIELDS
# ═══════════════════════════════════════════════════════════════════════════════

when_to_use: >                      # Claude: Optional. Additional trigger context.
                                    #   Appended to description in skill listing.
                                    #   Truncated at 1,536 chars combined with description.
  [Additional context for when Claude should invoke this skill]

argument-hint: "[arg1] [arg2]"      # Claude: Optional. Hint shown during autocomplete.

arguments:                          # Claude: Optional. Named positional arguments.
  - arg1                            #   Space-separated string or YAML list.
  - arg2                            #   Names map to $arg1, $arg2 in content.

disable-model-invocation: false     # Claude: Optional. Prevent Claude from auto-loading.
                                    #   true = Only user can invoke with /skill-name
                                    #   false = Both user and Claude can invoke

user-invocable: true                # Claude: Optional. Hide from / menu.
                                    #   true = User can invoke
                                    #   false = Only Claude can invoke (background knowledge)

allowed-tools: Read, Grep           # Claude: Optional. Tools allowed without permission.
                                    #   Space or comma-separated, or YAML list.
                                    #   Grant clears on next message.

disallowed-tools: Write, Edit       # Claude: Optional. Tools removed while skill is active.
                                    #   Space or comma-separated, or YAML list.

model: inherit                      # Claude: Optional. Model override for this skill.
                                    #   Values: sonnet | opus | haiku | inherit | full-model-id
                                    #   Override applies for rest of current turn.

effort: high                        # Claude: Optional. Effort level override.
                                    #   Values: low | medium | high | xhigh | max

context: fork                       # Claude: Optional. Run in forked subagent context.
                                    #   fork = Run in separate subagent

agent: general                      # Claude: Optional. Which subagent type to use.
                                    #   Only applies with context: fork

background: true                    # Claude: Optional. Only with context: fork.
                                    #   true = Run in background
                                    #   false = Wait for result

hooks:                              # Claude: Optional. Lifecycle hooks.
  PreToolUse:
    - matcher: "Bash"
      hooks:
        - type: command
          command: "echo 'Running skill'"

paths: "src/**/*.ts, lib/**/*.js"   # Claude: Optional. Glob patterns for activation.
                                    #   Skill loads only when working with matching files.

shell: bash                         # Claude: Optional. Shell for inline commands.
                                    #   Values: bash | powershell

# ═══════════════════════════════════════════════════════════════════════════════
# DYNAMIC CONTEXT (Claude Only)
# ═══════════════════════════════════════════════════════════════════════════════
# Use !`command` to inject shell output into the skill content.
# Claude runs the command and replaces the line with its output.
#
# Example:
#   !`git diff HEAD`
#   !`ls -la src/`
#
# String Substitutions (Claude Only):
#   $ARGUMENTS     - All arguments passed when invoking
#   $0, $1, $2    - Specific arguments by index
#   $name          - Named argument from arguments field
#   ${CLAUDE_SESSION_ID}  - Current session ID
#   ${CLAUDE_EFFORT}      - Current effort level
#   ${CLAUDE_SKILL_DIR}   - Directory containing this SKILL.md
#   ${CLAUDE_PROJECT_DIR} - Project root directory
# ═══════════════════════════════════════════════════════════════════════════════
---

## What I Do

[Clear, concise description of the skill's purpose]

## When to Use Me

[Specific trigger conditions and use cases]

## Instructions

### Phase 1: [First Step]

1. [Detailed instruction]
2. [Detailed instruction]

### Phase 2: [Second Step]

1. [Detailed instruction]
2. [Detailed instruction]

### Phase 3: [Third Step]

1. [Detailed instruction]
2. [Detailed instruction]

## Output Format

When providing results:
- [Format requirement 1]
- [Format requirement 2]
- [Format requirement 3]

## Examples

### Example 1: [Scenario]

**Input:** [What the user provides]

**Output:** [What the skill produces]

---

## Supporting Files (Optional)

Skills can include multiple files in their directory:

```
skill-name/
├── SKILL.md           # Main instructions (required)
├── template.md        # Template for output
├── examples/
│   └── sample.md      # Example output
└── scripts/
    └── helper.sh      # Script Claude can execute
```

Reference supporting files from SKILL.md:

```markdown
## Additional Resources

- For templates, see [template.md](template.md)
- For examples, see [examples/sample.md](examples/sample.md)
- To run helper script: `${CLAUDE_SKILL_DIR}/scripts/helper.sh`
```

---

## Examples

### Git Release Skill

```yaml
---
name: git-release
description: >
  Create consistent releases and changelogs from merged PRs. Use when
  preparing a tagged release or generating release notes. Do not use for
  feature branch merges, hotfix deployments, or version bumps without
  release notes. Returns a structured release with version bump
  recommendation, changelog entries, and a ready-to-run gh release command.
license: MIT
compatibility: opencode
metadata:
  audience: maintainers
  workflow: github
---

## What I do

- Draft release notes from merged PRs
- Propose a version bump
- Provide a copy-pasteable `gh release create` command

## When to use me

Use this when you are preparing a tagged release.
Ask clarifying questions if the target versioning scheme is unclear.
```

### Code Review Skill (Claude-specific)

```yaml
---
name: code-review
description: >
  Review code changes for quality, security, and best practices with
  structured feedback and severity levels. Use after code changes, pull
  requests, or when explicitly requested to review specific files. Do not
  use for making code changes directly, executing deployment commands, or
  reviewing non-code files like documentation. Returns a structured review
  with critical/major/minor severity levels, specific line references,
  and actionable improvement suggestions.
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash
effort: high
---

## What I do

Reviews code for quality, security, and best practices, providing
actionable feedback with severity levels.

## When to use me

Invoke with `/code-review` when you want a thorough review of
recent code changes.

## Instructions

!`git diff HEAD`

Review the changes above and provide:
1. Critical issues (must fix)
2. Major issues (should fix)
3. Minor suggestions (nice to have)

Cite specific file paths and line numbers.
```

### Documentation Skill

```yaml
---
name: docs-writer
description: >
  Create and maintain project documentation including READMEs, API
  references, inline comments, and technical guides. Use when documentation
  needs to be created, updated, or reviewed, including generating JSDoc,
  Javadoc, or docstrings. Do not use for code changes, bug fixes, or feature
  implementations that are not documentation-related. Returns complete
  documentation files with proper formatting, cross-references, and examples
  including markdown, code blocks, and diagrams where appropriate.
arguments:
  - doc-type
  - target
---

## What I do

Creates clear, comprehensive documentation with proper formatting.

## When to use me

Use when documentation needs to be created, updated, or reviewed.

## Instructions

Create $doc-type documentation for $target.

Follow these conventions:
- Use markdown formatting
- Include code examples
- Add cross-references where appropriate
```

### Background Knowledge Skill (Claude-specific)

```yaml
---
name: legacy-system-context
description: >
  Background knowledge about the legacy payment system that provides context
  when working on payment-related code. Automatically loaded when editing
  payment modules. Do not use for new payment integrations, API design
  decisions, or modern payment gateway implementations. Returns contextual
  information about legacy endpoints, data structures, and compatibility
  requirements that must be considered during development.
user-invocable: false
---

## Legacy Payment System Context

The legacy payment system uses SOAP XML endpoints at:
- Processing: https://legacy-pay.example.com/soap/process
- Refunds: https://legacy-pay.example.com/soap/refund

Key data structures:
- TransactionID: UUID format
- Amount: Integer in cents
- Currency: ISO 4217 code

When modifying payment code, always check for backwards
compatibility with these endpoints.
```
