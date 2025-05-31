// src/nodes/configs/nodeConfigs.js
import { MdInput, MdOutput, MdTextFields, MdCalculate } from "react-icons/md";
import {
  MdOutlineForkRight,
  MdTimer,
  MdHttp,
  MdCloudUpload,
  MdSummarize,
} from "react-icons/md";

import { GiArtificialIntelligence } from "react-icons/gi";

export const nodeConfigs = {
  customInput: {
    title: "Input",
    subTitle: "Pass data of different types into your workflow",
    icon: MdInput,
    fieldsKey: "inputFields",
    inputHandles: [],
    outputHandles: [{ id: "value" }],
  },
  customOutput: {
    title: "Output",
    subTitle: "Type {{ in downstream nodes to leverage output fields",
    icon: MdOutput,
    fieldsKey: "outputFields",
    inputHandles: [{ id: "value" }],
    outputHandles: [],
  },
  text: {
    title: "Text",
    subTitle: "Type {{ to utilize variables",
    icon: MdTextFields,
    fieldsKey: "textFields",
    inputHandles: [],
    outputHandles: [{ id: "out" }],
  },
  llm: {
    title: "LLM",
    subTitle: "Choose any of the llm from the list",
    icon: GiArtificialIntelligence,
    fieldsKey: "llmFields",
    inputHandles: [
      { id: "system", style: { top: "33%" } },
      { id: "prompt", style: { top: "66%" } },
    ],
    outputHandles: [{ id: "response" }],
  },

  condition: {
    title: "Condition",
    subTitle: "Branch based on a condition",
    icon: MdOutlineForkRight,
    fieldsKey: "conditionFields",
    inputHandles: [{ id: "input" }],
    outputHandles: [
      { id: "true", style: { top: "50px" } },
      { id: "false", style: { top: "80px" } },
    ],
  },
  delay: {
    title: "Delay",
    subTitle: "Pause execution for a while",
    icon: MdTimer,
    fieldsKey: "delayFields",
    inputHandles: [{ id: "in" }],
    outputHandles: [{ id: "out" }],
  },
  webhook: {
    title: "Webhook",
    subTitle: "Send request to external API",
    icon: MdHttp,
    fieldsKey: "webhookFields",
    inputHandles: [{ id: "payload" }],
    outputHandles: [{ id: "response" }],
  },
  fileUpload: {
    title: "File Upload",
    subTitle: "Inject files into flow",
    icon: MdCloudUpload,
    fieldsKey: "fileFields",
    inputHandles: [],
    outputHandles: [{ id: "file" }],
  },
  // summary: {
  //   title: "Summarize",
  //   subTitle: "Ai generated text summary",
  //   icon: MdSummarize,
  //   fieldsKey: "summaryFields",
  //   iinputHandles: [{ id: "text" }],
  //   outputHandles: [{ id: "summary" }],
  // },
};
