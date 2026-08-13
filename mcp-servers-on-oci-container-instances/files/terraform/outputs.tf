output "container_instance_public_ip" {
  description = "Public IP address assigned to the OCI Container Instance VNIC."
  value       = data.oci_core_vnic.mcp_servers.public_ip_address
}

output "terraform_mcp_url" {
  description = "Remote Streamable HTTP URL for Terraform MCP Server."
  value       = "http://${data.oci_core_vnic.mcp_servers.public_ip_address}:${var.terraform_mcp_port}${local.mcp_endpoint_path}"
}

output "github_mcp_url" {
  description = "Remote Streamable HTTP URL for GitHub MCP Server."
  value       = "http://${data.oci_core_vnic.mcp_servers.public_ip_address}:${var.github_mcp_port}${local.mcp_endpoint_path}"
}

output "playwright_mcp_url" {
  description = "Remote Streamable HTTP URL for Playwright MCP Server."
  value       = "http://${data.oci_core_vnic.mcp_servers.public_ip_address}:${var.playwright_mcp_port}${local.mcp_endpoint_path}"
}

output "available_container_instance_shapes" {
  description = "Container Instance shape names returned by OCI for the selected compartment and availability domain."
  value       = local.available_container_shape_names
}

output "github_mcp_client_header_note" {
  description = "GitHub MCP authentication safety note."
  value       = "This stack does not store a GitHub token. Do not send real GitHub bearer tokens to the public HTTP GitHub MCP endpoint. Authenticated GitHub MCP calls require a protected TLS/private path or an explicitly approved disposable lab token."
}
