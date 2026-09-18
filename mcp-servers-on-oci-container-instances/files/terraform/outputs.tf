output "api_gateway_hostname" {
  description = "Generated OCI API Gateway hostname."
  value       = oci_apigateway_gateway.mcp_lab.hostname
}

output "api_gateway_endpoint" {
  description = "Base HTTPS endpoint for the OCI API Gateway deployment."
  value       = trimsuffix(oci_apigateway_deployment.mcp_servers.endpoint, "/")
}

output "terraform_mcp_url" {
  description = "Remote Streamable HTTP URL for Terraform MCP Server through OCI API Gateway."
  value       = "${trimsuffix(oci_apigateway_deployment.mcp_servers.endpoint, "/")}${local.terraform_mcp_route_path}"
}

output "github_mcp_url" {
  description = "Remote Streamable HTTP URL for GitHub MCP Server through OCI API Gateway."
  value       = "${trimsuffix(oci_apigateway_deployment.mcp_servers.endpoint, "/")}${local.github_mcp_route_path}"
}

output "playwright_mcp_url" {
  description = "Remote Streamable HTTP URL for Playwright MCP Server through OCI API Gateway."
  value       = "${trimsuffix(oci_apigateway_deployment.mcp_servers.endpoint, "/")}${local.playwright_mcp_route_path}"
}

output "available_container_instance_shapes" {
  description = "Container Instance shape names returned by OCI for the selected compartment and availability domain."
  value       = local.available_container_shape_names
}
