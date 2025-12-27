import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Award, Heart, Target, ArrowRight } from "lucide-react";

const stats = [
  { value: "500+", label: "Services" },
  { value: "50K+", label: "Happy Clients" },
  { value: "100+", label: "Expert Providers" },
  { value: "4.9", label: "Avg Rating" },
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Every decision we make starts with our customers' needs and satisfaction.",
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We partner only with verified, top-rated service providers.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building lasting relationships between clients and service providers.",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "Continuously improving our platform for the best booking experience.",
  },
];

const team = [
  {
    name: "Alexandra Chen",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Marcus Johnson",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "Sofia Rodriguez",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60",
  },
  {
    name: "David Kim",
    role: "Head of Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=60",
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6 animate-fade-up">
            About Bummer
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 max-w-3xl mx-auto animate-fade-up delay-100">
            Making Wellness Accessible to Everyone
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 animate-fade-up delay-200">
            Founded in 2024, Bummer is on a mission to revolutionize how people discover 
            and book wellness services. We believe everyone deserves easy access to 
            self-care and relaxation.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-up delay-300">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Bummer was born from a simple frustration: booking a haircut or spa 
                  appointment shouldn't require multiple phone calls and endless waiting.
                </p>
                <p>
                  Our founders experienced this firsthand when trying to book wellness 
                  services in their busy lives. They envisioned a platform where anyone 
                  could discover, compare, and book services in just a few taps.
                </p>
                <p>
                  Today, Bummer connects thousands of clients with premium barbers, spas, 
                  salons, and wellness providers. We're proud to be part of their self-care 
                  journey.
                </p>
              </div>
              <Button variant="accent" className="mt-8" asChild>
                <Link to="/services">
                  Explore Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&auto=format&fit=crop&q=60"
                alt="Spa treatment"
                className="w-full rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-accent/10 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The principles that guide everything we do at Bummer.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-2xl p-6 border border-border hover-lift animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              The passionate people behind Bummer who work tirelessly to connect you 
              with the best wellness services.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            Ready to Start Your Wellness Journey?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers and book your first appointment today.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/services">
              Book Your First Service
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default About;