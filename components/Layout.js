import { Header, Notify } from "./";

function Layout({ children }) {
   return (
      <div className="w-auto">
         <Header />
         <Notify />
         {children}
      </div>
   );
}

export default Layout;
