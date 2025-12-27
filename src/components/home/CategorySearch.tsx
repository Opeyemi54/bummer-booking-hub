import { Link } from "react-router-dom";
import { Scissors, Sparkles, Heart, Flower2, Palette, Star } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "barber",
    name: "Barber",
    description: "Haircuts, beard trims & grooming",
    icon: Scissors,
    color: "bg-blue-500/10 text-blue-600",
    href: "/services?category=barber",
  },
  {
    id: "spa",
    name: "Spa",
    description: "Relaxing treatments & therapies",
    icon: Sparkles,
    color: "bg-purple-500/10 text-purple-600",
    href: "/services?category=spa",
  },
  {
    id: "salon",
    name: "Salon",
    description: "Hair styling, coloring & care",
    icon: Palette,
    color: "bg-pink-500/10 text-pink-600",
    href: "/services?category=salon",
  },
  {
    id: "massage",
    name: "Massage",
    description: "Deep tissue, Swedish & more",
    icon: Heart,
    color: "bg-red-500/10 text-red-600",
    href: "/services?category=massage",
  },
  {
    id: "skincare",
    name: "Skincare",
    description: "Facials, peels & treatments",
    icon: Flower2,
    color: "bg-teal-500/10 text-teal-600",
    href: "/services?category=skincare",
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Holistic health services",
    icon: Star,
    color: "bg-amber-500/10 text-amber-600",
    href: "/services?category=wellness",
  },
];

export function CategorySearch() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Find the perfect service for your needs. From classic barbershop cuts 
            to luxurious spa treatments.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              to={category.href}
              className={cn(
                "group relative bg-card rounded-2xl p-6 text-center hover-lift border border-border/50",
                "animate-fade-up"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 transition-transform group-hover:scale-110",
                  category.color
                )}
              >
                <category.icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}