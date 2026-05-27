# Lab 6: Optional Next Steps

## Introduction

This lab captures practical extensions you can build from the notebook and Flask app baseline.

Estimated Time: 10 minutes

### Option 1: Add PDF Chunking

- Add a `DOCUMENTS` and `DOC_CHUNKS` pipeline.
- Use `DBMS_VECTOR.UTL_TO_CHUNKS` and then `UTL_TO_EMBEDDING` with provider `privateai`.
- Store chunk vectors and search across real document corpora.

### Option 2: Expose Search Through ORDS

- Create a stored procedure that accepts query text.
- Return top-k rows from vector search SQL.
- Publish endpoint through ORDS under your chosen base path.

### Option 3: Compare Models

- Enumerate `/v1/models`.
- Regenerate vectors with different model IDs.
- Compare retrieval quality and latency.
- Use Lab 7 for a beginner-friendly JupyterLab walkthrough.

### Objectives

In this lab, you will:
- Identify practical extensions to the notebook and Flask patterns built in this workshop
- Plan follow-on experiments for PDF chunking, ORDS publication, and model comparison

## Acknowledgements
- **Author** - Oracle LiveLabs Team
- **Last Updated By/Date** - Oracle LiveLabs Team, April 2026
