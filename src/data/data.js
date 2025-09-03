export const menuLinks = [
  {
    id: 1,
    name: "Home",
    url: "/",
  },
  {
    id: 2,
    name: "About Us",
    url: "/about",
  },
  {
    id: 3,
    name: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    name: "My Account",
    url: "/account",
  },
  {
    id: 5,
    name: "Contact Us",
    url: "/contact",
  },
];

export const topMenuLinks = [
  {
    id: 1,
    name: "My Wishlist",
    url: "/wishlist",
  },
  {
    id: 2,
    name: "Sign In",
    url: "/signin",
  },
  {
    id: 3,
    name: "Sign Up",
    url: "/signup",
  },
];

export const footerSections = [
  {
    title: "Information",
    links: [
      { label: "Specials", url: "/specials" },
      { label: "Wishlist", url: "/wishlist" },
      { label: "Compare", url: "/compare" },
      { label: "Our Stores", url: "/stores" },
      { label: "About Us", url: "/about" },
      { label: "Contact Us", url: "/contact" },
    ],
  },
  {
    title: "Categories",
    links: [
      { label: "Bread & Bakery", url: "/categories/bread-bakery" },
      { label: "Grocery & Frozen", url: "/categories/grocery-frozen" },
      { label: "Fresh Fruits", url: "/categories/fresh-fruits" },
      { label: "Organic", url: "/categories/organic" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "My Account", url: "/account" },
      { label: "Order History", url: "/account/orders" },
      { label: "Wishlist", url: "/wishlist" },
      { label: "Specials", url: "/specials" },
      { label: "Newsletter", url: "/newsletter" },
      { label: "About Us", url: "/about" },
    ],
  },
  {
    title: "Address",
    address: ["H‑15 Royal Enclave", "Gram Hodpur, Ward 60", "Gwalior 474002"],
  },
];

export const HottestData = [
    {
      id: 1,
      name: "Fruits",
      imageUrl: "/images/Home/Hottest/h3-shop-category1.png",
    },
    {
      id: 2,
      name: "Vegetables",
      imageUrl: "/images/Home/Hottest/h3-shop-category2.png",
    },
    {
      id: 3,
      name: "Fresh Nuts",
      imageUrl: "/images/Home/Hottest/h3-shop-category3.png",
    },
    {
      id: 4,
      name: "Cleaning",
      imageUrl: "/images/Home/Hottest/h3-shop-category4.png",
    },
    {
      id: 5,
      name: "Spice",
      imageUrl: "/images/Home/Hottest/h3-shop-category5.png",
    },
    {
      id: 6,
      name: "Juice & Drinks",
      imageUrl: "/images/Home/Hottest/h3-shop-category6.png",
    },
  ];

import EastIcon from "@mui/icons-material/East"; 
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

export const TrendingProd = [
  {
    id: 1,
    name: "Fresh Orange",
    imageUrl: "/images/Home/Trending/h3-product2-1-425x284.png", // Replace with actual asset path
    priceRange: { min: 30, max: 40 },
    price: null, // Use price or priceRange
    originalPrice: null,
    currentPrice: null,
    rating: 5,
    actions: [
      {
        name: "cart",
        icons: <ShoppingCartCheckoutIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 2,
    name: "Red Apple Envy",
    imageUrl: "/images/Home/Trending/h3-product5-425x284.png",
    price: 18.0,
    originalPrice: 24.0,
    currentPrice: 18.0,
    priceRange: null,
    rating: 5,
    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 3,
    name: "Green Broccoli",
    imageUrl: "/images/Home/Trending/h3-product11-425x284.png",
    price: 4.0,
    originalPrice: null,
    currentPrice: 4.0,
    priceRange: null,
    rating: 5,
    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 4,
    name: "Organic Lemon",
    imageUrl: "/images/Home/Trending/h3-product12-425x284.png",
    price: 12.0,
    originalPrice: null,
    currentPrice: 12.0,
    priceRange: null,
    rating: 5,
    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 5,
    name: "Organic Carrot",
    imageUrl: "/images/Home/Trending/h3-product10-425x284.png",
    originalPrice: 84, // ₹84 MRP
    currentPrice: 66, // ₹66 sale price :contentReference[oaicite:0]{index=0}

    rating: 4.3,
    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 6,
    name: "Organic Cabbage",
    imageUrl: "/images/Home/Trending/h3-product9-425x284.png",
    originalPrice: 90, // ₹90 MRP
    currentPrice: 67, // ₹67 sale price :contentReference[oaicite:1]{index=1}

    rating: 4.5,
    actions: [
      {
        name: "cart",
        icons: <ShoppingCartCheckoutIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 7,
    name: "Organic Potato",
    imageUrl: "/images/Home/Trending/h3-product8-425x284.png",
    priceRange: { min: 30, max: 40 }, // ₹30–40 per kg from exporters info :contentReference[oaicite:2]{index=2}

    rating: 4.5,
    actions: [
      {
        name: "cart",
        icons: <ShoppingCartCheckoutIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 8,
    name: "Organic Peas",
    imageUrl: "/images/Home/Trending/h3-product8-425x284.png",
    originalPrice: 90, // ₹90 MRP
    currentPrice: 67, // ₹67 sale price :contentReference[oaicite:1]{index=1}

    rating: 4.5,
    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
];
export const WeeklyProd = [
  {
    id: 1,
    name: "Fresh Orange",
    imageUrl: "/images/Home/Trending/h3-product2-1-425x284.png", // Replace with actual asset path
    priceRange: { min: 30, max: 40 },
    price: null, // Use price or priceRange
    originalPrice: null,
    currentPrice: null,

    actions: [
      {
        name: "cart",
        icons: <ShoppingCartCheckoutIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 2,
    name: "Red Apple Envy",
    imageUrl: "/images/Home/Trending/h3-product5-425x284.png",
    price: 18.0,
    originalPrice: 24.0,
    currentPrice: 18.0,
    priceRange: null,

    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 3,
    name: "Green Broccoli",
    imageUrl: "/images/Home/Trending/h3-product11-425x284.png",
    price: 4.0,
    originalPrice: null,
    currentPrice: 4.0,
    priceRange: null,

    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 4,
    name: "Organic Lemon",
    imageUrl: "/images/Home/Trending/h3-product12-425x284.png",
    price: 12.0,
    originalPrice: null,
    currentPrice: 12.0,
    priceRange: null,

    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 5,
    name: "Organic Carrot",
    imageUrl: "/images/Home/Trending/h3-product10-425x284.png",
    originalPrice: 84, // ₹84 MRP
    currentPrice: 66, // ₹66 sale price :contentReference[oaicite:0]{index=0}

    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 6,
    name: "Organic Cabbage",
    imageUrl: "/images/Home/Trending/h3-product9-425x284.png",
    originalPrice: 90, // ₹90 MRP
    currentPrice: 67, // ₹67 sale price :contentReference[oaicite:1]{index=1}

    actions: [
      {
        name: "cart",
        icons: <ShoppingCartCheckoutIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 7,
    name: "Organic Potato",
    imageUrl: "/images/Home/Trending/h3-product8-425x284.png",
    priceRange: { min: 30, max: 40 }, // ₹30–40 per kg from exporters info :contentReference[oaicite:2]{index=2}

    actions: [
      {
        name: "cart",
        icons: <ShoppingCartCheckoutIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
  {
    id: 8,
    name: "Organic Peas",
    imageUrl: "/images/Home/Trending/h3-product8-425x284.png",
    originalPrice: 90, // ₹90 MRP
    currentPrice: 67, // ₹67 sale price :contentReference[oaicite:1]{index=1}

    actions: [
      {
        name: "view",
        icons: <EastIcon />,
        url: "/",
      },
      // {
      //   name: "compare",
      //   icons: <CompareArrowsIcon />,
      //   url: "/",
      // },
      {
        name: "wishlist",
        icons: <FavoriteBorderIcon />,
        url: "/",
      },
      {
        name: "quickView",
        icons: <VisibilityIcon />,
        url: "/",
      },
    ],
  },
];
