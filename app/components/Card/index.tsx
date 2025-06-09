import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { db } from "@/app/utils/firebase";
import { collection as firestoreCollection, addDoc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

interface CardProps {
  imageUrl?: string;
  name: string;
  description?: string;
  pricePhp: number;
  collection: string;
  gemstones: string[];
  pearlShape: string;
  pearlColor: string;
}

export default function Card({
  imageUrl,
  name,
  pricePhp,
  collection,
  gemstones,
  pearlShape,
  pearlColor,
}: CardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      setIsAddingToCart(true);
      const cartItem = {
        userId: user.uid,
        name,
        pricePhp,
        collection,
        gemstones,
        pearlShape,
        pearlColor,
        imageUrl,
        createdAt: serverTimestamp(),
      };

      await addDoc(firestoreCollection(db, "carts"), cartItem);
      toast.success("Added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <motion.div
      className="relative h-[420px] overflow-hidden cursor-pointer shadow-lg"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
       {/* Image Container */}
       <div className="relative w-full h-[300px] w-[450px]">
          <Image
            src={
              imageUrl || ""
            }
            alt={name}
            fill
            className="object-cover"
          />
      </div>

      {/* Content Container */}
      <div className="px-4 py-2">
      <div className="flex items-center justify-between mb-2 w-full">
          <h3 className="text-gray-700 font-semibold mb-1">{name}</h3>
          <span className="font-semibold text-accent">
            ₱{pricePhp.toLocaleString()}
          </span>
        </div>
        
         {/* Details */}
         <div className="flex flex-wrap gap-1 items-start mt-2 w-full pb-4">
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full shadow-sm">
            {collection}
          </span>
          {gemstones.map((gem, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full shadow-sm"
            >
              {gem}
            </span>
          ))}
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full shadow-sm">
            {pearlShape}
          </span>
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full shadow-sm">
            {pearlColor}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          disabled={isAddingToCart}
          className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </button>
      </div>

     

      {/* Hover Overlay */}
      <motion.div
        className="absolute inset-0 bg-black/5 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
