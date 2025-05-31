export const getInitNodeData = (nodeID, type) => {
  const base = { id: nodeID, nodeType: type };

  switch (type) {
    case "customInput":
      return {
        ...base,
        inputName: nodeID.replace("customInput-", "input_"),
        inputType: "Text",
      };
    case "customOutput":
      return {
        ...base,
        outputName: nodeID.replace("customOutput-", "output_"),
        outputType: "Text",
      };
    case "text":
      return {
        ...base,
        text: "",
        dynamicInputHandles: [],
      };
    case "llm":
      return {
        ...base,
        prompt: "",
        temperature: "0.5",
      };

    case "condition":
      return {
        ...base,
        expression: "input > 0",
      };
    case "delay":
      return {
        ...base,
        seconds: "5",
      };
    case "webhook":
      return {
        ...base,
        url: "https://api.example.com/endpoint",
        method: "POST",
      };
    case "fileUpload":
      return {
        ...base,
        label: "Upload something",
      };
    case "summary":
      return {
        ...base,
        model: "gpt-4",
      };

    default:
      return base;
  }
};
