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
  default     = "ocir.ca-toronto-1.oci.oraclecloud.com/yzrh1ull1ess/mcp-servers-on-oci-container-instances/terraform-mcp-server@sha256:bd095e2b442a2cb61255fe4db52f9e824f35d307a2044784c95d37a93f18d324"
}

variable "github_mcp_image" {
  description = "Container image for GitHub MCP Server."
  type        = string
  default     = "ocir.ca-toronto-1.oci.oraclecloud.com/yzrh1ull1ess/mcp-servers-on-oci-container-instances/github-mcp-server@sha256:a4cbe1568e70a50e44c088c479b0620cfa994d30aaa8ebded048933ea1d9d97b"
}

variable "playwright_mcp_image" {
  description = "Container image for Microsoft Playwright MCP Server."
  type        = string
  default     = "ocir.ca-toronto-1.oci.oraclecloud.com/yzrh1ull1ess/mcp-servers-on-oci-container-instances/playwright-mcp-server@sha256:9befda258ad1b0c940b8f8152383f238057be76e07620d1b04d3b67b53b66822"
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
