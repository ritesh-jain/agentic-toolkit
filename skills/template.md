# [Skill Name / System Capability]

## 🎯 Execution Purpose
*A crisp statement explaining exactly what automation task or context injection this skill provides.*

> **Example**: "This skill automates the generation of semantic Git commit messages by analyzing staged diffs and applying Conventional Commits specification."

---

## ⚙️ Trigger Conditions & Environment Context
*When and how this skill should be invoked or readied by the LLM.*

- **Invocation**: [e.g., "User runs `git commit` with staged changes", "User asks 'summarize this PR'"]
- **Preconditions**: [e.g., "Git repository initialized", "Staged changes present", "Node.js available"]
- **Environment**: [e.g., "Runs in parent project root", "Requires read access to `.git/`"]
- **Tool Compatibility**: [e.g., "OpenCode tool format", "Claude Code MCP", "Standalone CLI"]

---

## 🛠️ Step-by-Step Implementation Instructions
*Dense prompt-engineering guidelines detailing the algorithmic sequence the AI must execute when utilizing this skill.*

### Phase 1: Input Acquisition
1. [e.g., "Execute `git diff --staged` to capture staged changes"]
2. [e.g., "Parse diff output into structured format (file, hunk, line changes)"]

### Phase 2: Analysis & Processing
1. [e.g., "Classify change type: feat, fix, refactor, docs, chore, test"]
2. [e.g., "Extract scope from file paths (e.g., `src/auth/` → `auth`)"]
3. [e.g., "Generate concise subject line (≤50 chars, imperative mood)"]
4. [e.g., "Draft body with bullet points for significant changes"]

### Phase 3: Output Generation
1. [e.g., "Format as Conventional Commit: `type(scope): subject`"]
2. [e.g., "Present to user for confirmation or auto-apply"]

---

## 📋 Input/Output Data Contract
*Clear examples of the raw data/code format this skill accepts and the precise formatting structure it must output.*

### Input Example
```bash
$ git diff --staged
diff --git a/src/auth/login.ts b/src/auth/login.ts
+export function validateToken(token: string): boolean {
+  return jwt.verify(token, SECRET);
+}
```

### Output Format
```text
feat(auth): add JWT token validation utility

- Introduce validateToken() in src/auth/login.ts
- Uses HS256 verification with shared secret
- Returns boolean for middleware integration
```

### Error/Edge Cases
- **No staged changes** → Output: "No staged changes to commit"
- **Binary files** → Skip with warning: "Binary file detected, skipping"
- **Empty diff** → Output: "No meaningful changes detected"