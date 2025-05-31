import { nodeConfigs } from "../configs/nodeConfigs";
import { GenericNode } from "./genericNode";

// Dynamically map every nodeConfig key to GenericNode
export const nodeTypes = Object.keys(nodeConfigs).reduce((acc, type) => {
  acc[type] = GenericNode;
  return acc;
}, {});
