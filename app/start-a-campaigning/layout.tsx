import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Header/navbar";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full md:h-screen md:overflow-hidden">
      <Navbar />
      {children}
      <div className="inset-0 block md:hidden">
        <Footer/>
      </div>
    </div>
  );
}
