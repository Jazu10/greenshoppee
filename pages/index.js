import Head from "next/head";
import { ProductItem, Banner } from "../components";
import { getData } from "../utils/fetchData";
import { useState } from "react";

function Home(props) {
   const [products, setProducts] = useState(props.products);

   return (
      <div className="bg-gray-100 h-50">
         <Head className="bg-green-500">
            <title >GreenShoppee</title>
         </Head>
         <main className="max-w-screen-2xl mx-auto">
            <Banner />
            {products.length === 0 ? (
               <h1>No product</h1>
            ) : (
               <ProductItem products={products} />
            )}
         </main>
      </div>
   );
}

export async function getServerSideProps() {
   const res = await getData("product");

   return {
      props: {
         products: res.products,
         result: res.result,
      },
   };
}

export default Home;
