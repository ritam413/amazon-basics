# Amazon Developer Hackathon 2026 — Developer Tool Friction Log
*Product Feedback & Tooling Evaluation (Eligible for 10% Judging Bonus)*

**Author:** DubPilot Engineering Team  
**Submission:** DubPilot (Alexa+ Track & AWS Builder Mini-Challenge)  
**Tools Evaluated:**
1. Amazon Bedrock Converse API (`anthropic.claude-3-5-sonnet-20241022-v2:0` & `amazon.nova-pro-v1:0`)
2. Alexa+ Simulated Multimodal Agent Tool-Calling Protocol
3. AWS SDK for JavaScript v3 (`@aws-sdk/client-bedrock-runtime`)

---

## Issue 1: Bedrock Converse API Streaming Tool Call Fragmentation
- **Tool Affected:** Amazon Bedrock ConverseStream API (`converseStream` endpoint)
- **Severity:** Medium-High
- **Expected Behavior:**
  When streaming a tool call from Bedrock, the `toolUse` block should emit complete parameter key-value pairs or structured incremental JSON chunks that can be reliably deserialized without requiring manual token-by-token string concatenation across stream events.
- **Actual Behavior:**
  The `toolUse.input` payload arrives in fractured character-level delta strings (`contentBlockDelta`), occasionally splitting double-byte UTF-8 characters across chunk boundaries. If the client attempts to stream-parse partial JSON before stream completion, syntax errors occur.
- **Reproduction Steps:**
  1. Call `bedrockRuntimeClient.send(new ConverseStreamCommand({...}))` with tool definitions containing complex nested JSON schema.
  2. Ask a multimodal query requiring structured parameters: e.g., `{"language": "hi", "seek_time": 42.5, "reasoning": "User requested Hindi dubbing for scene 3"}`.
  3. Observe incoming `chunk.contentBlockDelta.delta.toolUse.input` stream fragments.
- **Workaround Implemented:**
  Buffered all stream delta tokens into an accumulator buffer and only executed `JSON.parse` upon receipt of `messageStop` / `contentBlockStop`.
- **Proposed Fix for Amazon Bedrock Team:**
  Introduce an optional client-side SDK middleware or a server-side flag `emitCompleteToolInputs: true` that streams textual reasoning incrementally, but buffers and emits the structured tool invocation object only once its schema validation succeeds.

---

## Issue 2: Multimodal Latency Gap Between Voice Wake-Word and Bedrock Tool Dispatch
- **Tool Affected:** Alexa+ Multimodal Simulation / Web Speech API Integration
- **Severity:** Medium
- **Expected Behavior:**
  A viewer watching a video who speaks "Alexa, switch to Spanish" expects video audio to duck and change within sub-500ms for a seamless conversational television experience.
- **Actual Behavior:**
  The end-to-end roundtrip: (Microphone Audio -> Speech-to-Text ASR [300ms] -> AWS Bedrock Converse API [800ms-1200ms] -> Tool Execution & Speech Synthesis [400ms]) totals ~1.8 to 2.2 seconds. On a playing video, 2 seconds of latency makes conversational control feel disjointed.
- **Workaround Implemented:**
  Implemented speculative intent pre-routing on the client side: as soon as speech recognition emits the interim transcript containing high-confidence keywords (`"switch"`, `"hindi"`, `"spanish"`, `"subtitles"`), DubPilot instantly executes the UI state change with optimistic UI updates while concurrently invoking Bedrock for deep contextual reasoning and verbal confirmation.
- **Proposed Fix for Alexa+ Platform:**
  Provide an edge-compiled local intent parser for core playback primitives (seek, pause, track switch) combined with an asynchronous cloud Bedrock lane for generative dialogue queries.

---

## Issue 3: Cross-Origin Resource Sharing (CORS) on Direct Browser-to-Bedrock Invocation
- **Tool Affected:** AWS Bedrock Runtime Client in Pure Browser Environments
- **Severity:** Medium
- **Expected Behavior:**
  Developers building web-based prototype simulations for the Alexa+ hackathon should be able to authenticate directly with AWS Cognito Identity Pool temporary credentials and invoke Bedrock from client-side JavaScript without browser CORS rejections.
- **Actual Behavior:**
  Direct browser `fetch` to `bedrock-runtime.us-east-1.amazonaws.com` is rejected by default browser CORS preflight (`OPTIONS` request) unless proxied through AWS API Gateway, AWS Lambda, or a local proxy server.
- **Workaround Implemented:**
  Provided a zero-dependency lightweight local proxy (`server/server.js` and `server/bedrock_proxy.py`) and an offline Bedrock deterministic simulator mode that ensures 100% demo reliability even without active cloud network connectivity.
- **Proposed Fix for AWS Bedrock Team:**
  Enable configurable CORS headers on Bedrock Runtime endpoints when authenticated via AWS Cognito authenticated roles, matching S3 and DynamoDB browser SDK ergonomics.
