import "./text-editor.css";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useRef } from "react";
import { useState } from "react";

const TextEditor = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState("# Header");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (event.target && ref.current && ref.current.contains(event.target as Node)) {
        return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  });

  if (editing)
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor
          onChange={(v) => {
            setValue(v || "");
          }}
        />
      </div>
    );

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
