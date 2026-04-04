import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <Sidebar />
        <main className="flex-grow-1" style={{ overflowX: "auto" }}>
          <div className="p-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
