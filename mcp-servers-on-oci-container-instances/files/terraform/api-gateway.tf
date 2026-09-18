resource "oci_apigateway_gateway" "mcp_lab" {
  compartment_id = var.compartment_ocid
  display_name   = "${local.name_prefix}-gateway"
  endpoint_type  = "PUBLIC"
  freeform_tags  = local.common_freeform_tags
  subnet_id      = oci_core_subnet.api_gateway.id
}

resource "oci_apigateway_deployment" "mcp_servers" {
  compartment_id = var.compartment_ocid
  display_name   = "${local.name_prefix}-deployment"
  freeform_tags  = local.common_freeform_tags
  gateway_id     = oci_apigateway_gateway.mcp_lab.id
  path_prefix    = "/"

  specification {
    routes {
      path    = local.terraform_mcp_route_path
      methods = ["POST", "GET", "DELETE"]

      backend {
        type                       = "HTTP_BACKEND"
        url                        = "http://${data.oci_core_vnic.mcp_servers.private_ip_address}:${var.terraform_mcp_port}${local.mcp_endpoint_path}"
        connect_timeout_in_seconds = 60
        read_timeout_in_seconds    = 300
        send_timeout_in_seconds    = 300
      }
    }

    routes {
      path    = local.github_mcp_route_path
      methods = ["POST", "GET", "DELETE"]

      backend {
        type                       = "HTTP_BACKEND"
        url                        = "http://${data.oci_core_vnic.mcp_servers.private_ip_address}:${var.github_mcp_port}${local.mcp_endpoint_path}"
        connect_timeout_in_seconds = 60
        read_timeout_in_seconds    = 300
        send_timeout_in_seconds    = 300
      }
    }

    routes {
      path    = local.playwright_mcp_route_path
      methods = ["POST", "GET", "DELETE"]

      backend {
        type                       = "HTTP_BACKEND"
        url                        = "http://${data.oci_core_vnic.mcp_servers.private_ip_address}:${var.playwright_mcp_port}${local.mcp_endpoint_path}"
        connect_timeout_in_seconds = 60
        read_timeout_in_seconds    = 300
        send_timeout_in_seconds    = 300
      }
    }
  }
}
