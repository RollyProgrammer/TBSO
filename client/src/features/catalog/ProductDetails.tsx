import { useNavigate, useParams } from "react-router-dom";
import { useFetchProductDetailsQuery } from "./catalogApi";
import { currencyFormat } from "../../lib/util";
import { useAddbasketItemMutation, useBuyNowMutation } from "../basket/basketApi";
import { useState } from "react";
import RelatedProducts from "../../components/RelatedProducts";
import { AddShoppingCart, Share, ShoppingCartCheckout, StarBorder } from "@mui/icons-material";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useFetchProductDetailsQuery(id ? +id : 0);

  // ✅ local state for quantity
  const [quantity, setQuantity] = useState<number>(1);

  // ✅ mutation hook
  const [addBasketItem, { isLoading: adding }] = useAddbasketItemMutation();
  const [buyNow, { isLoading: buying }] = useBuyNowMutation();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<number[]>([]);
  const sizes = ["S", "M", "L", "XL"];

  if (!product || isLoading) return <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">Loading Product Details...</div>;

  // ✅ handler for add to basket
  const handleAddToBasket = () => {
    if (quantity > 0) {
      addBasketItem({ product, quantity });
    }
  };

  const handleSizeSelect = (size: string) => setSelectedSize(size);

  const toggleSection = (index: number) => {
    setOpenSections((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  if (!product || isLoading) return <div className="flex justify-center items-center min-h-[60vh] text-gray-600 text-sm sm:text-base">Loading Product...</div>;

  const sections = [
    {
      title: "Shipping & Return",
      content: "Shipping takes 3–5 business days. Returns accepted within 30 days.",
    },
    {
      title: "Other Detail (Ingredients)",
      content: "Contains organic ingredients: aloe vera, vitamin E, and tea tree oil.",
    },
  ];

  return (
    <section className="py-15 sm:py-6 px-4 w-full mx-auto">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10 justify-center">
          {/* Left: Product Images */}
          <div className="flex-1">
            <div className="w-full">
              <img src={product.pictureUrl} alt={product.name} className="w-full h-auto shadow-md object-cover" />
            </div>

            <div className="mt-4 flex gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1/4">
                  <img src={product.pictureUrl} alt={`${product.name}-${i}`} className="w-full h-auto shadow-md object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="flex-1 space-y-6">
            {/* Title and Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h1 className={`font-bold ${product.name.length > 23 ? "text-2xl" : "text-3xl"}`}>{product.name}</h1>

              <div className="flex items-center gap-4 text-gray-600">
                <button onClick={() => console.log("Add to favorites")} className="flex items-center gap-1 hover:text-black transition cursor-pointer" title="Add to Favorites">
                  <StarBorder />
                  <span className="text-sm">Favorite</span>
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Product link copied to clipboard!");
                  }}
                  className="flex items-center gap-1 hover:text-black transition cursor-pointer"
                  title="Share Product"
                >
                  <Share />
                  <span className="text-sm">Share</span>
                </button>
              </div>
            </div>

            {/* Price */}
            <p className="text-xl font-semibold text-gray-700">{currencyFormat(product.price)}</p>

            {/* Description */}
            <p className="text-gray-600">{product.description}</p>
            <p className="text-sm text-gray-500">By: Seller Name</p>

            {/* Size Selection */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Select Size</p>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    className={`px-4 py-2 border text-sm transition ${selectedSize === size ? "bg-black text-white border-black" : "bg-white text-gray-800 border-gray-300 hover:border-black"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity in Basket</label>
              <div className="w-1/2 sm:w-1/4 flex items-center border overflow-hidden">
                <input type="number" className="w-full text-center outline-none py-1.5" value={quantity} min={1} onChange={(e) => setQuantity(Number(e.target.value))} />
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="w-full bg-black text-white py-3 text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2 mb-2" disabled={adding} onClick={handleAddToBasket}>
              <AddShoppingCart />
              {adding ? "ADDING..." : "ADD TO BASKET"}
            </button>

            {/* Buy Now Button */}
            <button
              className="w-full bg-black text-white py-3 text-sm hover:bg-gray-800 transition flex items-center justify-center gap-2 mb-5"
              disabled={buying}
              onClick={async () => {
                try {
                  await buyNow({ product, quantity }).unwrap(); // wait for API call
                  navigate("/cart"); // ✅ go to cart
                } catch (error) {
                  console.error("Buy Now failed:", error);
                }
              }}
            >
              <ShoppingCartCheckout />
              {buying ? "PROCESSING..." : `BUY NOW - ${currencyFormat(product.price)}`}
            </button>

            {/* Expandable Sections */}
            <div className="border border-l-0 border-r-0 divide-y">
              {sections.map((section, index) => {
                const isOpen = openSections.includes(index);

                return (
                  <div key={index}>
                    <button onClick={() => toggleSection(index)} className={`w-full text-left text-lg font-semibold px-4 py-3 transition ${isOpen ? "bg-gray-50" : "hover:bg-gray-50"}`}>
                      {section.title}
                    </button>

                    {isOpen && <div className="px-4 py-3 text-gray-700 text-sm bg-white">{section.content}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div>
          {/* Description */}
          <div className="mt-20">
            <div className="border">
              <h1 className="font-semibold text-2xl px-6 py-6 ">Description</h1>
              <p className="flex flex-col gap-4 px-6 text-sm text-gray-500">
                An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet, It serves as vitual marketplace where businesses and
                individials can showcase their products, imteract with customers, and conduct transactions, and conduct transactions without the need ofr a physical presence. E-commerce websites have
                gained immense popularity due to their convenience, accesibility, and the goal reach they offer.
              </p>
              <p className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500">
                E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually
                has its own dedicated page with relevant information
              </p>
            </div>
          </div>

          {/* Review Section */}
          <div className="mt-5">
            <div className="border">
              <h1 className="font-semibold text-2xl px-6 py-6 text-center">Customer Reviews</h1>

              <div className="px-6 py-4 space-y-6 text-sm text-gray-700">
                {/* Review 1 */}
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">Jane Doe</span>
                    <span className="text-xs text-gray-400">June 15, 2025</span>
                  </div>
                  <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
                  <p>This product exceeded my expectations. Quality is top-notch and delivery was super quick. I’ll definitely buy again!</p>
                </div>

                {/* Review 2 */}
                <div className="border-b pb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">Mark Smith</span>
                    <span className="text-xs text-gray-400">June 12, 2025</span>
                  </div>
                  <div className="text-yellow-500 mb-2">⭐⭐⭐⭐</div>
                  <p>Overall very good. The material feels premium. One star off because of minor packaging issue, but not a big deal.</p>
                </div>

                {/* Review 3 */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold">Ella Cruz</span>
                    <span className="text-xs text-gray-400">June 9, 2025</span>
                  </div>
                  <div className="text-yellow-500 mb-2">⭐⭐⭐⭐⭐</div>
                  <p>Love it! Very stylish and comfortable. Got a lot of compliments. Will recommend to friends.</p>
                </div>
              </div>
            </div>
          </div>

          {/* display related products */}
          <div className="mt-5 w-full">
            <div>
              <h1 className="font-semibold text-2xl px-6 py-6 ">You may also like</h1>
            </div>
            <div className="w-full">
              <RelatedProducts />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
