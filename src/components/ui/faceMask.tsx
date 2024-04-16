export default function FaceMaskComponent() {
  return (
    <div className="absolute h-full w-full overflow-hidden rounded-lg">
      <div
        className="absolute  bottom-1/2 left-1/2 top-1/2 top-1/2 z-10 h-4/6 max-h-64 w-2/4 max-w-40 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 border-dashed border-secondary md:w-1/4"
        style={{
          boxShadow: `0 0 0 9999999px #0000004a`,
        }}
      ></div>
    </div>
  );
}
