// src/nodes/GenericNode.jsx
import { nodeConfigs } from "../configs/nodeConfigs";
import { fieldGroups } from "../configs/fieldGroups";
import { BaseNode } from "./baseNode";

export const GenericNode = ({ id, data, selected, type }) => {
  const config = nodeConfigs[type];
  const fields = fieldGroups[config.fieldsKey] || [];

  const dynamicHandles =
    type === "text" && data?.dynamicInputHandles
      ? data.dynamicInputHandles.map((name, index) => ({
          id: name,
          position: "Left",
          style: { top: `${50 + index * 20}px` },
        }))
      : [];

  const inputHandles = [...(config.inputHandles || []), ...dynamicHandles];

  return (
    <BaseNode
      id={id}
      data={data}
      selected={selected}
      title={config.title}
      subTitle={config.subTitle}
      Icon={config.icon}
      inputHandles={inputHandles}
      outputHandles={config.outputHandles}
      fields={fields}
    />
  );
};
