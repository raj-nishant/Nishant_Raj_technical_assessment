// src/toolbar.js
import { DraggableNode } from "./draggableNode";
import { nodeConfigs } from "./configs/nodeConfigs";
import { theme } from "./theme";

export const PipelineToolbar = () => {
  return (
    <div style={{ padding: theme.spacing.md }}>
      <div
        style={{
          marginTop: theme.spacing.xl,
          display: "flex",
          flexWrap: "wrap",
          gap: theme.spacing.md,
        }}
      >
        {Object.entries(nodeConfigs).map(([type, config]) => (
          <DraggableNode
            key={type}
            type={type}
            label={config.title}
            Icon={config.icon}
          />
        ))}
      </div>
    </div>
  );
};
