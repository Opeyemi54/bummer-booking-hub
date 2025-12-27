import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Regular Client",
    content: "Bummer has completely changed how I book my spa days. The interface is so intuitive, and I love being able to see real-time availability. Highly recommend!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Owner",
    content: "As a barbershop owner, this platform has streamlined our booking process. Our no-show rate dropped by 60% thanks to the automated reminders.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=60",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Wellness Enthusiast",
    content: "The variety of services available is incredible. From massage to skincare, I can book everything in one place. The providers are all top-notch!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Bummer for their wellness needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={cn(
                "bg-card rounded-2xl p-6 border border-border/50 animate-fade-up"
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}