import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import NavbarGuest from "../components/NavbarGuest";
import NavbarUser from "../components/NavbarUser";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <div>
      <Announcement />
      {user ? <NavbarUser /> : <NavbarGuest />}
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
