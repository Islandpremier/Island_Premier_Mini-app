import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <SplashScreen>

      <Navbar />

      <main className="min-h-screen bg-black text-white overflow-x-hidden">

        <Hero />

        <section className="mx-auto max-w-7xl px-6 py-20">
          <Features />
        </section>

        <Footer />

      </main>

    </SplashScreen>
  );
}