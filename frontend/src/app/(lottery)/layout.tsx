import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      <div className="relative pt-[62px] sm:pb-[30px]">
        {children}
      </div>
      <Footer />
    </main>
  );
}
