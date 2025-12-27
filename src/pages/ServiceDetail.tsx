import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { mockServices, mockProviders } from "@/data/mockData";
import { Calendar } from "@/components/ui/calendar";
import {
  Star,
  Clock,
  ArrowLeft,
  Heart,
  Share2,
  Check,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
];

const ServiceDetail = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const service = mockServices.find((s) => s.id === id);

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Service not found</h1>
          <Button asChild>
            <Link to="/services">Back to Services</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedTime || !selectedProvider) {
      return;
    }
    // Navigate to booking confirmation
    window.location.href = `/booking?service=${service.id}&date=${selectedDate.toISOString()}&time=${selectedTime}&provider=${selectedProvider}`;
  };

  const isBookingComplete = selectedDate && selectedTime && selectedProvider;

  return (
    <Layout>
      {/* Hero Image */}
      <section className="relative h-[40vh] lg:h-[50vh]">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        <div className="absolute top-4 left-4 right-4 flex justify-between">
          <Button variant="secondary" size="sm" asChild>
            <Link to="/services">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
          <div className="flex gap-2">
            <Button variant="secondary" size="icon">
              <Heart className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-10 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-6 lg:p-8 mb-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full mb-3">
                    {service.category}
                  </span>
                  <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                    {service.name}
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-foreground">{service.rating}</span>
                      <span>({service.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {service.duration} min
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-foreground">${service.price}</div>
                  <div className="text-sm text-muted-foreground">per session</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="font-semibold text-lg mb-3">About This Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* What's Included */}
              <div className="mb-8">
                <h2 className="font-semibold text-lg mb-3">What's Included</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    "Professional consultation",
                    "Premium products used",
                    "Relaxing atmosphere",
                    "Complimentary refreshments",
                    "Post-service care tips",
                    "Satisfaction guarantee",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="w-4 h-4 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Provider */}
              <div>
                <h2 className="font-semibold text-lg mb-3">Service Provider</h2>
                <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
                  <img
                    src={service.provider.avatar}
                    alt={service.provider.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{service.provider.name}</h3>
                    <p className="text-sm text-muted-foreground">Senior Specialist</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">4.9</span>
                      <span className="text-sm text-muted-foreground">(200+ reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Book Appointment</h2>

              {/* Select Provider */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Select Provider
                </h3>
                <div className="space-y-2">
                  {mockProviders.slice(0, 3).map((provider) => (
                    <button
                      key={provider.id}
                      onClick={() => setSelectedProvider(provider.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-xl border transition-colors text-left",
                        selectedProvider === provider.id
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      <img
                        src={provider.avatar}
                        alt={provider.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm truncate">{provider.name}</div>
                        <div className="text-xs text-muted-foreground">{provider.specialty}</div>
                      </div>
                      {selectedProvider === provider.id && (
                        <Check className="w-4 h-4 text-accent" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calendar */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Select Date
                </h3>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-xl border border-border p-3 pointer-events-auto"
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                />
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Select Time
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={cn(
                        "py-2 px-3 text-sm rounded-lg border transition-colors",
                        selectedTime === time
                          ? "bg-accent text-accent-foreground border-accent"
                          : "border-border hover:border-accent/50"
                      )}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="border-t border-border pt-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">{service.name}</span>
                  <span className="font-medium">${service.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration</span>
                  <span>{service.duration} min</span>
                </div>
              </div>

              <Button
                variant="hero"
                size="lg"
                className="w-full"
                disabled={!isBookingComplete}
                onClick={handleBooking}
              >
                {isBookingComplete ? "Confirm Booking" : "Select options to book"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceDetail;