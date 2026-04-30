import { useState } from "react";
import { BsBookmarkHeart } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useLogout } from "../features/authentication/useLogout";

function Header({ setQuery }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const { logout, isPending } = useLogout();

  const [searchWidth, setSearchWidth] = useState("w-[220px] sm:w-[260px]");
  const [isArabic, setIsArabic] = useState(false);

  return (
    <header className="container mx-auto p-4 sm:flex-nowrap flex-wrap flex gap-y-3 justify-between items-center">
      <div>
        <h2
          onClick={() => navigate("/")}
          className="text-2xl md:text-3xl font-bold text-(--color-primary) cursor-pointer m-0"
        >
          READHUB
        </h2>
      </div>
      <div className="relative order-last sm:order-0 mx-auto sm:mx-0">
        <input
          type="search"
          className={`rounded-3xl px-4 py-2 ${searchWidth} bg-(--color-text-muted) outline-0 transition-all duration-300`}
          placeholder="Search Books"
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);

            const arabicRegex = /[\u0600-\u06FF]/;
            setIsArabic(arabicRegex.test(value));
          }}
          onFocus={() => setSearchWidth("w-[260px] sm:w-[300px] md:w-[340px]")}
          onBlur={() => setSearchWidth("w-[220px] sm:w-[260px] md:w-[300px]")}
        />
        <IoMdSearch
          className={`absolute top-1/2 -translate-y-1/2 text-gray-500 text-2xl ${
            isArabic ? "left-2" : "right-2"
          }`}
        />
      </div>
      <div className="flex gap-3 md:gap-3.5 items-center">
        <div className="rounded-full bg-(--color-text-muted) p-2.5 md:p-3 text-xl cursor-pointer shadow-sm">
          <BsBookmarkHeart />
        </div>
        <div className="rounded-full bg-(--color-text-muted) p-2.5 md:p-3 text-xl cursor-pointer shadow-sm">
          <HiOutlineShoppingBag />
        </div>
        {!isAuthenticated ? (
          <button
            type="button"
            className="rounded-md shadow-md shadow-[#1e293b]/30 border border-(--color-border) py-1.5 px-2.5 cursor-pointer transition-all duration-300 hover:bg-(--color-primary) hover:text-white hover:border-(--color-text)"
          >
            Sign in
          </button>
        ) : (
          <button
            type="button"
            className="rounded-md shadow-md shadow-[#1e293b]/30 border border-(--color-border) py-1.5 px-2.5 cursor-pointer transition-all duration-300 hover:bg-(--color-primary) hover:text-white hover:border-(--color-text)"
            onClick={logout}
            disabled={isPending}
          >
            Sign out
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
