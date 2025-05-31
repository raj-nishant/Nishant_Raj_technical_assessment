// src/draggableNode.js
import { theme } from "./theme";

export const DraggableNode = ({ type, label, Icon }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={type}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      style={{
        cursor: "grab",
        minWidth: "100px",
        padding: theme.spacing.md,
        display: "flex",
        alignItems: "center",
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.light,
        border: `1px solid ${theme.colors.slate}`,
        justifyContent: "center",
        flexDirection: "column",
        transition: "all 0.2s ease",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        ":hover": {
          borderColor: theme.colors.primary,
          transform: "translateY(-2px)",
        },
      }}
      draggable
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          backgroundColor: theme.colors.primary,
          marginBottom: theme.spacing.sm,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Icon size={20} />
      </div>
      <span
        style={{
          color: theme.colors.dark,
          fontSize: theme.typography.small,
          fontWeight: 500,
        }}
      >
        {label}
      </span>
    </div>
  );
};
