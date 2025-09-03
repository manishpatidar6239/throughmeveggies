import { TopBar } from "@/components/Navbar/TopBar";
import { Header } from "@/components/Navbar/Header"; 

export default function AuthLayout({ children }) {
  return (
    <>
      {/* <TopBar />
      <Header />  */}
      <main>{children}</main>
    </>
  );
}
