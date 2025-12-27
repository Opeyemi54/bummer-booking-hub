import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/services/ServiceCard";
import { mockServices } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", name: "All Services" },
  { id: "barber", name: "Barber" },
  { id: "spa", name: "Spa" },
  { id: "salon", name: "Salon" },
  { id: "massage", name: "Massage" },
  { id: "skincare", name: "Skincare" },
  { id: "wellness", name: "Wellness" },
];

const priceRanges = [
  { id: "all", name: "All Prices" },
  { id: "0-50", name: "Under $50" },
  { id: "50-100", name: "$50 - $100" },
  { id: "100-150", name: "$100 - $150" },
  { id: "150+", name: "$150+" },
];

const Services = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  
  const activeCategory = searchParams.get("category") || "all";
  const activePriceRange = searchParams.get("price") || "all";

  const filteredServices = useMemo(() => {
    return mockServices.filter((service) => {
      // Category filter
      if (activeCategory !== "all" && service.category.toLowerCase() !== activeCategory) {
        return false;
      }

      // Price filter
      if (activePriceRange !== "all") {
        const [min, max] = activePriceRange.split("-").map(Number);
        if (max) {
          if (service.price < min || service.price > max) return false;
        } else {
          if (service.price < 150) return false;
        }
      }

      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          service.name.toLowerCase().includes(query) ||
          service.description.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query)
        );
      }

      return true;
    });
  }, [activeCategory, activePriceRange, searchQuery]);

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === "all") {
      newParams.delete("category");
    } else {
      newParams.set("category", category);
    }
    setSearchParams(newParams);
  };

  const handlePriceChange = (price: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (price === "all") {
      newParams.delete("price");
    } else {
      newParams.set("price", price);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
    setSearchQuery("");
  };

  const hasActiveFilters = activeCategory !== "all" || activePriceRange !== "all" || searchQuery;

  return (
    <Layout>
      {/* Header */}
      <section className="bg-secondary/50 py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Explore Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover premium barber, spa, salon, and wellness services. 
            Book your perfect appointment today.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12"
            />
          </div>
          <Button
            variant="outline"
            className="lg:hidden h-12"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={cn(
              "lg:w-64 flex-shrink-0 space-y-6",
              showFilters ? "block" : "hidden lg:block"
            )}
          >
            {/* Categories */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      activeCategory === category.id
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <button
                    key={range.id}
                    onClick={() => handlePriceChange(range.id)}
                    className={cn(
                      "w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      activePriceRange === range.id
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {range.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
                onClick={clearFilters}
              >
                <X className="w-4 h-4 mr-2" />
                Clear all filters
              </Button>
            )}
          </aside>

          {/* Services Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredServices.length}</span> services
              </p>
            </div>

            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map((service, index) => (
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
              <div className="text-center py-16">
                <p className="text-xl font-medium text-foreground mb-2">No services found</p>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Services;