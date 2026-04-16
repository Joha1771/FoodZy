import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../Components/Layout/Layout.jsx";

const Home = lazy(() => import("../Pages/Home.jsx"));
const Shop = lazy(() => import("../Pages/Shop.jsx"));
const ProductDetail = lazy(() => import("../Pages/ProductDetail.jsx"));
const Cart = lazy(() => import("../Pages/Cart.jsx"));
const Checkout = lazy(() => import("../Pages/Checkout.jsx"));
const BlogList = lazy(() => import("../Pages/BlogList.jsx"));
const BlogDetail = lazy(() => import("../Pages/BlogDetail.jsx"));
const FAQ = lazy(() => import("../Pages/FAQ.jsx"));
const Wishlist = lazy(() => import("../Pages/WishlistPage.jsx"));
const NotFound = lazy(() => import("../Pages/NotFound.jsx"));

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="w-8 h-8 border-2 border-[#E44B26] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function wrap(Component) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: wrap(Home) },
      { path: "shop", element: wrap(Shop) },
      { path: "product/:id", element: wrap(ProductDetail) },
      { path: "cart", element: wrap(Cart) },
      { path: "checkout", element: wrap(Checkout) },
      { path: "blog", element: wrap(BlogList) },
      { path: "blog/:id", element: wrap(BlogDetail) },
      { path: "faq", element: wrap(FAQ) },
      { path: "wishlist", element: wrap(Wishlist) },
      { path: "*", element: wrap(NotFound) },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
