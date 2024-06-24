export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  return <div className="max-w-full overflow-x-scroll bg-gray-50 p-2 grid grid-flow-col gap-2">
    {children}
  </div>
}

function HorizontalScrollItemExample({ children }: { children: React.ReactNode }) {
  return <div className="w-32 h-32 flex justify-center items-center bg-blue-100">{children}</div>;
}

export function HorizontalScrollExample() {
  const numList = new Array(10).fill(0).map((_, index) => index + 1);

  return <HorizontalScroll>
    {numList.map((num) => <HorizontalScrollItemExample key={num}>{num}</HorizontalScrollItemExample>)}
  </HorizontalScroll>
}
