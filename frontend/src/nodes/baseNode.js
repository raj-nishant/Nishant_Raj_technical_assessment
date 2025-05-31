import { Handle, Position } from "reactflow";
import { theme } from "../theme";
import { useStore } from "../store";
import { FieldRenderer } from "../renderers/FieldRenderer";
import { FiX } from "react-icons/fi";

const iconButton = {
  backgroundColor: theme.colors.danger,
  border: "none",
  borderRadius: "50%",
  width: "17px",
  height: "17px",
  color: "#fff",
  fontSize: "12px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
};

export const BaseNode = ({
  id,
  title,
  subTitle,
  Icon,
  inputHandles = [],
  outputHandles = [],
  selected,
  data,
  fields = [],
}) => {
  const updateNodeField = useStore((s) => s.updateNodeField);
  const removeNode = useStore((s) => s.removeNode);

  const handleChange = (field, value) => {
    updateNodeField(id, field, value);
  };

  return (
    <div
      style={{
        border: selected
          ? `2px solid ${theme.colors.primary}`
          : `1px solid ${theme.colors.slate}`,
        backgroundColor: theme.colors.light,
        borderRadius: theme.borderRadius.md,
        minWidth: "240px",
        color: theme.colors.dark,
        boxShadow: "0 4px 6px rgba(0,0,0,0.15)",
        overflow: "visible",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: theme.colors.primaryLight,
          padding: theme.spacing.md,
          borderBottom: `1px solid ${theme.colors.slate}`,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          borderTopLeftRadius: theme.borderRadius.md,
          borderTopRightRadius: theme.borderRadius.md,
        }}
      >
        {/* Left side: icon and title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Icon size={18} color={theme.colors.primary} />
            <span
              style={{
                fontWeight: 600,
                fontSize: theme.typography.header,
                color: theme.colors.dark,
              }}
            >
              {title}
            </span>
          </div>
          {subTitle && (
            <span
              style={{
                fontSize: theme.typography.small,
                color: theme.colors.gray,
                marginTop: "4px",
              }}
            >
              {subTitle}
            </span>
          )}
        </div>

        <button
          onClick={() => removeNode(id)}
          style={iconButton}
          title="Delete"
        >
          <FiX size={12} />
        </button>
      </div>

      {/* Body */}
      <div style={{ padding: theme.spacing.md }}>
        {fields.map((field) => (
          <div key={field.name} style={{ marginBottom: theme.spacing.sm }}>
            <FieldRenderer
              field={{ ...field, nodeId: id }}
              value={data?.[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}

        {inputHandles.map((h, i) => (
          <Handle
            key={h.id || i}
            type="target"
            position={Position[h.position?.toUpperCase() || "LEFT"]}
            id={h.id}
            style={{
              backgroundColor: theme.colors.success,
              border: `2px solid white`,
              width: "14px",
              height: "14px",
              ...(h.style || {}),
            }}
          />
        ))}

        {outputHandles.map((h, i) => (
          <Handle
            key={h.id || i}
            type="source"
            position={Position[h.position?.toUpperCase() || "RIGHT"]}
            id={h.id}
            style={{
              backgroundColor: theme.colors.secondary,
              border: `2px solid white`,
              width: "14px",
              height: "14px",
              ...(h.style || {}),
            }}
          />
        ))}
      </div>
    </div>
  );
};
