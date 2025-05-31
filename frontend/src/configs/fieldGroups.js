// src/nodes/configs/fieldGroups.js

export const fieldGroups = {
  inputFields: [
    { name: "inputName", label: "Name", type: "text" },
    {
      name: "inputType",
      label: "Type",
      type: "select",
      options: ["Text", "File"],
    },
  ],
  outputFields: [
    { name: "outputName", label: "Name", type: "text" },
    {
      name: "outputType",
      label: "Type",
      type: "select",
      options: ["Text", "Image"],
    },
  ],
  textFields: [
    {
      name: "text",
      label: "Text",
      type: "customTextArea",
    },
  ],
  llmFields: [
    { name: "prompt", label: "Prompt", type: "text" },
    {
      name: "temperature",
      label: "Temperature",
      type: "select",
      options: ["0.2", "0.5", "0.9"],
    },
  ],
  conditionFields: [
    { name: "expression", label: "Condition (JS)", type: "text" },
  ],
  delayFields: [{ name: "seconds", label: "Delay (s)", type: "text" }],
  webhookFields: [
    { name: "url", label: "Endpoint URL", type: "text" },
    {
      name: "method",
      label: "Method",
      type: "select",
      options: ["POST", "GET"],
    },
  ],
  fileFields: [{ name: "label", label: "Label", type: "text" }],
  // summaryFields: [
  //   {
  //     name: "model",
  //     label: "Model",
  //     type: "select",
  //     options: ["gpt-4", "gemini"],
  //   },
  // ],
};
