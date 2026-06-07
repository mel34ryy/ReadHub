import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function AppLayout({ setQuery }) {
  return (
    <div className="min-h-screen flex flex-col bg-(--color-bg)">
      <Header setQuery={setQuery} />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
