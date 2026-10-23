"""
DubPilot — AWS Bedrock Converse API Proxy (Python / Boto3)
Invokes Amazon Bedrock Converse API with tool definitions for the Alexa+ agent.
"""

import os
import json
from http.server import HTTPServer, BaseHTTPRequestHandler
import boto3
from botocore.exceptions import ClientError

AWS_REGION = os.environ.get("AWS_REGION", "us-east-1")
bedrock = boto3.client("bedrock-runtime", region_name=AWS_REGION)

class BedrockProxyHandler(BaseHTTPRequestHandler):
    def _set_cors_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS, GET")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(204)
        self._set_cors_headers()
        self.end_headers()

    def do_POST(self):
        if self.path == "/api/bedrock/converse":
            content_length = int(self.headers.get("Content-Length", 0))
            body_bytes = self.rfile.read(content_length)
            payload = json.loads(body_bytes.decode("utf-8"))

            model_id = payload.get("modelId", "anthropic.claude-3-5-sonnet-20241022-v2:0")
            prompt = payload.get("prompt", "")
            tools = payload.get("tools", [])
            video_state = payload.get("videoState", {})

            system_prompt = (
                "You are Alexa+, the intelligent multimodal video copilot for DubPilot. "
                "The user is watching a video with multilingual dubs (Hindi, Spanish, French, English). "
                f"Current video state: Time={video_state.get('currentTime', 0):.1f}s, Language={video_state.get('currentLanguage', 'en')}. "
                "When the user requests language changes, subtitle tweaks, replays, or stem ducking, "
                "invoke the corresponding tool call and provide a concise, friendly spoken response."
            )

            messages = [
                {
                    "role": "user",
                    "content": [{"text": prompt}]
                }
            ]

            try:
                # AWS Bedrock Converse API Call
                response = bedrock.converse(
                    modelId=model_id,
                    messages=messages,
                    system=[{"text": system_prompt}],
                    toolConfig={"tools": tools} if tools else None,
                    inferenceConfig={"maxTokens": 512, "temperature": 0.2}
                )

                output_message = response.get("output", {}).get("message", {})
                content_blocks = output_message.get("content", [])

                spoken_response = ""
                tool_call = None

                for block in content_blocks:
                    if "text" in block:
                        spoken_response += block["text"]
                    elif "toolUse" in block:
                        tu = block["toolUse"]
                        tool_call = {
                            "name": tu.get("name"),
                            "parameters": tu.get("input")
                        }

                res_payload = {
                    "model": model_id,
                    "spokenResponse": spoken_response or "Executing requested action.",
                    "toolCall": tool_call,
                    "reasoning": f"Bedrock processed prompt via {model_id} with tool use.",
                    "timestamp": response.get("ResponseMetadata", {}).get("HTTPHeaders", {}).get("date")
                }

                self.send_response(200)
                self.send_header("Content-Type", "application/json")
                self._set_cors_headers()
                self.end_headers()
                self.wfile.write(json.dumps(res_payload).encode("utf-8"))

            except ClientError as e:
                self.send_response(500)
                self.send_header("Content-Type", "application/json")
                self._set_cors_headers()
                self.end_headers()
                err_payload = {"error": str(e)}
                self.wfile.write(json.dumps(err_payload).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

def run_server(port=3001):
    server = HTTPServer(("0.0.0.0", port), BedrockProxyHandler)
    print(f"[*] DubPilot AWS Bedrock Proxy running on http://localhost:{port}/api/bedrock/converse")
    server.serve_forever()

if __name__ == "__main__":
    run_server()
