import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { CategorySearch } from "@/components/home/CategorySearch";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CategorySearch />
      <FeaturedServices />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;