# Add Agent Memory

## Introduction

This draft lab is retained for future use and is not part of the active workshop sidebar.

Estimated Time: 30 minutes (planning estimate).

Add durable conversational context to the Oracle agent while keeping authorization and business state in the database. Memory should help an agent remember user preferences, prior questions, and approved summaries; it must never become a source of truth for current inventory or a substitute for Deep Data Security.

### Objectives

- Separate conversational memory from operational and authorization data.
- Store memory with an authenticated actor and bounded retention.
- Retrieve relevant memory for a new agent turn.
- Prove that memory cannot cross regional security boundaries or approve an action.

### Prerequisites

- Completed the active workshop's managed-agent setup and deployment labs.
- An Oracle schema or supported memory store available to the agent service.
- A stable actor identifier from OAuth; do not use an email supplied only in a prompt.
- A cleanup plan for workshop memory records.

## Task 1: Define the memory contract

Use fields equivalent to:

```text
memory_id, actor_id, session_id, memory_type, content,
created_at, expires_at, authorization_scope, source
```

Store short summaries and preferences, not raw bearer tokens, passwords, wallet contents, or unrestricted database extracts. Bind every memory record to the actor and the authorization scope active when it was created.

## Task 2: Capture and retrieve memory

1. Start a Gemini Enterprise or A2A session as a regional database user.
2. Ask for a summary of the user’s current authorized inventory risks.
3. Save only a concise, time-bounded summary with its source and expiry.
4. Start a new turn and ask:

    ```text
    Recall my preferred summary format, then fetch the current inventory risk again for my authorized region. Clearly distinguish remembered preferences from current database values.
    ```

    The agent should retrieve the preference but query current Oracle data again.

## Task 3: Test the security boundary

1. Create memory as the North America user.
2. Authenticate as the APAC user and ask for the previous summary.
3. Confirm the North America memory is not returned.
4. Change the remembered preference to request a transfer and confirm it does not create or approve a transfer.
5. Expire or delete the memory record and verify it is no longer available.

    Deep Data Security must execute on the current database query even when memory contains a region, product, or prior answer.

## Task 4: Apply retention and operations controls

- Use an expiry time for every workshop memory record.
- Provide a user or administrator delete path.
- Redact sensitive values before persistence.
- Bound retrieved memory by count, age, and token size.
- Audit creation, retrieval, and deletion without logging secrets.
- Treat memory retrieval as untrusted context and validate all resulting tool arguments.

## Conclusion

Memory improves continuity, but current Oracle data and database authorization remain authoritative. Continue to the optional Deep Data Security and lakehouse labs to add row-level authorization and governed analytical context.

## Acknowledgements

*All Done! You may proceed to the next lab.*

- **Authors/Contributors** - Paul Parkinson, Architect and Dev Advocate, Oracle AI Database
- **Last Updated By/Date** - Paul Parkinson, October 2026
