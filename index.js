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
const { google } = require("googleapis");
const credentials = require("./google-service-user.json");
const dotenv = require("dotenv").config({ path: "./.env" });
app.listen(9000, () => {
  console.log("Server running on 9000");
});

const openAIServiceAdapter = new OpenAIAdapter({ model: "gpt-4o-mini" });
const geminiServiceAdapter = new GoogleGenerativeAIAdapter({
  model: "gemini-1.5-flash",
});
const anthropicServiceAdapter = new AnthropicAdapter({
  model: "claude-3-5-sonnet-20241022",
});

app.use("/form-response", async (req, res, next) => {
    console.log('req.body', req);
    const body = req.body;
    console.log('body', body);
    console.log('responseItem', body[0].getResponse())
    body.forEach((item) => {
      console.log('item', item.getItem(), item.getResponse())
    })

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
