import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/navbar";

export default function MainLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
  
    return (
            <>
            <Navbar/>
            {children}
            <Footer/>
            </>
         
    
    );
  }