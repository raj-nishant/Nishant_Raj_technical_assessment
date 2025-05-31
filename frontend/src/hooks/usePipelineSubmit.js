// src/hooks/usePipelineSubmit.js
import { useStore } from "../store";
import { toast } from "react-hot-toast";

export const usePipelineSubmit = () => {
  const { nodes, edges, setResult } = useStore((s) => ({
    nodes: s.nodes,
    edges: s.edges,
    setResult: s.setResult,
  }));

  const submitPipeline = async () => {
    if (nodes.length === 0) {
      toast.error("No nodes in the pipeline");
      return;
    }

    const loadingToast = toast.loading("Submitting pipeline...");

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await response.json();

      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error(`❌ ${data.detail || "Pipeline submission failed"}`);
        return;
      }

      setResult({
        num_nodes: data.num_nodes,
        num_edges: data.num_edges,
        is_dag: data.is_dag,
      });

      toast.success(
        <div style={{ lineHeight: "1.6" }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>
            ✅ Pipeline submitted!
          </div>
          <div>
            📦 <strong>Nodes:</strong> {data.num_nodes}
          </div>
          <div>
            🔗 <strong>Edges:</strong> {data.num_edges}
          </div>
          <div>
            🧩 <strong>DAG:</strong> {data.is_dag ? "Yes" : "No"}
          </div>
        </div>,
        { duration: 4000 }
      );
    } catch (err) {
      toast.dismiss(loadingToast);
      toast.error("❌ Failed to connect to backend");
      console.error(err);
    }
  };

  return { submitPipeline };
};
