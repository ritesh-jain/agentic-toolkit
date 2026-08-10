---
name: agentic-resource-gatherer
description: >
  Gathers requirements for creating new agents or skills by asking minimal
  questions and searching public repositories for similar examples. Use when
  starting a new agent or skill creation project. Returns structured
  requirements with reference materials from public repositories.
license: MIT
compatibility: Requires web access for repository search
metadata:
  author: project-team
  version: "1.0"
---

## What I Do

I gather requirements for creating new agents or skills by:
- Accepting type and initial description as input
- Searching public repositories for similar agents/skills
- Studying reference materials and examples
- Returning a requirements draft for user confirmation
- Finalizing requirements after user approval

## When to Use Me

Use this skill when:
- Starting a new agent creation project
- Starting a new skill creation project
- You need to find similar examples before creating
- You want structured requirements with references

## Instructions

### Input Parameters

When invoked, expect these parameters:
- **type**: "agent" or "skill" — what to create (provided by calling agent)
- **description**: Initial description of what the user wants

### Step 1: Understand Initial Requirements

Parse the user's description to extract:
- Core purpose
- Key features
- Technologies/frameworks mentioned
- Any constraints or requirements

### Step 2: Search Repositories

Based on the user's answers, search public repositories for similar examples.

Read [agent-repos.md](references/agent-repos.md) or [skill-repos.md](references/skill-repos.md) for the curated list of repositories with detailed search instructions.

**Search Strategy**:

**Phase 1: Identify Keywords**

From the user's description, extract:
- Primary domain (e.g., "frontend", "backend", "data", "security", "testing")
- Technologies (e.g., "React", "Python", "Docker", "Kubernetes", "TypeScript")
- Use case (e.g., "review", "generate", "analyze", "deploy", "document")
- Role type for agents (e.g., "developer", "reviewer", "architect", "engineer")

**Phase 2: Web Search for Discovering New Repositories**

Use `websearch` with targeted queries to discover repositories not in the curated list:
```
site:github.com [keyword] claude skill SKILL.md
site:github.com [keyword] claude skill collection
site:github.com [keyword] claude code subagents
site:github.com [keyword] agent.md frontmatter
```

**Phase 3: Browse Curated Repositories**

Start with the largest collections and work through relevant ones:
1. For skills: Start with ComposioHQ/awesome-claude-skills (1000+ skills), then anthropics/skills (official), then obra/superpowers (development workflows)
2. For agents: Start with VoltAgent/awesome-claude-code-subagents (154+ agents), then avelikiy/great_cto (SDLC pipeline), then modu-ai/moai-adk (24 specialized agents)

For each repository, follow the detailed "How to Search" instructions in the reference file to extract relevant examples.

### Step 3: Gather References

For each relevant reference found:

**URL Handling:**
- Always use raw GitHub URLs for fetching markdown content
- Convert blob URLs to raw URLs: `https://github.com/[user]/[repo]/blob/[branch]/[path]` → `https://raw.githubusercontent.com/[user]/[repo]/[branch]/[path]`
- Raw URLs return clean markdown without HTML noise

**Multi-File Skills:**
Skills can contain multiple files beyond SKILL.md:
- `SKILL.md` — Main skill definition (required)
- `scripts/` — Optional executable code
- `references/` — Optional documentation
- `assets/` — Optional templates, examples

For each skill found:
1. Fetch the SKILL.md
2. Check for additional files in scripts/, references/, assets/ directories
3. Fetch all important files using raw URLs
4. Pass ALL file links to the creator skill

**For each reference:**
1. Note the URL (use raw format)
2. Extract key features
3. Note the structure and approach
4. Collect system prompt excerpts (for agents)
5. List all files found in the skill directory

### Step 4: Present Draft for User Confirmation

After studying similar resources, you MUST present a **requirements draft** to the user for confirmation using the `question` MCP tool. This is critical — even if the requirement seems clear, always get user confirmation.

**CRITICAL: All user-facing questions MUST use the `question` MCP tool.** Never use plain text, bullet lists, or emoji options to ask questions. The `question` tool is the only acceptable way to present choices to the user.

**What to include in the draft:**
- Your understanding of the requirements
- Similar resources found and patterns to follow
- Any assumptions you made
- Open questions or ambiguities for the user to clarify

**Presenting the draft:**
Use the `question` tool to present the draft summary AND confirmation options in a single call. The question text should contain the full draft — do NOT present the draft in plain text first.

```json
{
  "questions": [{
    "question": "Here is the requirements draft:\n\n## Requirements\n### Type\n[Agent or Skill]\n### Basic Information\n- **Name**: [suggested-name]\n- **Purpose**: [user's description]\n- **Trigger**: [when to invoke]\n### Similar Resources Found\n[summary of references]\n### Suggested Patterns\n[patterns]\n\nDoes this draft accurately capture what you want to create?",
    "header": "Confirm Requirements",
    "options": [
      {"label": "Yes, proceed (Recommended)", "description": "The draft is accurate, continue with creation"},
      {"label": "Needs changes", "description": "I have feedback to refine the requirements"},
      {"label": "Custom", "description": "I have specific requirements not covered"}
    ]
  }]
}
```

**Guidelines for using `question` tool:**
- Include the FULL draft in the question text — the user sees everything in one place
- Provide 2-4 clear options with descriptions
- Mark the recommended option with "(Recommended)"
- Ask one question at a time to avoid overwhelming the user
- Wait for user response before proceeding

**Important:**
- ALWAYS use the `question` tool — never return plain text drafts
- Present the draft AND ask for confirmation in the same `question` tool call
- Wait for user confirmation before proceeding to final output

### Step 5: After Confirmation

Once the user confirms the draft via the `question` tool response:

1. Parse the user's feedback (if any)
2. Refine the requirements based on feedback
3. Return the final structured requirements for the calling agent to pass to the appropriate creation skill (skill-creator or agent-creator)

**Return format:**

```markdown
## Requirements

### Type
[Agent or Skill]

### Basic Information
- **Name**: [name]
- **Purpose**: [description]
- **Trigger**: [when to invoke]

### Technical Requirements
- **Technologies**: [list]
- **Capabilities**: [list]
- **Platform**: [platforms]

## Reference Materials

### Similar Found

1. **[Name]**
   - URL: [raw-link]
   - Key Features: [features]
   - Files:
     - SKILL.md: [raw-url]
     - [other files]: [raw-url]

### Suggested Patterns
- [pattern]
```

### Step 6: Summary

Provide a brief summary of what was gathered:

```markdown
## Summary

Gathered requirements for: [agent/skill-name]
- Type: [Agent/Skill]
- References found: [count]
- Key patterns: [list]
```

## Output Format

This skill returns structured requirements for the calling agent to pass to the next skill (skill-creator or agent-creator).

**Note:** The parent agent is responsible for passing these requirements to the appropriate creation skill. This skill only provides the structured requirements and reference materials.

**Single output format:**

```markdown
## Requirements

### Type
[Agent or Skill]

### Basic Information
- **Name**: [name]
- **Purpose**: [description]
- **Trigger**: [when to invoke]

### Technical Requirements
- **Technologies**: [list]
- **Capabilities**: [list]
- **Platform**: [platforms]

## Reference Materials

### Similar Found

1. **[Name]**
   - URL: [raw-link]
   - Key Features: [features]
   - Files:
     - SKILL.md: [raw-url]
     - [other files]: [raw-url]

### Suggested Patterns
- [pattern]
```

## Examples

See the [assets/examples/](assets/examples/) directory for complete examples:
- [frontend-developer-agent.md](assets/examples/frontend-developer-agent.md) - Example agent requirements
- [git-formatter-skill.md](assets/examples/git-formatter-skill.md) - Example skill requirements
