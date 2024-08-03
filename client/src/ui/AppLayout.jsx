import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useState } from "react";

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false);

  function handleSidebar() {
    setShowSidebar((p) => !p);
  }

  function closeSidebar() {
    setShowSidebar(false);
  }

  return (
    <section className="grid min-h-screen w-screen grid-rows-[auto_1fr] bg-stone-100 lg:grid-cols-[15rem_1fr]">
      <Sidebar
        showSidebar={showSidebar}
        handleSidebar={handleSidebar}
        closeSidebar={closeSidebar}
      />
      <Navbar showSidebar={showSidebar} handleSidebar={handleSidebar} />
      <div className="h-full w-full bg-white px-4 py-10 sm:p-10">
        <main className="mx-auto flex h-full w-full max-w-[800px] flex-col items-center">
          <Outlet />
        </main>
      </div>
    </section>
  );
}

export default AppLayout;
