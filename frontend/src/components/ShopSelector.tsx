"use client";

import React from "react";

export type Shop = {
  id: string;
  userId: string;
  name: string;
  shopImg: string;
  email: string;
};

type Props = {
  shops: Shop[];
};

export default function ShopSelector({ shops }: Props) {
  function handleSelect(shop: Shop) {
    document.cookie = `storeName=${shop.name}; path=/`;
    document.cookie = `storeImg=${shop.shopImg}; path=/`;
    window.location.reload(); // reload to render dashboard
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-4">
      <h2 className="text-xl font-semibold mb-4">Select a Shop to Continue</h2>
      <div className="flex flex-col gap-2 w-full max-w-md">
        {shops.map((shop) => (
          <button
            key={shop.id}
            onClick={() => handleSelect(shop)}
            className="p-3 bg-primary text-white rounded-md hover:bg-primary/80"
          >
            <div className="flex items-center gap-2">
              <img src={shop.shopImg} alt={shop.name} className="w-8 h-8 rounded" />
              <span>{shop.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
