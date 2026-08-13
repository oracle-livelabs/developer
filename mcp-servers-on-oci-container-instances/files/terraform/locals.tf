locals {
  name_prefix       = "mcp-servers-lab"
  mcp_endpoint_path = "/mcp"

  vcn_cidr_block    = "10.0.0.0/16"
  subnet_cidr_block = "10.0.1.0/24"

  available_container_shape_names = [
    for shape in data.oci_container_instances_container_instance_shapes.available.container_instance_shape_collection[0].items : shape.name
  ]

  common_freeform_tags = {
    project    = "mcp-servers-on-oci-container-instances"
    managed-by = "terraform"
  }
}
