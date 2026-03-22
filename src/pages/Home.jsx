import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ContactSection from "../components/ContactSection";
import Reviews from "../components/Reviews";

export default function Home() {
  return (
    <main className="w-full bg-gray-50 text-gray-800">
      <Hero />
      <Categories />
      <Reviews />
      <ContactSection />
    </main>
  );
}

