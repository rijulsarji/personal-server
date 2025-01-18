const {
  CopilotRuntime,
  copilotRuntimeNodeExpressEndpoint,
  OpenAIAdapter,
  GoogleGenerativeAIAdapter,
  AnthropicAdapter,
} = require("@copilotkit/runtime");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const express = require("express");
const app = express();
app.listen(9000, () => {
  console.log("Server running on 9000");
});

const openAIServiceAdapter = new OpenAIAdapter({ model: "gpt-4o-mini" });
const anthropicServiceAdapter = new AnthropicAdapter({
  model: "claude-3-5-sonnet-20241022",
});

app.use(express.json());
app.use("/form-response", async (req, res) => {
  console.log("req.body", req);
  console.log("Timestamp:", req.body);
  return res.send("Hello world");
});

app.use("/copilotkit-chat-claude", (req, res, next) => {
  const runtime = new CopilotRuntime();
  const handler = copilotRuntimeNodeExpressEndpoint({
    runtime,
    serviceAdapter: anthropicServiceAdapter,
    endpoint: "/copilotkit-chat-claude",
  });

  return handler(req, res, next);
});

app.use("/copilotkit-chat-gpt", (req, res, next) => {
  const runtime = new CopilotRuntime();
  const handler = copilotRuntimeNodeExpressEndpoint({
    runtime,
    serviceAdapter: openAIServiceAdapter,
    endpoint: "/copilotkit-chat-gpt",
  });

  return handler(req, res, next);
});


app.use("/copilotkit", (req, res, next) => {
  const runtime = new CopilotRuntime();
  const handler = copilotRuntimeNodeExpressEndpoint({
    runtime,
    serviceAdapter: openAIServiceAdapter,
    endpoint: "/copilotkit",
  });

  return handler(req, res, next);
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
