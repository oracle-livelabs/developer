# import argparse
# import requests

# def decode_vin(vin: str, model_year: int):
#     url = f"https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{vin}?format=json&modelyear={model_year}"
#     response = requests.get(url)

#     if response.status_code == 200:
#         data = response.json()
#         return data
#     else:
#         raise Exception(f"API request failed with status code {response.status_code}")

# def main():
#     parser = argparse.ArgumentParser(description="Decode a vehicle VIN using the NHTSA API.")
#     parser.add_argument("vin", type=str, help="Vehicle Identification Number")
#     parser.add_argument("model_year", type=int, help="Model year of the vehicle")
    
#     args = parser.parse_args()

#     result = decode_vin(args.vin, args.model_year)

#     for item in result["Results"]:
#         if item["Value"]:
#             print(f"{item['Variable']}: {item['Value']}")

# if __name__ == "__main__":
#     main()

# import argparse
# import requests
# import json

# def decode_vin(vin: str, model_year: int):
#     url = f"https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{vin}?format=json&modelyear={model_year}"
#     response = requests.get(url)

#     if response.status_code == 200:
#         return response.json()
#     else:
#         raise Exception(f"API request failed with status code {response.status_code}")

# def main():
#     parser = argparse.ArgumentParser(description="Decode a vehicle VIN using the NHTSA API.")
#     parser.add_argument("vin", type=str, help="Vehicle Identification Number")
#     parser.add_argument("model_year", type=int, help="Model year of the vehicle")
#     parser.add_argument("--pretty", action="store_true", help="Print JSON output formatted")

#     args = parser.parse_args()

#     result = decode_vin(args.vin, args.model_year)

#     if args.pretty:
#         print(json.dumps(result, indent=2))
#     else:
#         print(result)  # Will print a raw dict (still valid JSON if redirected or used in code)

# if __name__ == "__main__":
#     main()

# import argparse
# import requests
# import json

# def decode_vin(vin: str, model_year: int):
#     url = f"https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{vin}?format=json&modelyear={model_year}"
#     response = requests.get(url)

#     if response.status_code != 200:
#         raise Exception(f"API request failed with status code {response.status_code}")
    
#     data = response.json()
    
#     # Convert results into a dictionary {Variable: Value}
#     db_ready = {}
#     for item in data["Results"]:
#         key = item["Variable"]
#         value = item["Value"]
#         if value:  # Skip empty/null values
#             db_ready[key] = value

#     return db_ready

# def main():
#     parser = argparse.ArgumentParser(description="Decode a vehicle VIN and prepare DB-ready output.")
#     parser.add_argument("vin", type=str, help="Vehicle Identification Number")
#     parser.add_argument("model_year", type=int, help="Model year of the vehicle")
#     parser.add_argument("--pretty", action="store_true", help="Print JSON formatted output")

#     args = parser.parse_args()

#     result = decode_vin(args.vin, args.model_year)

#     if args.pretty:
#         print(json.dumps(result, indent=2))
#     else:
#         print(result)

# if __name__ == "__main__":
#     main()

# import argparse
# import requests
# import json
# import re

# def sanitize_key(key: str) -> str:
#     """
#     Converts 'Model Year' -> 'model_year'
#     Also removes special characters like /, (), etc.
#     """
#     key = key.lower()
#     key = re.sub(r'[^a-z0-9 ]+', '', key)       # Remove non-alphanumeric (except space)
#     key = re.sub(r'\s+', '_', key)              # Replace spaces with underscores
#     return key

# def decode_vin(vin: str, model_year: int):
#     url = f"https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{vin}?format=json&modelyear={model_year}"
#     response = requests.get(url)
#     response.raise_for_status()

#     data = response.json()
#     result = {}

#     for item in data["Results"]:
#         if item["Value"]:
#             key = sanitize_key(item["Variable"])
#             result[key] = item["Value"]

#     result["vin"] = vin
#     result["model_year"] = model_year

#     return result

# def main():
#     parser = argparse.ArgumentParser(description="Decode a vehicle VIN and clean variable names.")
#     parser.add_argument("vin", type=str, help="Vehicle Identification Number")
#     parser.add_argument("model_year", type=int, help="Model year of the vehicle")
#     parser.add_argument("--pretty", action="store_true", help="Pretty-print output JSON")

#     args = parser.parse_args()

#     result = decode_vin(args.vin, args.model_year)

#     if args.pretty:
#         print(json.dumps(result, indent=2))
#     else:
#         print(result)

# if __name__ == "__main__":
#     main()

# import argparse
# import requests
# import json
# import re

# # Your mapping dictionary here (variable_to_column)
# variable_to_column = {
#     "error_code": "error_code",
#     "error_text": "error_text",
#     "vehicle_descriptor": "vehicle_descriptor",
#     "make": "make",
#     "manufacturer_name": "manufacturer_name",
#     "model": "model",
#     "model_year": "model_year",
#     "series": "series",
#     "series2": "series2",
#     "vehicle_type": "vehicle_type",
#     "body_class": "body_class",
#     "doors": "doors",
#     "drive_type": "drive_type",
#     "brake_system_type": "brake_system_type",
#     "engine_number_of_cylinders": "engine_number_of_cylinders",
#     "displacement_cc": "displacement_cc",
#     "displacement_ci": "displacement_ci",
#     "displacement_l": "displacement_l",
#     "engine_configuration": "engine_configuration",
#     "fuel_delivery_fuel_injection_type": "fuel_delivery_type",  # you might want to update key if needed
#     "other_engine_info": "other_engine_info",
#     "gross_vehicle_weight_rating_from": "gross_vehicle_weight_from",
#     "trailer_type_connection": "trailer_type_connection",
#     "trailer_body_type": "trailer_body_type",
#     "custom_motorcycle_type": "custom_motorcycle_type",
#     "motorcycle_suspension_type": "motorcycle_suspension_type",
#     "motorcycle_chassis_type": "motorcycle_chassis_type",
#     "bus_floor_configuration_type": "bus_floor_config_type",
#     "bus_type": "bus_type",
#     "plant_city": "plant_city",
#     "plant_state": "plant_state",
#     "plant_country": "plant_country",
#     "plant_company_name": "plant_company_name"
# }

# def sanitize_key(key: str) -> str:
#     key = key.lower()
#     key = re.sub(r'[^a-z0-9 ]+', '', key)       # Remove non-alphanumeric except space
#     key = re.sub(r'\s+', '_', key)              # Replace spaces with underscores
#     return key

# def decode_vin(vin: str, model_year: int):
#     url = f"https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/{vin}?format=json&modelyear={model_year}"
#     response = requests.get(url)
#     response.raise_for_status()

#     data = response.json()
#     result = {}

#     for item in data["Results"]:
#         if item["Value"]:
#             key = sanitize_key(item["Variable"])
#             column_name = variable_to_column.get(key)
#             if column_name:
#                 result[column_name] = item["Value"]

#     # Explicitly add VIN and model_year in case missing
#     result["vin"] = vin
#     result["model_year"] = model_year

#     return result

# def post_to_endpoint(payload: dict, endpoint: str):
#     headers = {'Content-Type': 'application/json'}
#     response = requests.post(endpoint, json=payload, headers=headers)
#     response.raise_for_status()
#     return response.json()

# def main():
#     parser = argparse.ArgumentParser(description="Decode VIN and send to Oracle REST endpoint")
#     parser.add_argument("vin", type=str, help="Vehicle Identification Number")
#     parser.add_argument("model_year", type=int, help="Model year of the vehicle")
#     parser.add_argument("--pretty", action="store_true", help="Pretty-print output JSON")
#     args = parser.parse_args()

#     result = decode_vin(args.vin, args.model_year)

#     # Print to console
#     if args.pretty:
#         print(json.dumps(result, indent=2))
#     else:
#         print(result)

#     # POST to local Oracle REST Data Services endpoint
#     endpoint_url = "http://localhost:8080/ords/ordsdemo/vin_decoded/"
#     try:
#         post_response = post_to_endpoint(result, endpoint_url)
#         print("\nPOST response from server:")
#         print(json.dumps(post_response, indent=2))
#     except requests.HTTPError as e:
#         print(f"Error posting to endpoint: {e}")

# if __name__ == "__main__":
#     main()

import argparse
import requests
import json
import re

def sanitize_key(key: str) -> str:
    # Convert keys to lowercase, replace non-alphanumeric characters with underscores.
    key = key.strip()
    key = re.sub(r'[^a-zA-Z0-9]+', '_', key)
    return key.lower()

def decode_vin(vin: str, model_year: int):
    url = f"https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/{vin}?format=json&modelyear={model_year}"
    response = requests.get(url)
    response.raise_for_status()

    data = response.json()

    if "Results" not in data or not data["Results"]:
        raise ValueError("Invalid API response: No Results found.")

    raw_result = data["Results"][0]

    # Sanitize keys and skip empty values
    result = {
        sanitize_key(k): v
        for k, v in raw_result.items()
        if v not in (None, "", "Not Applicable")
    }

    return result

def post_to_endpoint(payload: dict, endpoint: str):
    headers = {'Content-Type': 'application/json'}
    response = requests.post(endpoint, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()

def main():
    parser = argparse.ArgumentParser(description="Decode VIN and send to Oracle REST endpoint")
    parser.add_argument("vin", type=str, help="Vehicle Identification Number")
    parser.add_argument("model_year", type=int, help="Model year of the vehicle")
    parser.add_argument("--pretty", action="store_true", help="Pretty-print output JSON")
    args = parser.parse_args()

    # Decode and sanitize
    result = decode_vin(args.vin, args.model_year)

    # Print to console
    if args.pretty:
        print(json.dumps(result, indent=2))
    else:
        print(result)

    # POST to local Oracle ORDS endpoint
    endpoint_url = "http://localhost:8080/ords/ordsdemo/vin_table/"
    try:
        post_response = post_to_endpoint(result, endpoint_url)
        print("\nPOST response from server:")
        print(json.dumps(post_response, indent=2))
    except requests.HTTPError as e:
        print(f"Error posting to endpoint: {e}")

if __name__ == "__main__":
    main()
