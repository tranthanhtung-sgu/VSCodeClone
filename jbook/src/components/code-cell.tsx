import { useEffect } from "react";
import { useState } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";

const CodeCell = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resizable direction={"vertical"}>
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction={"horizontal"}>
          <CodeEditor initialValue="const a = 1;" onChange={(value) => setInput(value)} />
        </Resizable>
        <Preview code={code} errorMessage={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
