import React, { useContext, useState } from "react";
import { SearchIcon, ShoppingCartIcon } from "@heroicons/react/outline";
import { FaPagelines } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";
import { useRouter } from "next/router";
import { DataContext } from "../store/GlobalState";
import Cookie from "js-cookie";

function Header() {
   const router = useRouter();

   const [state, dispatch] = useContext(DataContext);
   const { auth, cart } = state;
   const handleLogout = () => {
      Cookie.remove("refreshToken", { path: "api/auth/accessToken" });
      localStorage.removeItem("firstLogin");
      dispatch({ type: "AUTH", payload: {} });
      dispatch({
         type: "NOTIFY",
         payload: { success: "Successfully logged out!" },
      });
   };

   const loggedRouter = () => {
      return (
         <div className="items-center mt-2 px-2">
            <div className="dropdown inline-block relative focus:outline-none">
               <button className="rounded inline-flex items-center focus:outline-none">
                  <img
                     src={auth.user.avatar}
                     className="h-8 w-8 rounded-full bg-white ring-2 ring-green-400 image"
                  />
               </button>
               <ul className="dropdown-menu  absolute hidden text-gray-700 pt-1 focus:outline-none font-normal ">
                  <li className="">
                     <a
                        className="rounded-t bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                        href="#">
                        Profile
                     </a>
                  </li>
                  <li className="">
                     <a
                        className="bg-gray-100 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap rounded-b"
                        onClick={handleLogout}>
                        Logout
                     </a>
                  </li>
               </ul>
            </div>
         </div>
      );
   };

   const isActive = (r) => {
      if (r === router.pathname) {
         return "link1";
      } else {
         return "link";
      }
   };
   const isSearch = () => {
      if (router.pathname !== "/") {
         return "bg-green-800";
      } else {
         return "bg-yellow-400 hover:bg-yellow-600";
      }
   };

   return (
      <nav className="sticky top-0 z-50">
         <div className="py-2 md:py-4 flex font-bold bg-green-800  items-center">
            <Link href="/">
               <div className="flex mx-4 flex-grow md:flex-grow-0 my-1 items-center text-white hover:text-gray-200 text-3xl p-1 cursor-pointer">
                  <h1 className="hidden md:inline">GreenShoppee</h1>
                  <h1 className="md:hidden">GS</h1>
                  <FaPagelines size={35} className="text-yellow-400" />
               </div>
            </Link>
            <div
               className={`hidden md:flex flex-grow items-center h-10 rounded-md cursor-pointer ${isSearch(
                  "/login" || "/cart",
               )} `}>
               {router.pathname !== "/" ? null : (
                  <>
                     <input
                        type="text"
                        className="p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none text-green-800 font-bold text-xl"
                     />
                     <SearchIcon className="h-12 p-3 text-green-800" />
                  </>
               )}
            </div>
            <div className="flex mx-4 text-white text-lg space-x-3 md:text-xl md:space-x-4 items-center">
               {Object.keys(auth).length === 0 ? (
                  <Link href="/login">
                     <div className={isActive("/login")}>Login</div>
                  </Link>
               ) : (
                  loggedRouter()
               )}
               <Link href="/orders">
                  <div className={isActive("/orders")}>Orders</div>
               </Link>
               <Link href="/cart">
                  <div
                     className={`relative flex items-center ${isActive(
                        "/cart",
                     )}`}>
                     <ShoppingCartIcon className="h-8" />
                     <span className="absolute text-xs -top-1 font-medium right-0 md:right-10 bg-red-500 h-4 w-4 rounded-full text-center text-gray-50">
                        {cart.length}
                     </span>
                     <p className="hidden md:inline md:text-md mt-1">Cart</p>
                  </div>
               </Link>
            </div>
         </div>

         {router.pathname !== "/" ? null : (
            <div className="flex h-12 md:hidden items-center bg-yellow-400 hover:bg-yellow-500">
               <input
                  className="flex-grow h-full focus:outline-none bg-gray-50 p-2 w-6 font-bold text-green-800 text-lg"
                  type="text"
                  placeholder="Search Here..."
               />
               <BiSearchAlt size={30} className="cursor-pointer mx-3 " />
            </div>
         )}
      </nav>
   );
}

export default Header;
