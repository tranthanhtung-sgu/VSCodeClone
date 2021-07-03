import { useEffect, useRef } from "react";
import "./preview.css";

interface Props {
  code: string;
  errorMessage: string;
}
const html = `
    <html>
      <head>
        <style>html {background-color: white;}</style>
      </head>
      <body>
        <div id="root"></div>
        <script>
          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
            console.error(err);
          };

          window.addEventListener('error', (event) => {
            event.preventDefault();
            handleError(event.error);
          });

          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              handleError(err);
            }
          }, false);
        </script>
      </body>
    </html>
  `;
const Preview = ({ code, errorMessage }: Props) => {
  const iframe = useRef<any>();

  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  return (
    <div className="wrapper-preview">
      <iframe ref={iframe} title="preview" sandbox="allow-scripts" srcDoc={html} />
      {errorMessage && (
        <div className="preview-error">
          <div>
            <strong>Runtime Error</strong>
          </div>
          <div>{errorMessage}</div>
        </div>
      )}
    </div>
  );
};
export default Preview;
