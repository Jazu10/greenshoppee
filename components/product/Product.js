import Image from "next/image";
import Link from "next/link";
import Bounce from "react-reveal/Bounce";
import { useContext, useState } from "react";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

function Product({ id, title, price, description, category, images, inStock }) {
   const [state, dispatch] = useContext(DataContext);
   const { cart } = state;
   const product = {
      _id: id,
      title,
      price,
      description,
      category,
      images,
      inStock,
   };

   return (
      <Bounce bottom>
         <div className="relative flex flex-col m-5 bg-white z-30 p-10 shadow-sm rounded-md hover:shadow-xl transform transition-transform duration-500 hover:scale-105">
            <p className="absolute top-2 right-2 text-xs text-gray-400 italic">
               {category}
            </p>
            <Image
               src={images[0].url}
               height={250}
               width={200}
               objectFit="contain"
               className="image"
            />
            <h4 className="my-3 font-bold">{title}</h4>
            <p className="text-xs my-2 line-clamp-2">{description}</p>
            <div className="mb-5 font-bold justify-between inline-flex">
               <div className="text-green-500">₹ {price}</div>
               {inStock > 0 ? (
                  <div className="text-green-500">In Stock : {inStock}</div>
               ) : (
                  <div className="text-red-500">Out of Stock</div>
               )}
            </div>
            <div className="flex justify-between space-x-3">
               <Link href={`/product/${id}`}>
                  <button className=" mt-auto button flex-1 hover:from-green-600">
                     View
                  </button>
               </Link>
               {inStock > 0 ? (
                  <button
                     onClick={() => dispatch(addToCart(product, cart))}
                     className=" mt-auto button1 hover:from-red-600 flex-1">
                     Buy
                  </button>
               ) : (
                  <button
                     disabled
                     className="mt-auto button1 flex-1 cursor-not-allowed opacity-50">
                     Buy
                  </button>
               )}
            </div>
         </div>
      </Bounce>
   );
}

export default Product;
