import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-spa.jpg";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Luxury spa and wellness services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <div className="animate-fade-up">
            <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
              Book Your Perfect Experience
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up delay-100">
            Book Your Service —{" "}
            <span className="text-accent">Barber, Spa, Salon</span> & More
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 animate-fade-up delay-200">
            Discover and book the best wellness services near you. 
            From haircuts to massages, find your perfect appointment in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up delay-300">
            <Button variant="hero" size="xl" asChild>
              <Link to="/services">
                Explore Services
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <Link to="/services">
                <Search className="w-5 h-5 mr-2" />
                Find Near Me
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-primary-foreground/20 animate-fade-up delay-400">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">500+</div>
              <div className="text-sm text-primary-foreground/70">Services</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">50K+</div>
              <div className="text-sm text-primary-foreground/70">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-accent">4.9</div>
              <div className="text-sm text-primary-foreground/70">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}