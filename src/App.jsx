import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import Login from "./features/authentication/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ui/ProtectedRoute";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Signup from "./features/authentication/Signup";
import Verify from "./features/authentication/Verify";
import PublicRoute from "./ui/PublicRoute";
import CheckEmail from "./features/authentication/CheckEmail";
import CheckEmailRoute from "./ui/CheckEmailRoute";
import Books from "./pages/Books";
import { useEffect, useState } from "react";
import WishList from "./pages/WishList";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const [query, setQuery] = useState("book");
  const [wishList, setWishList] = useState(() => {
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishList));
  }, [wishList]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout setQuery={setQuery} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route
              path="/books"
              element={
                <Books
                  query={query}
                  wishList={wishList}
                  addToWishlist={(book) =>
                    setWishList((prev) => {
                      if (prev.some((item) => item.title === book.title))
                        return prev;
                      return [...prev, book];
                    })
                  }
                />
              }
            />
            <Route
              path="/wish-list"
              element={
                <WishList
                  wishList={wishList}
                  removeFromWishlist={(id) =>
                    setWishList((prev) => prev.filter((book) => book.id !== id))
                  }
                />
              }
            />
          </Route>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />
          <Route path="/verify" element={<Verify />} />
          <Route
            path="/check-email"
            element={
              <CheckEmailRoute>
                <CheckEmail />
              </CheckEmailRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-text-muted)",
            color: "var(--color-text)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
