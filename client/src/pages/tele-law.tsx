import Navigation from "@/components/navigation";
import { 
  Phone, Video, Calendar, Clock, User, CheckCircle, 
  Star, MapPin, Languages, Shield, CreditCard, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function TeleLawPage() {
  const [selectedLawyer, setSelectedLawyer] = useState<string | null>(null);

  const availableLawyers = [
    {
      id: "1",
      name: "Advocate Priya Sharma",
      specialization: ["Family Law", "Property Disputes", "Consumer Rights"],
      experience: "12 years",
      rating: 4.8,
      reviews: 147,
      languages: ["Hindi", "English", "Punjabi"],
      consultationFee: 800,
      availability: "Available Now",
      location: "New Delhi",
      status: "online"
    },
    {
      id: "2", 
      name: "Advocate Rajesh Kumar",
      specialization: ["Criminal Law", "Bail Applications", "Traffic Violations"],
      experience: "15 years",
      rating: 4.9,
      reviews: 203,
      languages: ["Hindi", "English", "Gujarati"],
      consultationFee: 1000,
      availability: "Available in 30 min",
      location: "Mumbai",
      status: "busy"
    },
    {
      id: "3",
      name: "Advocate Dr. Sunita Menon",
      specialization: ["Labour Law", "Service Matters", "Employment Disputes"],
      experience: "18 years", 
      rating: 4.7,
      reviews: 98,
      languages: ["English", "Malayalam", "Tamil"],
      consultationFee: 1200,
      availability: "Available at 3:00 PM",
      location: "Bangalore",
      status: "scheduled"
    }
  ];

  const consultationPackages = [
    {
      name: "Quick Consultation",
      duration: "15 minutes",
      price: 500,
      features: ["Basic legal advice", "Document review", "Next steps guidance"],
      popular: false
    },
    {
      name: "Standard Consultation", 
      duration: "30 minutes",
      price: 800,
      features: ["Detailed legal advice", "Case analysis", "Document drafting guidance", "Follow-up questions"],
      popular: true
    },
    {
      name: "Comprehensive Consultation",
      duration: "60 minutes", 
      price: 1500,
      features: ["Complete case review", "Legal strategy planning", "Document preparation", "Court procedure guidance", "7-day follow-up"],
      popular: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Available Now';
      case 'busy': return 'In Consultation';
      case 'scheduled': return 'Scheduled';
      default: return 'Offline';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Phone className="w-10 h-10 text-green-600" />
            Tele Law Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Get professional legal advice from qualified advocates through secure video consultations. 
            Expert legal guidance accessible from anywhere in India.
          </p>
        </div>

        {/* Service Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Advocates</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">22</div>
              <div className="text-sm text-gray-600">Languages</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-orange-600">₹500</div>
              <div className="text-sm text-gray-600">Starting From</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Available Lawyers */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-6 h-6 text-blue-600" />
                  Available Advocates
                </CardTitle>
                <CardDescription>Choose from qualified legal professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableLawyers.map((lawyer) => (
                  <div
                    key={lawyer.id}
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedLawyer === lawyer.id 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedLawyer(lawyer.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{lawyer.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                          <MapPin className="w-4 h-4" />
                          {lawyer.location} • {lawyer.experience} experience
                        </div>
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{lawyer.rating}</span>
                          <span className="text-sm text-gray-600">({lawyer.reviews} reviews)</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(lawyer.status)}>
                          {getStatusText(lawyer.status)}
                        </Badge>
                        <div className="text-lg font-bold text-green-600 mt-1">
                          ₹{lawyer.consultationFee}
                        </div>
                        <div className="text-sm text-gray-600">per consultation</div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="text-sm font-medium mb-1">Specializations:</h4>
                      <div className="flex flex-wrap gap-2">
                        {lawyer.specialization.map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <h4 className="text-sm font-medium mb-1">Languages:</h4>
                      <div className="flex items-center gap-1">
                        <Languages className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {lawyer.languages.join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {lawyer.availability}
                      </div>
                      <Button 
                        className="bg-green-600 hover:bg-green-700"
                        disabled={lawyer.status === 'busy'}
                      >
                        <Video className="w-4 h-4 mr-2" />
                        {lawyer.status === 'online' ? 'Consult Now' : 'Schedule'}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Consultation Packages */}
          <div className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-6 h-6 text-purple-600" />
                  Consultation Packages
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {consultationPackages.map((pkg, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border ${
                      pkg.popular 
                        ? 'border-blue-300 bg-blue-50' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{pkg.name}</h4>
                      {pkg.popular && (
                        <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      ₹{pkg.price}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {pkg.duration} consultation
                    </div>
                    <ul className="space-y-1 mb-4">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={pkg.popular ? "default" : "outline"}>
                      Select Package
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-orange-600" />
                  How it Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Choose Advocate</h4>
                    <p className="text-sm text-gray-600">Select based on specialization and availability</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Book & Pay</h4>
                    <p className="text-sm text-gray-600">Select package and make secure payment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Join Video Call</h4>
                    <p className="text-sm text-gray-600">Connect via secure video consultation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">Get Advice</h4>
                    <p className="text-sm text-gray-600">Receive written summary and next steps</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-green-600" />
                  Security & Privacy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>End-to-end encrypted consultations</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Attorney-client privilege maintained</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>No recordings stored on servers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Verified advocate credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}