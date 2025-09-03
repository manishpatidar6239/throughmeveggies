import { TopBar } from "@/components/Navbar/TopBar";
import { Header } from "@/components/Navbar/Header";
import { Nav } from "../Navbar/Nav";
import Footer from "../Footer";

export default function MainLayout({ children }) {
  return (
    <>
      <TopBar />
      <Header />
      <Nav />
      {children}
      <Footer />
    </>
  );
}
