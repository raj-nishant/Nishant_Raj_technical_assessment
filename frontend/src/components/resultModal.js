import { useStore } from "../store";

export const ResultModal = () => {
  const result = useStore((s) => s.result);
  const closeResult = useStore((s) => s.closeResult);
  const resetWorkflow = useStore((s) => s.resetWorkflow);

  if (!result) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>Pipeline Summary</h2>
        <p>
          <strong>Nodes:</strong> {result.num_nodes}
        </p>
        <p>
          <strong>Edges:</strong> {result.num_edges}
        </p>
        <p>
          <strong>Is DAG:</strong> {result.is_dag ? "Yes ✅" : "No ❌"}
        </p>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <button onClick={closeResult} style={buttonStyle}>
            Close
          </button>
          <button
            onClick={resetWorkflow}
            style={{ ...buttonStyle, background: "#f87171" }}
          >
            Reset Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "white",
  borderRadius: "8px",
  padding: "24px",
  width: "300px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
};

const buttonStyle = {
  padding: "8px 16px",
  border: "none",
  borderRadius: "6px",
  background: "#4F46E5",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};
