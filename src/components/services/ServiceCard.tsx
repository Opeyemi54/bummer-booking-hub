import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Clock, MapPin } from "lucide-react";

export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  rating: number;
  reviewCount: number;
  image: string;
  provider: {
    name: string;
    avatar: string;
  };
  location?: string;
  featured?: boolean;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <Link
      to={`/services/${service.id}`}
      className="group bg-card rounded-2xl overflow-hidden border border-border/50 hover-lift"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {service.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
            Featured
          </div>
        )}
        <div className="absolute top-3 right-3 px-2 py-1 bg-card/90 backdrop-blur-sm rounded-lg flex items-center gap-1">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="text-sm font-medium">{service.rating}</span>
          <span className="text-xs text-muted-foreground">({service.reviewCount})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-accent uppercase tracking-wide">
            {service.category}
          </span>
          <span className="text-muted-foreground/30">•</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {service.duration} min
          </span>
        </div>

        <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-accent transition-colors">
          {service.name}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {service.description}
        </p>

        {/* Provider */}
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-border">
          <img
            src={service.provider.avatar}
            alt={service.provider.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm text-muted-foreground">
            by <span className="font-medium text-foreground">{service.provider.name}</span>
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-foreground">${service.price}</span>
          </div>
          <Button variant="accent" size="sm">
            Book Now
          </Button>
        </div>
      </div>
    </Link>
  );
}