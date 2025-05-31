// src/components/AutoGrowingTextArea.jsx
import { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import { theme } from "../theme";

// Utility to extract all {{var}} patterns
export const extractVariables = (text = "") => {
  const matches = text.match(/{{(.*?)}}/g);
  return matches?.map((m) => m.replace(/{{|}}/g, "").trim()) || [];
};

export const AutoGrowingTextArea = ({ value, onChange, nodeId }) => {
  const textareaRef = useRef(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputAtCursor, setInputAtCursor] = useState("");
  const customInputs = useStore((s) => s.getCustomInputs());

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  const handleInput = (e) => {
    const newValue = e.target.value;
    onChange(newValue);

    const cursorIndex = e.target.selectionStart;
    const prefix = newValue.slice(0, cursorIndex);
    const match = prefix.match(/{{(\w*)$/);

    if (match) {
      const query = match[1];
      setInputAtCursor(query);
      const filtered = customInputs.filter((input) =>
        input.name.toLowerCase().startsWith(query.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const insertSuggestion = (name) => {
    const cursor = textareaRef.current.selectionStart;
    const before = value.slice(0, cursor).replace(/{{\w*$/, `{{${name}}}`);
    const after = value.slice(cursor);
    onChange(before + after);
    setShowSuggestions(false);

    const allInputs = useStore.getState().getCustomInputs();
    const matchingInput = allInputs.find((input) => input.name === name);

    if (matchingInput) {
      const sourceNodeId = matchingInput.id;
      const currentNodeId = nodeId;

      const edgeExists = useStore
        .getState()
        .edges.find(
          (e) =>
            e.source === sourceNodeId &&
            e.target === currentNodeId &&
            e.targetHandle === name
        );

      // 👇 Call BEFORE onConnect — makes the handle "real"
      useStore.getState().addDynamicHandle(currentNodeId, name);

      if (!edgeExists) {
        // Call it after the next render tick
        setTimeout(() => {
          useStore.getState().onConnect({
            source: sourceNodeId,
            target: currentNodeId,
            targetHandle: name,
          });
        }, 0);
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInput}
        placeholder="Type with {{input}}..."
        style={{
          width: "100%",
          minHeight: "60px",
          //   padding: theme.spacing.sm,
          boxSizing: "border-box",
          backgroundColor: theme.colors.light,
          border: `1px solid ${theme.colors.slate}`,
          borderRadius: theme.borderRadius.sm,
          color: theme.colors.dark,
          resize: "none",
        }}
      />

      <div
        style={{
          marginTop: "8px",
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
        }}
      >
        {extractVariables(value).map((v) => (
          <div
            key={v}
            style={{
              backgroundColor: theme.colors.primaryLight,
              color: theme.colors.primaryDark,
              padding: "4px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 500,
            }}
          >
            {v}
          </div>
        ))}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            background: "#fff",
            color: "#000",
            listStyle: "none",
            margin: 0,
            padding: "4px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            zIndex: 10,
            width: "100%",
          }}
        >
          {suggestions.map((s) => (
            <li
              key={s.id}
              onClick={() => insertSuggestion(s.name)}
              style={{
                padding: "4px",
                cursor: "pointer",
              }}
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
