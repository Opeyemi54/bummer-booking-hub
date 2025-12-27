import { Link } from "react-router-dom";
import { Star, Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Provider {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviewCount: number;
  avatar: string;
  experience: string;
}

interface ProviderCardProps {
  provider: Provider;
  className?: string;
}

export function ProviderCard({ provider, className }: ProviderCardProps) {
  return (
    <div
      className={cn(
        "group bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-accent/30",
        className
      )}
    >
      <div className="p-6 text-center">
        {/* Avatar */}
        <div className="relative mx-auto mb-4">
          <img
            src={provider.avatar}
            alt={provider.name}
            className="w-24 h-24 rounded-full object-cover mx-auto ring-4 ring-secondary group-hover:ring-accent/30 transition-all"
          />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            {provider.rating}
          </div>
        </div>

        {/* Info */}
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {provider.name}
        </h3>
        <p className="text-accent font-medium text-sm mb-3">
          {provider.specialty}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{provider.experience}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4" />
            <span>{provider.reviewCount} reviews</span>
          </div>
        </div>

        {/* CTA */}
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/providers/${provider.id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
}
