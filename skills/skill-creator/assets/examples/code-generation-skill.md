---
name: test-generator
description: >
  Generate unit tests for existing functions or classes. Use when
  asked to write tests, improve test coverage, or create test suites.
  Do not use for integration tests, end-to-end tests, or testing
  non-code files. Returns complete test files with proper setup,
  assertions, and edge case coverage following project conventions.
license: MIT
metadata:
  author: project-team
  version: "1.0"
allowed-tools: Read Write Edit Bash
---

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

1. Read the source file
2. Identify all public functions and methods
3. Generate tests following project conventions
4. Include descriptive test names
5. Add comments explaining complex assertions

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
