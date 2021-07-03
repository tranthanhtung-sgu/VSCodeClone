import { useEffect } from "react";
import { useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import { clearTimeout } from "timers";
import "./resizable.css";

interface Props {
  direction: "horizontal" | "vertical";
  children: any;
}
const Resizable = ({ direction, children }: Props) => {
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth * 0.75);

  useEffect(() => {
    let timer: any;
    const listner = () => {
      // debounce
      if (timer) {
        clearTimeout(timer);
      }
      setTimeout(() => {
        setInnerHeight(window.innerHeight);
        setInnerWidth(window.innerWidth);
        if (window.innerWidth * 0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      }, 500);
      // end of debounce
    };
    window.addEventListener("resize", listner);

    return () => {
      window.removeEventListener("resize", listner);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let resizableProps: ResizableBoxProps;
  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ["e"],
      onResizeStop: (event, data) => {
        setWidth(data.size.width);
      },
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 24],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }
  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
export default Resizable;
