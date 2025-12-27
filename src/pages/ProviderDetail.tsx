import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/button";
import { mockProviders, mockServices } from "@/data/mockData";
import { Star, Clock, Award, MapPin, Calendar, ArrowLeft } from "lucide-react";

const ProviderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const provider = mockProviders.find((p) => p.id === id);

  if (!provider) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Provider Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The provider you're looking for doesn't exist.
          </p>
          <Button asChild>
            <Link to="/providers">View All Providers</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Get services offered by this provider
  const providerServices = mockServices.filter(
    (service) => service.provider.name === provider.name
  );

  return (
    <Layout>
      {/* Back Navigation */}
      <div className="container mx-auto px-4 lg:px-8 pt-6">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/providers">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Providers
          </Link>
        </Button>
      </div>

      {/* Provider Header */}
      <section className="container mx-auto px-4 lg:px-8 py-8">
        <div className="bg-card rounded-3xl border border-border p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            {/* Avatar */}
            <div className="relative">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover ring-4 ring-accent/20"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-current" />
                {provider.rating}
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {provider.name}
              </h1>
              <p className="text-xl text-accent font-medium mb-4">
                {provider.specialty}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-accent" />
                  <span>{provider.experience} experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-accent" />
                  <span>{provider.reviewCount} reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span>Downtown Location</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-muted-foreground max-w-2xl mb-6">
                {provider.name} is an experienced {provider.specialty.toLowerCase()} with {provider.experience} of professional experience. 
                Known for exceptional attention to detail and personalized service, they bring expertise and passion to every appointment.
              </p>

              {/* CTA */}
              <Button variant="accent" size="lg" asChild>
                <Link to={`/booking?provider=${provider.id}`}>
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Provider's Services */}
      <section className="container mx-auto px-4 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Services by {provider.name}
        </h2>

        {providerServices.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {providerServices.map((service, index) => (
              <div
                key={service.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-secondary/50 rounded-2xl p-8 text-center">
            <p className="text-muted-foreground">
              No services currently listed for this provider.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProviderDetail;
