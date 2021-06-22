import Head from "next/head";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import valid from "../utils/valid";
import { DataContext } from "../store/GlobalState";
import { postData } from "../utils/fetchData";
import { useRouter } from "next/router";

function Register() {
   const initialState = { name: "", email: "", password: "", cf_password: "" };
   const [userData, setUserData] = useState(initialState);

   const { name, email, password, cf_password } = userData;

   const [state, dispatch] = useContext(DataContext);
   const { auth } = state;
   const router = useRouter();

   const handleChangeInput = (e) => {
      const { name, value } = e.target;
      setUserData({ ...userData, [name]: value });
      dispatch({ type: "NOTIFY", payload: {} });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const errMsg = valid(name, email, password, cf_password);
      if (errMsg)
         return dispatch({ type: "NOTIFY", payload: { error: errMsg } });

      dispatch({ type: "NOTIFY", payload: { loading: true } });

      const res = await postData("auth/register", userData);
      if (res.err)
         return dispatch({ type: "NOTIFY", payload: { error: res.err } });

      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
   };

   useEffect(() => {
      if (Object.keys(auth).length !== 0) router.push("/");
   }, [auth]);

   return (
      <div className="w-full max-w-lg mx-auto md:my-10 p-10 md:border md:shadow-lg md:rounded-md">
         <Head>
            <title>Register</title>
         </Head>
         <form onSubmit={handleSubmit}>
            <h1 className="text-center font-bold text-xl pb-5 text-green-500">
               Register
            </h1>
            <div className="flex flex-wrap mb-6">
               <label className="label1" htmlFor="name">
                  User name
               </label>
               <input
                  className="input1"
                  type="text"
                  placeholder="Enter your name"
                  name="name"
                  value={name}
                  onChange={handleChangeInput}
               />
               <label className="label1" htmlFor="email">
                  Email
               </label>
               <input
                  className="input1"
                  type="text"
                  placeholder="Enter your email id"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
               />
               <label className="label1 pt-3" htmlFor="password">
                  Password
               </label>
               <input
                  className="input1 mb-2"
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  value={password}
                  onChange={handleChangeInput}
               />
               <label className="label1 pt-3" htmlFor="cfpassword">
                  Confirm Password
               </label>
               <input
                  className="input1 mb-2"
                  type="password"
                  placeholder="Enter password again"
                  name="cf_password"
                  value={cf_password}
                  onChange={handleChangeInput}
               />
            </div>
            <button className="bg-green-500 w-full p-3 text-white font-bold rounded-md hover:bg-green-700 mb-3 ring-2 focus:outline-none focus:ring-2 focus:ring-green-700">
               Register
            </button>
            <p>
               Already a user ?
               <Link href="/login">
                  <a className="pt-2 text-green-500 hover:underline hover:text-red-500 cursor-pointer px-1">
                     Login
                  </a>
               </Link>
            </p>
         </form>
      </div>
   );
}

export default Register;
