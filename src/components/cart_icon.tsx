'use client'
import React from "react";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import useSWR from 'swr'

interface CartPopOverProps {
  cookies: string;
}

const CartPopOver = ({ cookies }: CartPopOverProps) => {
  const url = 'http://localhost:3000/api/cart';
  const fetcher:any = (url: any) => fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "user_id": `${cookies}`,
    },
  }).then((res) => res.json());

  const { data, error, isValidating } = useSWR(url, fetcher);

  if (error) {
    return <div>Failed to load cart data</div>;
  }

  const cartItemsLength = data ? data.length : 0;

  return (
    <Link href={`/cart?user_id=${cookies}`} id="cart" className="flex items-center text-blue-500">
      <FontAwesomeIcon
        icon={faCartShopping}
        className="w-6"
        style={{ color: "#ee245f" }}
      />
      <span className="mt-[-20px] bg-primary-pink text-white rounded-full px-[8px] py-[2px]">
        {isValidating ? "0" : cartItemsLength}
      </span>
    </Link>
  );
};

export default CartPopOver;
