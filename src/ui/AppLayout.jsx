import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function AppLayout({ setQuery }) {
  return (
    <div className="bg-(--color-bg)">
      <Header setQuery={setQuery} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
