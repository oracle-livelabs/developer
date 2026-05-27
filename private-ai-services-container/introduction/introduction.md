# Introduction

## About this Workshop

Welcome to **Build multimodal AI Vector Search using Oracle Private AI Services Container**.

Oracle Private AI Services Container exists to give you modern model inference inside your own environment. You get a local model endpoint without sending your text or images to a public AI service.

Its core value is control with flexibility:
- Keep **data inside your network** and security boundary
- Update model services **without changing core database** deployment
- **Reuse one model endpoint** across notebooks, SQL flows, and apps
- **Support multimodal patterns**, such as image and text embeddings in one solution

Use each path for a different job:
- **In-database embeddings (`provider=database`)** fit SQL-first workflows with minimal moving parts.
- **Private AI Services Container (`provider=privateai`)** fits teams that need model agility, multimodal use cases, or shared model serving across tools.

Compared with public embedding APIs, a private container is often the stronger enterprise choice:
- Sensitive data does not leave your environment
- Latency is more predictable on local network paths
- Development is less exposed to external quotas, endpoint drift, and service outages
- There is no charge to create vectors, it is free!

In the following labs you will use JupyterLab and Oracle Private AI Services Container to:
- learn the JupyterLab basics used throughout this workshop
- discover available models in the Oracle Private AI Services Container
- generate embeddings using ONNX models stored in the Oracle AI Database and via the API endpoint provided by the Oracle Private AI Services Container.
- store vectors in Oracle AI Database
- run cosine similarity search
- build a simple image search app that uses multimodal embedding models

Estimated Workshop Time: 70 minutes

### Architecture at a Glance

- `jupyterlab` runs Python notebooks.
- `privateai` serves embedding models at `http://privateai:8080` on the container network.
- `aidbfree` stores documents and vectors.

![architecture](./images/arch.png)


### Objectives

In this workshop, you will:
- Get comfortable with JupyterLab notebooks and terminals
- Validate the runtime services required for the lab
- Generate embeddings with both database-stored ONNX models and Oracle Private AI Services Container
- Perform semantic similarity search in Oracle AI Database 26ai
- Build a simple image app that uses multimodal embeddings for similarity search


## Learn More

- [Oracle Private AI Services Container User Guide](https://docs.oracle.com/en/database/oracle/oracle-database/26/prvai/oracle-private-ai-services-container.html)
- [Private AI Services Container API Reference](https://docs.oracle.com/en/database/oracle/oracle-database/26/prvai/private-ai-services-container-api-reference.html)
- [DBMS_VECTOR UTL_TO_EMBEDDING](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/utl_to_embedding-and-utl_to_embeddings-dbms_vector.html)

## Acknowledgements
- **Author** - Oracle LiveLabs Team
- **Last Updated By/Date** - Oracle LiveLabs Team, April 2026
