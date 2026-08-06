# Security Specification - Nafyad AI

## 1. Data Invariants
- An inquiry must have a valid name, email, and package selection.
- `createdAt` must be a server-side timestamp.
- `status` must be 'pending' upon creation.

## 2. The "Dirty Dozen" Payloads (Deny Cases)
1. **Empty Payload**: `{}` - Missing required fields.
2. **Missing Email**: `{"name": "John", "package": "Premium"}`.
3. **Invalid Email**: `{"name": "John", "email": "not-an-email", "package": "Premium"}`.
4. **Huge String**: `{"name": "A".repeat(2000), ...}` - Resource exhaustion.
5. **Unauthorized Status**: `{"status": "reviewed", ...}` - Trying to set status on creation.
6. **Client-side Timestamp**: `{"createdAt": "2023-01-01T00:00:00Z", ...}` - Should be server-side.
7. **Extra Fields**: `{"isVerified": true, ...}` - Prevents shadow fields.
8. **Invalid Package**: `{"package": "Free-Beer-Package", ...}` - (Though we'll allow strings, ideally we'd enum).
9. **No Identity**: `{"email": "test@test.com", ...}` - Missing name.
10. **Malicious ID**: Attempting to write to `inquiries/ADMIN_ID`.
11. **Read Request**: Any `get` or `list` by an unauthenticated or non-admin user.
12. **Delete Request**: Any `delete` by a visitor.

## 3. Test Runner (Draft)
```ts
// firestore.rules.test.ts (Conceptual)
// ... tests for the above payloads ...
```
