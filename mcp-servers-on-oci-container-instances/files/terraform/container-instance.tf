data "oci_container_instances_container_instance_shapes" "available" {
  compartment_id      = var.compartment_ocid
  availability_domain = var.availability_domain
}

resource "oci_container_instances_container_instance" "mcp_servers" {
  availability_domain = var.availability_domain
  compartment_id      = var.compartment_ocid
  display_name        = "${local.name_prefix}-container-instance"
  freeform_tags       = local.common_freeform_tags
  shape               = var.container_shape

  shape_config {
    ocpus         = var.container_ocpus
    memory_in_gbs = var.container_memory_in_gbs
  }

  vnics {
    display_name          = "${local.name_prefix}-vnic"
    is_public_ip_assigned = true
    subnet_id             = oci_core_subnet.container_instance.id
  }

  containers {
    display_name                   = "terraform-mcp-server"
    image_url                      = var.terraform_mcp_image
    is_resource_principal_disabled = true

    environment_variables = {
      ENABLE_TF_OPERATIONS = "false"
      MCP_ENDPOINT         = local.mcp_endpoint_path
      TRANSPORT_HOST       = "0.0.0.0"
      TRANSPORT_MODE       = "streamable-http"
      TRANSPORT_PORT       = tostring(var.terraform_mcp_port)
    }
  }

  containers {
    display_name                   = "github-mcp-server"
    image_url                      = var.github_mcp_image
    is_resource_principal_disabled = true

    arguments = [
      "http",
      "--listen-host",
      "0.0.0.0",
      "--port",
      tostring(var.github_mcp_port),
      "--base-path",
      local.mcp_endpoint_path,
      "--read-only",
    ]
  }

  containers {
    display_name                   = "playwright-mcp-server"
    image_url                      = var.playwright_mcp_image
    is_resource_principal_disabled = true

    arguments = [
      "--headless",
      "--browser",
      "chromium",
      "--no-sandbox",
      "--port",
      tostring(var.playwright_mcp_port),
      "--host",
      "0.0.0.0",
      "--allowed-hosts",
      "*",
      "--isolated",
    ]
  }

  lifecycle {
    precondition {
      condition     = contains(local.available_container_shape_names, var.container_shape)
      error_message = "Selected container_shape is not available for the selected compartment and availability domain. Choose one of: ${join(", ", local.available_container_shape_names)}."
    }

    precondition {
      condition = (
        (var.container_shape == "CI.Standard.E4.Flex" && var.container_ocpus <= 64) ||
        (var.container_shape == "CI.Standard.E5.Flex" && var.container_ocpus <= 94) ||
        (var.container_shape == "CI.Standard.A1.Flex" && var.container_ocpus <= 76)
      )
      error_message = "container_ocpus exceeds the selected Container Instance shape limit. E4 allows up to 64 OCPUs, E5 allows up to 94 OCPUs, and A1 allows up to 76 OCPUs."
    }

    precondition {
      condition = (
        (
          var.container_shape == "CI.Standard.E4.Flex" &&
          var.container_memory_in_gbs >= max(1, var.container_ocpus) &&
          var.container_memory_in_gbs <= min(1024, var.container_ocpus * 64)
        ) ||
        (
          var.container_shape == "CI.Standard.E5.Flex" &&
          var.container_memory_in_gbs >= 1 &&
          var.container_memory_in_gbs <= 1504
        ) ||
        (
          var.container_shape == "CI.Standard.A1.Flex" &&
          var.container_memory_in_gbs >= max(1, var.container_ocpus) &&
          var.container_memory_in_gbs <= min(488, var.container_ocpus * 64)
        )
      )
      error_message = "container_memory_in_gbs is outside the selected shape limits. E4 requires at least max(1 GB, OCPUs) and up to 64 GB/OCPU or 1024 GB total; E5 allows 1-1504 GB; A1 requires at least max(1 GB, OCPUs) and up to 64 GB/OCPU or 488 GB total."
    }
  }
}

data "oci_core_vnic" "mcp_servers" {
  vnic_id = oci_container_instances_container_instance.mcp_servers.vnics[0].vnic_id
}
