import React from 'react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { cookies } from 'next/headers';

const getCartItemsLength = async () => {
  try {
      const user_id = cookies().get("user_id");
console.log(user_id)
      const res = await fetch(`http://localhost:3000/api/cart?user_id=${user_id?.value}`, {
          method: "GET",
          cache:"no-store",
          headers: {
              "Content-Type": "application/json",
              "user_id":`${user_id?.value as string}`

          },          
      }
      );
      if (!res.ok) {
          throw new Error("Failed to fetch the data")
      };
      const result = await res.json()
      return result.length
  } catch (err) {
      console.log(err)
  }
}

const CartPopOver = async () => {

  return (
    <div className="relative">
          <span className=" mt-[-20px] ml-3 bg-primary-pink text-white rounded-full px-[8px] py-[2px]">{await getCartItemsLength()}</span>

      <Link href="/cart">
      <FontAwesomeIcon icon={faCartShopping} className='w-6' style={{"color": "#ee245f"}}/>
      </Link>

    </div>

  );
};

export default CartPopOver;