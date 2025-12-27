import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Booking",
    description: "Book appointments in seconds with our intuitive calendar system.",
  },
  {
    icon: Shield,
    title: "Verified Providers",
    description: "All service providers are vetted and reviewed by real customers.",
  },
  {
    icon: Clock,
    title: "Real-Time Availability",
    description: "See live availability and never worry about double bookings.",
  },
];

export function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative bg-primary rounded-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative px-8 py-16 lg:px-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                  Ready to Book Your Next{" "}
                  <span className="text-accent">Wellness Experience?</span>
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8">
                  Join thousands of satisfied customers and discover the easiest way 
                  to book barber, spa, salon, and wellness services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="hero" size="xl" asChild>
                    <Link to="/services">
                      Get Started Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 bg-primary-foreground/10 rounded-xl p-5"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-primary-foreground/70">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}