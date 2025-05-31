// // submit.js

// export const SubmitButton = () => {

//     return (
//         <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//             <button type="submit">Submit</button>
//         </div>
//     );
// }

// // src/submit.js
// import { theme } from "./theme";

// export const SubmitButton = () => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         marginTop: theme.spacing.lg,
//       }}
//     >
//       <button
//         type="submit"
//         style={{
//           backgroundColor: theme.colors.primary,
//           color: "white",
//           border: "none",
//           padding: `${theme.spacing.md} ${theme.spacing.xl}`,
//           borderRadius: theme.borderRadius.md,
//           fontSize: theme.typography.body,
//           fontWeight: 600,
//           cursor: "pointer",
//           transition: "all 0.2s ease",
//           ":hover": {
//             backgroundColor: "#4F46E5",
//             transform: "translateY(-2px)",
//           },
//         }}
//       >
//         Submit
//       </button>
//     </div>
//   );
// };

// src/submit.js
import { theme } from "./theme";
import { usePipelineSubmit } from "./hooks/usePipelineSubmit";

export const SubmitButton = () => {
  const { submitPipeline } = usePipelineSubmit();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: theme.spacing.lg,
      }}
    >
      <button
        onClick={submitPipeline}
        style={{
          backgroundColor: theme.colors.primary,
          color: "white",
          border: "none",
          padding: `${theme.spacing.md} ${theme.spacing.xl}`,
          borderRadius: theme.borderRadius.md,
          fontSize: theme.typography.body,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </div>
  );
};
