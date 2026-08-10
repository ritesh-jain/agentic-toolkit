## Requirements

### Type
Skill

### Basic Information
- **Name**: git-status-formatter
- **Purpose**: Format git status output in a readable, structured way with categorized file changes
- **Trigger**: When user asks to see git status, check repository state, or view working tree changes

### Technical Requirements
- **Technologies**: Git, Bash
- **Capabilities**: Parse git status output, categorize changes, format output
- **Platform**: Claude, OpenCode

### Clarified Requirements
- **Exclusions**: Not for viewing diffs, commit history, or branch listings
- **Input**: Git repository path
- **Output**: Formatted status summary with sections

## Reference Materials

### Similar Skills Found

1. **Git Release Skill**
   - URL: https://github.com/ComposioHQ/awesome-claude-skills/blob/master/skill-creator
   - Key Features: Git workflow automation
   - Relevance: Medium

2. **Git Pushing Skill**
   - URL: https://github.com/mhattingpete/claude-skills-marketplace/tree/main/engineering-workflow-plugin/skills/git-pushing
   - Key Features: Automate git operations
   - Relevance: Medium

3. **Git Workflow Manager**
   - URL: https://github.com/VoltAgent/awesome-claude-code-subagents/blob/main/categories/06-developer-experience/git-workflow-manager.md
   - Key Features: Git workflow and branching expert
   - Relevance: Medium

### Suggested Patterns
- Use `git status --porcelain` for machine-readable output
- Categorize files by status (staged, modified, untracked)
- Include summary statistics
- Use clear section headers
- Support relative file paths

## Summary

Gathered requirements for: git-status-formatter
- Type: Skill
- References found: 3
- Key patterns: Git status parsing, categorization, formatting
