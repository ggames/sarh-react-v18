


import { Header } from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Sidebar from "./Sidebar/Sidebar";



const Layout = () => {

  return (
    <div className="w-full lg:w[1024px] m-auto flex flex-col justify-start relative">
      <Sidebar />
      <Header />
      <Main />
      <Footer />
    </div>



  );
}

export default Layout;