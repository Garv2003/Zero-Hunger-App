import { MoonLoader } from "react-spinners";
function Loader({ type = 1 }) {
  if (type !== 1) {
    return (
      <div className="absolute left-0 right-0 top-0 z-[10001] flex h-full items-center justify-center border bg-[#ffffff81] backdrop-blur-sm">
        <MoonLoader color="#ff0000" />
      </div>
    );
  }
  return (
    <div className="fixed left-0 top-0 z-[10000] flex h-screen w-screen items-center justify-center border-4 bg-[#ffffff95] backdrop-blur-md">
      <MoonLoader color="#ff0000" />
    </div>
  );
}

export default Loader;
