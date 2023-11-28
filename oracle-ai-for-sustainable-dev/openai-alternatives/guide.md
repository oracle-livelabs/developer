# How to connect to an OCI Compute Instance via SSH

In this guide, I'm using [MobaXterm](https://mobaxterm.mobatek.net/) as my SSH client (I'm using Windows).

1. In MobaXterm, we need to create a new SSH session to our newly-created OCI Compute Instance:
![](https://ajeuwbhvhr.cloudimg.io/colony-recorder.s3.amazonaws.com/files/2023-05-09/8c5220b6-8835-4220-b7ea-d4e30b79cd9a/screenshot.jpeg?tl_px=0,162&br_px=746,582&sharp=0.8&width=560&wat_scale=50&wat=1&wat_opacity=1&wat_gravity=northwest&wat_url=https://colony-recorder.s3.amazonaws.com/images/watermarks/0EA5E9_standard.png&wat_pad=116,139)

1. We fill this menu with our data: our `IP` address, username `opc` and an additional `advanced` SSH option to use public-private key cryptography as the authentication mechanism when connecting into the machine.**
![](https://colony-recorder.s3.amazonaws.com/files/2023-05-09/8213a2df-0bc0-41d0-ba82-d4918f53d255/stack_animation.webp)

**3. Now, we select the ssh key that we downloaded while creating the OCI Compute Instance as the private key to use in our SSH connection:
![](https://colony-recorder.s3.amazonaws.com/files/2023-05-09/9a4cc6dd-32f7-4264-8faa-528708b9cf95/stack_animation.webp)

4. Now that our SSH connection is configured, let's **access** our Compute Instance:
![](https://ajeuwbhvhr.cloudimg.io/colony-recorder.s3.amazonaws.com/files/2023-05-09/abb99180-696a-4128-a7c5-4162a9d2acbd/screenshot.jpeg?tl_px=1208,596&br_px=1954,1016&sharp=0.8&width=560&wat_scale=50&wat=1&wat_opacity=1&wat_gravity=northwest&wat_url=https://colony-recorder.s3.amazonaws.com/images/watermarks/0EA5E9_standard.png&wat_pad=262,139)

5. We copy, from [this repository's `README`](https://github.com/jasperan/oci-gpt4/blob/main/README.md), the curl command to download the gpt4all checkpoint:
![](https://ajeuwbhvhr.cloudimg.io/colony-recorder.s3.amazonaws.com/files/2023-05-09/700a0df8-8f39-4ef9-b4f5-f222451b36d5/user_cropped_screenshot.jpeg?tl_px=102,0&br_px=848,363&sharp=0.8&width=560)

6. We download a compatible `gpt4all` model from their official website (the one we'll use):
![](https://ajeuwbhvhr.cloudimg.io/colony-recorder.s3.amazonaws.com/files/2023-05-09/46a9c304-e3ca-4be7-8407-d208b00ef1f6/user_cropped_screenshot.jpeg?tl_px=533,0&br_px=1279,158&sharp=0.8&width=560)

7. Now, we will create our new conda environment (Python 3.10 as GPT4all requires Python > 3.8):

    `conda create -n "generative_ai_conda_environment" python=3.10`

    ![](https://ajeuwbhvhr.cloudimg.io/colony-recorder.s3.amazonaws.com/files/2023-05-09/79b99734-e811-4e8b-8452-dc607ffc3676/screenshot.jpeg?tl_px=1122,581&br_px=1868,1001&sharp=0.8&width=560)

8. We create a conda environment and activate it after:
![](https://colony-recorder.s3.amazonaws.com/files/2023-05-09/1c013c86-ab1e-4b88-89e7-0676b6786f35/stack_animation.webp)

9. And we install pip dependencies:
![](https://colony-recorder.s3.amazonaws.com/files/2023-05-09/5cdae488-6c56-4387-a8b6-f176b52c5c4e/stack_animation.webp)

10.  Then, we test both Python examples: `test.py` and `interactive_test.py`: 
![](https://colony-recorder.s3.amazonaws.com/files/2023-05-09/bf08a736-7490-42d1-8c1d-2ba5fc1ae061/stack_animation.webp)

