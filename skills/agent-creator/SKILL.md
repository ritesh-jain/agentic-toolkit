---
name: agent-creator
description: >
  Creates new agent definitions for AI platforms. Use when asked to
  create a new agent, add a new AI persona, or build specialized
  assistants for specific tasks. Returns a complete agent file with
  proper frontmatter, system prompt, and cross-platform compatibility
  following Agent.md.sample conventions.
---

## What I Do

I create new agent definitions that work across multiple AI platforms. I handle the entire workflow from requirements gathering to file creation, ensuring all specification fields are included and the system prompt is effective.

## When to Use Me

Use this skill when:
- Creating a new agent for your project
- Building specialized AI assistants
- Adding new personas with specific capabilities
- Converting manual procedures into agent workflows

## Instructions

### Step 1: Gather Requirements

Ask the user for:
- **Agent name** (lowercase, hyphens only, must match file name)
- **Purpose** (what this agent does)
- **Trigger conditions** (when to call it)
- **Exclusions** (what NOT to use it for)
- **Expected output** (what it returns)
- **Technical domain** (languages, frameworks, specializations)
- **Permission level** (read-only, full access, etc.)
- **Platform compatibility** (which AI platforms to support)

### Step 2: Write Agent Frontmatter

The agent file must contain YAML frontmatter followed by a system prompt.

Read [frontmatter.md](references/frontmatter.md) for the complete field reference, including:
- Cross-platform fields (name, description, model, color)
- Claude-specific fields (tools, permissions, memory, etc.)
- OpenCode-specific fields (mode, temperature, steps, etc.)
- Permission system configuration

Follow the reference to select the appropriate fields and write the frontmatter for your agent.

### Step 3: Write System Prompt

The Markdown body after frontmatter contains the system prompt. This defines the agent's persona, responsibilities, and behavioral guidelines.

Read [prompt.md](references/prompt.md) for the complete system prompt reference, including:
- Recommended structure (Role, Responsibilities, Constraints, etc.)
- Behavioral guidelines and technical domain
- Workflow and output format
- Best practices for effective system prompts

Follow the reference to write a clear, actionable system prompt for your agent.

### Step 4: Validate

Read [validation.md](references/validation.md) for the complete validation checklist, including:
- File structure requirements
- Frontmatter field constraints with valid/invalid examples
- System prompt quality rules
- Platform-specific validation rules

Run through the checklist to ensure your agent follows all conventions.

### Step 5: Output Format

This skill returns structured content for the calling agent to write to files. Use XML-style `<file>` tags with a `path` attribute for each file.

**Note:** The parent agent is responsible for creating files at the appropriate location. This skill only provides the file contents. The parent agent will determine where to place the agent file based on its configuration and user preferences.

**Single file output:**

```xml
<file path="/[AgentName].md">
---
name: [agent-name]
description: >
  [description]
mode: subagent
model: inherit
[additional fields]
---

[System prompt content]
</file>
```

### Step 6: Summary

After returning the file content, provide a brief summary of what was created:

```markdown
## Summary

Created agent: [agent-name]
- [AgentName].md: Agent file with frontmatter and system prompt
- Platforms: [list of supported platforms]
- Mode: [primary/subagent/all]
```

## Examples

See the [assets/examples/](assets/examples/) directory for complete examples:
- [read-only-researcher.md](assets/examples/read-only-researcher.md) - Read-only code analysis agent
- [code-reviewer.md](assets/examples/code-reviewer.md) - Code review agent with specific tools
- [docs-writer.md](assets/examples/docs-writer.md) - Documentation generation agent
