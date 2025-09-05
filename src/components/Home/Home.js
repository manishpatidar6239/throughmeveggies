 
import { HeroSection } from "./Hero/HeroSection";
import { OfferHome } from "./OfferHome/OfferHome";
import { HottestCategories } from "./HottestCategories/HottestCategories";
import { TrendingProduct } from "./TrendingProduct/TrendingProduct";
import { WeeklyProducts } from "./WeeklyProducts/WeeklyProducts";
import { SatisfiedClients } from "./SatisfiedClients/SatisfiedClients";
import { PopularNews } from "./PopularNews/index.js"; 

export const Home = () => {
  return (
    <>
      <HeroSection />
      <OfferHome />
      <HottestCategories />
      <TrendingProduct />
      <PopularNews />
      <SatisfiedClients />
      <WeeklyProducts />
    </>
  );
};
