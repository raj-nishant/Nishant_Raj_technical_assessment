// src/nodes/renderers/FieldRenderer.jsx
import { AutoGrowingTextArea } from "../components/AutoGrowingTextArea";
import { theme } from "../theme";

export const FieldRenderer = ({ field, value, onChange }) => {
  const { name, label, type, options } = field;

  if (type === "text") {
    return (
      <label>
        {label}:
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(name, e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            minHeight: "36px",
            backgroundColor: theme.colors.light,
            border: `1px solid ${theme.colors.slate}`,
            borderRadius: theme.borderRadius.sm,
            color: theme.colors.dark,
          }}
        />
      </label>
    );
  }

  if (type === "select") {
    return (
      <label>
        {label}:
        <select
          value={value || options[0]}
          onChange={(e) => onChange(name, e.target.value)}
          style={{
            width: "100%",
            padding: theme.spacing.sm,
            backgroundColor: theme.colors.light,
            border: `1px solid ${theme.colors.slate}`,
            borderRadius: theme.borderRadius.sm,
            color: theme.colors.dark,
          }}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (type === "customTextArea") {
    return (
      <AutoGrowingTextArea
        value={value}
        onChange={(v) => onChange(name, v)}
        nodeId={field.nodeId}
      />
    );
  }

  return null;
};
