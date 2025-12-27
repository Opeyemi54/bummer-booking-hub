import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { mockServices, mockProviders } from "@/data/mockData";
import { Check, Calendar, Clock, User, CreditCard, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, name: "Details", icon: User },
  { id: 2, name: "Date & Time", icon: Calendar },
  { id: 3, name: "Payment", icon: CreditCard },
  { id: 4, name: "Confirm", icon: Check },
];

const Booking = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  const serviceId = searchParams.get("service");
  const dateString = searchParams.get("date");
  const time = searchParams.get("time");
  const providerId = searchParams.get("provider");

  const service = mockServices.find((s) => s.id === serviceId);
  const provider = mockProviders.find((p) => p.id === providerId);
  const date = dateString ? new Date(dateString) : new Date();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    setIsBookingComplete(true);
  };

  if (isBookingComplete) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-20">
          <div className="max-w-lg mx-auto text-center">
            <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Check className="w-10 h-10 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4 animate-fade-up">
              Booking Confirmed!
            </h1>
            <p className="text-muted-foreground mb-8 animate-fade-up delay-100">
              Your appointment has been successfully booked. We've sent a confirmation email to {formData.email}.
            </p>
            
            <div className="bg-card rounded-2xl border border-border p-6 mb-8 text-left animate-fade-up delay-200">
              <h2 className="font-semibold mb-4">Booking Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">{service?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider</span>
                  <span className="font-medium">{provider?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{date.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span className="font-medium">{time}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-border">
                  <span className="font-medium">Total</span>
                  <span className="font-bold text-lg">${service?.price}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/services">Book Another Service</Link>
              </Button>
              <Button variant="accent" asChild>
                <Link to="/">Go to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return (
      <Layout>
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid booking</h1>
          <Button asChild>
            <Link to="/services">Browse Services</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to={`/services/${serviceId}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Service
          </Link>
        </Button>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-12">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                  currentStep >= step.id
                    ? "bg-accent border-accent text-accent-foreground"
                    : "border-border text-muted-foreground"
                )}
              >
                {currentStep > step.id ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </div>
              <span
                className={cn(
                  "hidden sm:block ml-2 text-sm font-medium",
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-8 sm:w-16 h-0.5 mx-2 sm:mx-4",
                    currentStep > step.id ? "bg-accent" : "bg-border"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-6 lg:p-8">
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-6">Your Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Special Requests (Optional)</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                        placeholder="Any special requests or notes..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-6">Confirm Date & Time</h2>
                  <div className="bg-secondary/50 rounded-xl p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
                        <div className="text-muted-foreground">at {time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="font-semibold">{service.duration} minutes</div>
                        <div className="text-muted-foreground">Duration</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-6">Payment Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Card Number</label>
                      <input
                        type="text"
                        className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                        placeholder="4242 4242 4242 4242"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Expiry Date</label>
                        <input
                          type="text"
                          className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">CVC</label>
                        <input
                          type="text"
                          className="w-full h-12 px-4 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                    <p className="text-sm text-muted-foreground">
                      🔒 Your payment information is encrypted and secure.
                    </p>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="animate-fade-in">
                  <h2 className="text-xl font-semibold mb-6">Review & Confirm</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl">
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-semibold">{service.name}</h3>
                        <p className="text-sm text-muted-foreground">{service.category} • {service.duration} min</p>
                        <p className="text-accent font-semibold mt-1">${service.price}</p>
                      </div>
                    </div>
                    <div className="p-4 bg-secondary/50 rounded-xl space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name</span>
                        <span>{formData.firstName} {formData.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span>{formData.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone</span>
                        <span>{formData.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Provider</span>
                        <span>{provider?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date & Time</span>
                        <span>{date.toLocaleDateString()} at {time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                >
                  Previous
                </Button>
                {currentStep < 4 ? (
                  <Button
                    variant="accent"
                    onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button variant="hero" onClick={handleSubmit}>
                    Confirm Booking
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sticky top-24">
              <h2 className="font-semibold text-lg mb-4">Order Summary</h2>
              
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.duration} min</p>
                </div>
              </div>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider</span>
                  <span>{provider?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span>{date.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time</span>
                  <span>{time}</span>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${service.price}</span>
                </div>
                <div className="flex justify-between text-sm mb-4">
                  <span className="text-muted-foreground">Service Fee</span>
                  <span>$0</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${service.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Booking;