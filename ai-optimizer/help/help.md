# Need Help?

We’d love to hear from you! You can contact us in the #ai-optimizer channel in the [Oracle Developers Slack workspace](https://app.slack.com/client/T01KVSQQYP3), or open an issue in [GitHub](https://github.com/oracle-samples/ai-optimizer/issues/new).

## Troubleshooting common problems

### Startup Time

**_Problem_**:
After starting the AI Optimizer, it takes a long time to load the first page.

**_Solution_**:
This is normally the result of a configured database that is inaccessible. Depending on how you've configured the database, if `retry_count`, and `retry_delay` is set but the database is inaccessible, the AI Optimizer will appear to hang for the duration of `retry_count * retry_delay` during the startup.

### Embedding Rate Limits

**_Problem_**:
During embedding, especially when using trial keys, you may experience a failure due to rate limits. For example:

```
Operation Failed: Unexpected error: status_code: 429, body:  
data=None message='trial token rate limit exceeded, limit is 100000 tokens per minute'.
```

**_Solution_**:
Set a rate limit based on the API Key restrictions.


### Testbed Evaluation

**_Problem_**:
During the Evaluation in the **Testbed**, a database error occurs: `DPY-4011: the database or network closed the connection`

**_Solution_**:
Increase the memory of the vector_memory_size.  If this is an Oracle Autonomous Database, scale up the CPU.

### Autonomous Database behind VPN

**_Problem_**:
Connection to an Autonomous database while inside a VPN fails.

**_Solution_**:
Update the database connection string to include a `https_proxy` and `https_proxy_port`.

  For example:
   
  ```text
  myadb_high = (
  description=(
      address=
      (protocol=tcps)(port=1522)
      (https_proxy=<proxy_host>)(https_proxy_port=<proxy_port>)  # <-- Add
      (host=<adb_host>)
  )(connect_data=(service_name=s<service_name>))(security=(ssl_server_dn_match=yes))
  )```