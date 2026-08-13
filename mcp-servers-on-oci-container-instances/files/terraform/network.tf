resource "oci_core_vcn" "mcp_lab" {
  compartment_id = var.compartment_ocid
  cidr_blocks    = [local.vcn_cidr_block]
  display_name   = "${local.name_prefix}-vcn"
  dns_label      = "mcpci"
  freeform_tags  = local.common_freeform_tags
}

resource "oci_core_internet_gateway" "mcp_lab" {
  compartment_id = var.compartment_ocid
  display_name   = "${local.name_prefix}-igw"
  enabled        = true
  freeform_tags  = local.common_freeform_tags
  vcn_id         = oci_core_vcn.mcp_lab.id
}

resource "oci_core_route_table" "mcp_lab" {
  compartment_id = var.compartment_ocid
  display_name   = "${local.name_prefix}-rt"
  freeform_tags  = local.common_freeform_tags
  vcn_id         = oci_core_vcn.mcp_lab.id

  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.mcp_lab.id
  }
}

resource "oci_core_security_list" "mcp_lab" {
  compartment_id = var.compartment_ocid
  display_name   = "${local.name_prefix}-sl"
  freeform_tags  = local.common_freeform_tags
  vcn_id         = oci_core_vcn.mcp_lab.id

  egress_security_rules {
    destination = "0.0.0.0/0"
    protocol    = "all"
  }

  ingress_security_rules {
    description = "Terraform MCP Streamable HTTP"
    protocol    = "6"
    source      = "0.0.0.0/0"

    tcp_options {
      min = var.terraform_mcp_port
      max = var.terraform_mcp_port
    }
  }

  ingress_security_rules {
    description = "GitHub MCP Streamable HTTP"
    protocol    = "6"
    source      = "0.0.0.0/0"

    tcp_options {
      min = var.github_mcp_port
      max = var.github_mcp_port
    }
  }

  ingress_security_rules {
    description = "Playwright MCP Streamable HTTP"
    protocol    = "6"
    source      = "0.0.0.0/0"

    tcp_options {
      min = var.playwright_mcp_port
      max = var.playwright_mcp_port
    }
  }
}

resource "oci_core_subnet" "mcp_lab" {
  cidr_block                 = local.subnet_cidr_block
  compartment_id             = var.compartment_ocid
  display_name               = "${local.name_prefix}-public-subnet"
  dns_label                  = "mcp"
  freeform_tags              = local.common_freeform_tags
  prohibit_public_ip_on_vnic = false
  route_table_id             = oci_core_route_table.mcp_lab.id
  security_list_ids          = [oci_core_security_list.mcp_lab.id]
  vcn_id                     = oci_core_vcn.mcp_lab.id
}
