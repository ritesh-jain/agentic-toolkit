---
name: legacy-api-context
description: >
  Background knowledge about the legacy REST API that provides context
  when working on API-related code. Automatically loaded when editing
  API modules. Do not use for new API design, GraphQL implementations,
  or modern API gateway configurations. Returns contextual information
  about endpoints, data structures, and compatibility requirements.
user-invocable: false
---

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
