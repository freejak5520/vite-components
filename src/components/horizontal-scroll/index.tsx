import { useCallback, useMemo } from "react";

function ScrollButton({ children, onClick, position }: { children: React.ReactNode, onClick: () => void, position: "left" | "right" }) {
  return <div
    className={"cursor-pointer select-none w-6 h-6 flex justify-center items-center absolute top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-20" + (position === "left" ? " left-4" : " right-4")}
    onClick={onClick}
  >{children}</div>
}

export default function HorizontalScroll({ children, scrollAmount = 100 }: { children: React.ReactNode, scrollAmount?: number }) {
  const scrollIdPrefix = "scroll_";

  const id = useMemo(() => {
    return Math.random().toString(36).substring(2, 15);
  }, []);

  const canTouch = useMemo(() => {
    return navigator.maxTouchPoints > 0;
  }, []);

  const scroll = useCallback((left: number) => {
    const scrollId = `#${scrollIdPrefix}${id}`;
    const scrollLeft = document.querySelector(scrollId)?.scrollLeft;

    if (typeof scrollLeft === "number") {
      document.querySelector(scrollId)?.scrollTo({
        left: scrollLeft - left,
        behavior: "smooth"
      })
    }
  }, [id]);

  return <div id={id} className="relative max-w-full overflow-x-hidden bg-gray-50 p-2 ">
    {!canTouch && (
      <>
        <ScrollButton position="left" onClick={() => { scroll(scrollAmount); }} >
          {"<"}
        </ScrollButton>
        <ScrollButton position="right" onClick={() => { scroll(-scrollAmount); }} >
          {">"}
        </ScrollButton>
      </>
    )}
    <div id={`${scrollIdPrefix}${id}`} className="grid grid-flow-col gap-2 overflow-x-scroll scroll-smooth scrollbar-hidden">
      {children}
    </div>
  </div>
}

function HorizontalScrollItemExample({ children }: { children: React.ReactNode }) {
  return <div className="w-64 h-64 flex justify-center items-center bg-blue-100">{children}</div>;
}

export function HorizontalScrollExample() {
  const numList = new Array(10).fill(0).map((_, index) => index + 1);

  return <HorizontalScroll>
    {numList.map((num) => <HorizontalScrollItemExample key={num}>{num}</HorizontalScrollItemExample>)}
  </HorizontalScroll>
}
