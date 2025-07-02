/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js}", "./dist/js/**/*.js"],
  safelist: [
    "active",
    "navbar-nav",
    "shopping-cart",

    // Produk Card
    "product-card",
    "bg-white",
    "rounded-lg",
    "shadow",
    "p-4",
    "cursor-pointer",
    "h-48",
    "w-full",
    "object-cover",
    "mb-4",
    "text-lg",
    "font-bold",
    "text-pink-700",
    "text-gray-700",
    "mt-2",
    "bg-pink-600",
    "text-white",
    "py-2",
    "hover:bg-pink-700",

    // Grid Layout
    "grid-cols-1",
    "md:grid-cols-3",

    // Modal dan Keranjang
    "fixed",
    "inset-0",
    "z-50",
    "hidden",
    "items-center",
    "justify-center",
    "bg-black",
    "bg-opacity-50",
    "translate-x-full",
    "overflow-y-auto",
    "w-80",
    "max-w-md",
    "rounded",
    "relative",
    "top-0",
    "right-0",
    "text-xl",
    "text-red-500",
    "hover:text-red-700",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  
};

