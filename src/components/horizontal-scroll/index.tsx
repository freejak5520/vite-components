import { useCallback, useEffect, useMemo, useRef } from "react";

function ScrollButton({ children, onClick, position }: { children: React.ReactNode, onClick: () => void, position: "left" | "right" }) {
  return <div
    className={"cursor-pointer select-none w-6 h-6 flex justify-center items-center absolute top-1/2 -translate-y-1/2 rounded-full bg-black bg-opacity-20" + (position === "left" ? " left-4" : " right-4")}
    onClick={onClick}
  >{children}</div>
}

export default function HorizontalScroll({ children, scrollAmount = 300 }: { children: React.ReactNode, scrollAmount?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const canTouch = useMemo(() => {
    return navigator.maxTouchPoints > 0;
  }, []);

  const scroll = useCallback((left: number) => {
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;

    if (typeof scrollLeft === "number") {
      container.scrollTo({
        left: scrollLeft - left,
        behavior: "smooth"
      })
    }
  }, []);

  const adjustScroll = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const totalWidth = content.scrollWidth;
    const oneSetWidth = totalWidth / 3;

    if (container.scrollLeft < oneSetWidth) {
      container.scrollLeft += oneSetWidth;
    } else if (container.scrollLeft >= oneSetWidth * 2) {
      container.scrollLeft -= oneSetWidth;
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', adjustScroll);
    // 초기 스크롤 위치 설정
    container.scrollLeft = container.scrollWidth / 3;

    return () => container.removeEventListener('scroll', adjustScroll);
  }, [adjustScroll]);

  return <div className="relative max-w-full overflow-x-hidden bg-gray-50 p-2 ">
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
    <div ref={containerRef} className="overflow-x-scroll scrollbar-hidden">
      <div ref={contentRef} className="grid grid-flow-col gap-2">
        {children}
        {children}
        {children}
      </div>
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
