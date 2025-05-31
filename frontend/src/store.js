// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from "reactflow";

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: "smoothstep",
          animated: true,
          markerEnd: { type: MarkerType.Arrow, height: "20px", width: "20px" },
        },
        get().edges
      ),
    });
  },
  removeNode: (nodeId) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== nodeId),
      edges: get().edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      ),
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, [fieldName]: fieldValue };
        }

        return node;
      }),
    });
  },
  addDynamicHandle: (nodeId, handleId) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          const existing = node.data.dynamicInputHandles || [];
          if (!existing.includes(handleId)) {
            return {
              ...node,
              data: {
                ...node.data,
                dynamicInputHandles: [...existing, handleId],
              },
            };
          }
        }
        return node;
      }),
    });
  },

  result: null,
  setResult: (res) => set({ result: res }),
  closeResult: () => set({ result: null }),

  resetWorkflow: () => {
    set({
      nodes: [],
      edges: [],
      result: null,
    });
  },

  getCustomInputs: () => {
    return get()
      .nodes.filter((node) => node.type === "customInput")
      .map((node) => ({
        id: node.id,
        name: node.data?.inputName || node.id.replace("customInput-", "input_"),
      }));
  },
}));

export const updateNode = (nodeId, updates) => {
  const { updateNodeField } = useStore.getState();
  Object.entries(updates).forEach(([key, value]) => {
    updateNodeField(nodeId, key, value);
  });
};
