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

app.use(express.json());
app.use("/form-response", async (req, res) => {
  console.log("req.body", req);
  console.log("Timestamp:", req.body);
  return res.send("Hello world");
});

app.use("/copilotkit-chat", (req, res, next) => {
  const runtime = new CopilotRuntime();
  const handler = copilotRuntimeNodeExpressEndpoint({
    runtime,
    serviceAdapter: openAIServiceAdapter,
    endpoint: "/copilotkit-chat",
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
