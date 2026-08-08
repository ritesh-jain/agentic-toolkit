# SKILL.md Body Reference

Complete reference for writing the Markdown body (system prompt) of SKILL.md files.

---

## Overview

The Markdown body after frontmatter contains the skill instructions. There are no format restrictions - write whatever helps agents perform the task effectively.

---

## Recommended Structure

While not required, the following structure is recommended for consistency:

### What I Do

Clear, concise description of the skill's purpose. This helps agents understand the skill's core capability.

```markdown
## What I Do

[Clear, concise description of the skill's purpose]
```

### When to Use Me

Specific trigger conditions and use cases. This helps agents decide when to invoke the skill.

```markdown
## When to Use Me

[Specific trigger conditions and use cases]
```

### Instructions

Step-by-step instructions for the skill. Use phases or numbered steps for complex workflows.

```markdown
## Instructions

### Phase 1: [First Step]

1. [Detailed instruction]
2. [Detailed instruction]

### Phase 2: [Second Step]

1. [Detailed instruction]
2. [Detailed instruction]
```

### Output Format

Expected output structure. This helps agents understand what to return.

```markdown
## Output Format

When providing results:
- [Format requirement 1]
- [Format requirement 2]
- [Format requirement 3]
```

### Examples

Example inputs and outputs. This helps agents understand the expected behavior.

```markdown
## Examples

### Example 1: [Scenario]

**Input:** [What the user provides]

**Output:** [What the skill produces]
```

---

## Content Types

Skills can contain different types of content:

### Reference Content

Adds knowledge agents apply to your current work. Conventions, patterns, style guides, domain knowledge. This content runs inline so agents can use it alongside conversation context.

```markdown
## API Conventions

When writing API endpoints:
- Use RESTful naming conventions
- Return consistent error formats
- Include request validation
```

### Task Content

Gives agents step-by-step instructions for a specific action. These are often actions you want to invoke directly with `/skill-name`.

```markdown
## Instructions

Deploy the application:
1. Run the test suite
2. Build the application
3. Push to the deployment target
```

### Background Knowledge

Context information that should be available when working in specific areas. Use `user-invocable: false` for this type.

```markdown
## Legacy System Context

The legacy payment system uses SOAP XML endpoints at:
- Processing: https://legacy-pay.example.com/soap/process
- Refunds: https://legacy-pay.example.com/soap/refund
```

---

## Progressive Disclosure

Agents load skills progressively, pulling in more detail only as a task calls for it:

1. **Metadata** (~100 tokens): `name` and `description` loaded at startup for all skills
2. **Instructions** (<5000 tokens recommended): Full body loaded when skill activates
3. **Resources** (as needed): Files in `scripts/`, `references/`, `assets/` loaded only when required

Keep your main `SKILL.md` under 500 lines. Move detailed reference material to separate files.

---

## Dynamic Context (Claude Only)

### Inline Shell Commands

Use `` !`command` `` to inject shell output into skill content. Claude runs the command and replaces the line with its output.

**Examples:**
```markdown
## Current State
!`git status --short`

## Files
!`ls -la src/`
```

This is useful for grounding instructions in actual data rather than what agents can guess from open files.

### String Substitutions

| Variable | Description |
|----------|-------------|
| `$ARGUMENTS` | All arguments passed when invoking the skill |
| `$0`, `$1`, `$2` | Specific arguments by index |
| `$name` | Named argument from `arguments` field |
| `${CLAUDE_SESSION_ID}` | Current session ID |
| `${CLAUDE_EFFORT}` | Current effort level |
| `${CLAUDE_SKILL_DIR}` | Directory containing this SKILL.md |
| `${CLAUDE_PROJECT_DIR}` | Project root directory |

**Examples:**
```markdown
## Session Log
Log to logs/${CLAUDE_SESSION_ID}.log:

$ARGUMENTS
```

```markdown
## Script Execution
Run `${CLAUDE_SKILL_DIR}/scripts/helper.sh` to process data.
```

---

## File References

When referencing other files in your skill, use relative paths from the skill root:

```markdown
## Additional Resources

- For templates, see [template.md](template.md)
- For examples, see [examples/sample.md](examples/sample.md)
- To run helper script: `${CLAUDE_SKILL_DIR}/scripts/helper.sh`
```

Keep file references one level deep from `SKILL.md`. Avoid deeply nested reference chains.

---

## Conciseness Guidelines

The body content stays in context across turns, so every line is a recurring token cost:

- State what to do rather than narrating how or why
- Apply the same conciseness test you would for CLAUDE.md content
- Remove redundant phrases like "Please" or "You should"
- Use bullet points instead of prose when possible

**Verbose (avoid):**
```markdown
You should first make sure to read the file that the user is asking about, and then you should analyze its contents carefully.
```

**Concise (prefer):**
```markdown
1. Read the file
2. Analyze contents
```

---

## Examples from Real Skills

### Simple Skill Body

```markdown
## What I Do

Display git log in a clean, readable format with:
- Commit hash (abbreviated)
- Author name
- Relative date
- Commit message

## When to Use Me

- Reviewing recent commits
- Preparing standup notes
- Checking project history

## Instructions

Run the following command and present the output:

!`git log --oneline --graph --decorate -20`

Format the output for readability and highlight any merge commits.
```

### Complex Skill Body with Phases

```markdown
## What I Do

Generate comprehensive unit tests for code, including:
- Test setup and teardown
- Happy path tests
- Edge cases
- Error handling
- Mocking where appropriate

## When to Use Me

- Adding test coverage to existing code
- Creating test suites for new features
- Improving test quality

## Instructions

### Phase 1: Analysis

1. Read the source file
2. Identify all public functions and methods
3. Determine the testing framework from project configuration

### Phase 2: Generation

1. Create test file with proper imports
2. Generate test suite structure
3. Write individual test cases with descriptive names
4. Add edge case coverage
5. Include comments explaining complex assertions

### Phase 3: Validation

1. Verify test syntax is valid
2. Ensure all imports resolve
3. Check for missing test cases

## Input

The user will specify:
- File path to the source code
- Testing framework (if not specified, infer from project)

## Output

A complete test file with:
- Proper imports
- Test suite structure
- Individual test cases
- Edge case coverage
```

### Background Knowledge Body

```markdown
## Legacy API Context

The legacy REST API uses these endpoints:
- Users: GET/POST /api/v1/users
- Orders: GET/POST /api/v1/orders
- Auth: POST /api/v1/auth/token

Key data structures:
- UserID: Integer (auto-increment)
- OrderID: UUID format
- Timestamps: ISO 8601

When modifying API code, always check for backwards
compatibility with these endpoints.
```

---

## Common Patterns

### Command Execution Pattern

```markdown
## Instructions

Run the following command and present the output:

!`[command here]`

Format the output for readability.
```

### Multi-Step Workflow Pattern

```markdown
## Instructions

### Step 1: [Action]

[Instructions]

### Step 2: [Action]

[Instructions]

### Step 3: [Action]

[Instructions]
```

### Conditional Logic Pattern

```markdown
## Instructions

1. Check [condition]
2. If [condition] is true:
   - [Action A]
3. If [condition] is false:
   - [Action B]
```

### Input/Output Pattern

```markdown
## Input

The user will provide:
- [Input item 1]
- [Input item 2]

## Output

Return:
- [Output item 1]
- [Output item 2]
```
