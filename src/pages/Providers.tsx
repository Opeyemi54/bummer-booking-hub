import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { ProviderCard } from "@/components/providers/ProviderCard";
import { mockProviders } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const specialties = [
  { id: "all", name: "All Specialties" },
  { id: "barber", name: "Barber" },
  { id: "massage", name: "Massage Therapist" },
  { id: "skincare", name: "Skincare Specialist" },
  { id: "spa", name: "Spa Therapist" },
];

const Providers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpecialty, setActiveSpecialty] = useState("all");

  const filteredProviders = useMemo(() => {
    return mockProviders.filter((provider) => {
      // Specialty filter
      if (activeSpecialty !== "all") {
        const specialtyLower = provider.specialty.toLowerCase();
        if (!specialtyLower.includes(activeSpecialty)) {
          return false;
        }
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          provider.name.toLowerCase().includes(query) ||
          provider.specialty.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [activeSpecialty, searchQuery]);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary/50 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Service Providers
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Meet our team of expert professionals ready to deliver exceptional 
            service experiences tailored to your needs.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search providers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => setActiveSpecialty(specialty.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeSpecialty === specialty.id
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                }`}
              >
                {specialty.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredProviders.length}</span> providers
          </p>
        </div>

        {/* Providers Grid */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProviders.map((provider, index) => (
              <div
                key={provider.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProviderCard provider={provider} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl font-medium text-foreground mb-2">No providers found</p>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Providers;
