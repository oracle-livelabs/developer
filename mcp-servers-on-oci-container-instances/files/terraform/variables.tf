variable "tenancy_ocid" {
  description = "OCI tenancy OCID. Resource Manager can prepopulate this value; the lab stack does not use it directly."
  type        = string
  default     = ""
}

variable "current_user_ocid" {
  description = "OCI current user OCID. Resource Manager can prepopulate this value; the lab stack does not use it directly."
  type        = string
  default     = ""
}

variable "region" {
  description = "OCI region where Resource Manager runs this stack."
  type        = string
}

variable "compartment_ocid" {
  description = "Compartment OCID where the lab network and Container Instance are created."
  type        = string
}

variable "availability_domain" {
  description = "Availability domain for the OCI Container Instance."
  type        = string
}

variable "container_shape" {
  description = "OCI Container Instance shape for the three MCP server containers."
  type        = string
  default     = "CI.Standard.E4.Flex"

  validation {
    condition = contains([
      "CI.Standard.E4.Flex",
      "CI.Standard.E5.Flex",
      "CI.Standard.A1.Flex",
    ], var.container_shape)
    error_message = "container_shape must be one of CI.Standard.E4.Flex, CI.Standard.E5.Flex, or CI.Standard.A1.Flex."
  }
}

variable "container_ocpus" {
  description = "OCPUs assigned to the Container Instance. Increase this if Playwright browser automation needs more CPU."
  type        = number
  default     = 2

  validation {
    condition     = var.container_ocpus >= 1 && var.container_ocpus <= 94
    error_message = "container_ocpus must be between 1 and 94. The selected shape may have a lower maximum; Terraform validates that separately."
  }
}

variable "container_memory_in_gbs" {
  description = "Memory in GB assigned to the Container Instance. Increase this if Playwright browser automation needs more memory."
  type        = number
  default     = 8

  validation {
    condition     = var.container_memory_in_gbs >= 1 && var.container_memory_in_gbs <= 1504
    error_message = "container_memory_in_gbs must be between 1 and 1504. The selected shape may have stricter memory rules; Terraform validates that separately."
  }
}

variable "terraform_mcp_image" {
  description = "Container image for HashiCorp Terraform MCP Server."
  type        = string
  default     = "docker.io/hashicorp/terraform-mcp-server:1.2.0"
}

variable "github_mcp_image" {
  description = "Container image for GitHub MCP Server."
  type        = string
  default     = "ghcr.io/github/github-mcp-server:v1.9.0"
}

variable "playwright_mcp_image" {
  description = "Container image for Microsoft Playwright MCP Server."
  type        = string
  default     = "mcr.microsoft.com/playwright/mcp:v0.0.79"
}

variable "terraform_mcp_port" {
  description = "TCP port exposed by Terraform MCP Server."
  type        = number
  default     = 8080

  validation {
    condition     = var.terraform_mcp_port >= 1 && var.terraform_mcp_port <= 65535
    error_message = "terraform_mcp_port must be between 1 and 65535."
  }
}

variable "github_mcp_port" {
  description = "TCP port exposed by GitHub MCP Server."
  type        = number
  default     = 8082

  validation {
    condition     = var.github_mcp_port >= 1 && var.github_mcp_port <= 65535
    error_message = "github_mcp_port must be between 1 and 65535."
  }
}

variable "playwright_mcp_port" {
  description = "TCP port exposed by Playwright MCP Server."
  type        = number
  default     = 8931

  validation {
    condition     = var.playwright_mcp_port >= 1 && var.playwright_mcp_port <= 65535
    error_message = "playwright_mcp_port must be between 1 and 65535."
  }
}
