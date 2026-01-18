// import { useEffect, useRef } from "react";
// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";

// interface Props {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function ReactQuill({ value, onChange }: Props) {
//   const { quill, quillRef } = useQuill();
//   const isLoaded = useRef(false); // Prevent reset loop

//   useEffect(() => {
//     if (!quill) return;

//     // Load initial content only once
//     if (!isLoaded.current && value) {
//       quill.setContents(quill.clipboard.convert(value));
//       isLoaded.current = true;
//     }

//     quill.on("text-change", () => {
//       onChange(quill.root.innerHTML);
//     });
//   }, [quill]);

//   return <div ref={quillRef} style={{ minHeight: 100 }} />;
// }



// // src/components/ReactQuill.tsx
// import { useEffect, useRef } from "react";
// import { useQuill } from "react-quilljs";
// import "quill/dist/quill.snow.css";

// interface Props {
//   value: string;
//   onChange: (value: string) => void;
// }

// export default function ReactQuill({ value, onChange }: Props) {
//   const { quill, quillRef } = useQuill();
//   const isLoaded = useRef(false);

//   useEffect(() => {
//     if (!quill) return;

//     if (!isLoaded.current && value) {
//       quill.setContents(quill.clipboard.convert(value));
//       isLoaded.current = true;
//     }

//     quill.on("text-change", () => {
//       onChange(quill.root.innerHTML);
//     });
//   }, [quill]);

//   return (
//     <div
//       ref={quillRef}
//       style={{ minHeight: 150 }}
//       className="border rounded p-1"
//     />
//   );
// }


// src/components/ReactQuill.tsx
import { useEffect, useRef } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function ReactQuill({ value, onChange }: Props) {
  const { quill, quillRef } = useQuill();
  const isLoaded = useRef(false);

  useEffect(() => {
    if (!quill) return;

    // Set initial content only once
    if (!isLoaded.current && value) {
      quill.clipboard.dangerouslyPasteHTML(value);
      isLoaded.current = true;
    }

    quill.on("text-change", () => {
      onChange(quill.root.innerHTML);
    });
  }, [quill, value, onChange]);

  return (
    <div className="quill-wrapper flex flex-col min-h-0">
      <div ref={quillRef} className="quill-inner flex-1 min-h-0" />
    </div>
  );
}
