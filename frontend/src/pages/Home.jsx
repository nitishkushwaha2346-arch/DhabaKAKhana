import React from "react";
import Hero from "../components/Hero";
import SpecialOffer from "../components/SpecialOffer";
import PopularDishes from "../components/PopularDishes";
import FoodCategories from "../components/FoodCategories";
import About from "../components/About";
import WhyChooseUs from "../components/WhyChooseUs";
import Reviews from "../components/Reviews";
import CTA from "../components/CTA";

const Home = () => {
  return (
    <main className="home-main-wrapper">
      <Hero />
      <SpecialOffer />
      <PopularDishes />
      <FoodCategories />
      <About />
      <WhyChooseUs />
      <Reviews />
      <CTA />
    </main>
  );
};

export default Home;