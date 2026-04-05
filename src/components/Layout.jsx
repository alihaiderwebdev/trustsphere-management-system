import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";

function Layout({ children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMobileSidebarOpen);

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMobileSidebarOpen]);

  const closeMobileSidebar = () => setIsMobileSidebarOpen(false);

  return (
    <div className="bg-light min-vh-100">
      <Navbar
        onToggleSidebar={() => setIsMobileSidebarOpen((prev) => !prev)}
      />

      <div className="container-fluid">
        <div className="row g-0">
          <Sidebar
            isMobileSidebarOpen={isMobileSidebarOpen}
            onCloseMobileSidebar={closeMobileSidebar}
          />

          <main className="col-12 col-md-9 col-lg-10 ms-md-auto">
            <div className="p-2 p-md-3 p-lg-4">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
