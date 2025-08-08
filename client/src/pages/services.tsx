import Navigation from "@/components/navigation";
import { 
  Search, FileText, Gavel, Phone, Users, Car, Video, Calculator, 
  Shield, BookOpen, Home, UserCheck, Briefcase, Clock 
} from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ServicesPage() {
  const serviceCategories = [
    {
      title: "Core Legal Services",
      icon: Gavel,
      color: "text-blue-600 bg-blue-100",
      services: [
        { name: "Case Status Tracking", description: "Track your case progress in real-time", link: "/case-status", icon: Search },
        { name: "eFiling Services", description: "File documents electronically", link: "/efiling", icon: FileText },
        { name: "Legal Aid Information", description: "Free legal assistance eligibility", link: "/", icon: UserCheck },
        { name: "Court Services", description: "Court timings, procedures, locations", link: "/", icon: Clock }
      ]
    },
    {
      title: "Digital Court Services",
      icon: Video,
      color: "text-green-600 bg-green-100",
      services: [
        { name: "Live Court Streaming", description: "Watch court proceedings live", link: "/live-streaming", icon: Video },
        { name: "Tele Law Services", description: "Legal advice through video consultation", link: "/tele-law", icon: Phone },
        { name: "Virtual Court Hearings", description: "Attend hearings remotely", link: "/", icon: Users },
        { name: "Digital Case Diary", description: "Online case management", link: "/", icon: BookOpen }
      ]
    },
    {
      title: "Specialized Services",
      icon: Shield,
      color: "text-purple-600 bg-purple-100",
      services: [
        { name: "Traffic Violation Services", description: "Pay fines and check violations", link: "/", icon: Car },
        { name: "Consumer Complaint Portal", description: "File consumer grievances", link: "/", icon: Briefcase },
        { name: "Family Court Services", description: "Marriage, divorce, custody matters", link: "/", icon: Home },
        { name: "Criminal Justice Services", description: "FIR filing and bail procedures", link: "/", icon: Shield }
      ]
    },
    {
      title: "Support Services",
      icon: Calculator,
      color: "text-orange-600 bg-orange-100",
      services: [
        { name: "Court Fee Calculator", description: "Calculate required court fees", link: "/", icon: Calculator },
        { name: "Document Templates", description: "Legal document formats", link: "/", icon: FileText },
        { name: "Multilingual Support", description: "Services in 22 languages", link: "/", icon: Users },
        { name: "Legal Education", description: "Know your rights and duties", link: "/", icon: BookOpen }
      ]
    }
  ];

  const quickStats = [
    { label: "Total Services", value: "50+", color: "text-blue-600" },
    { label: "Languages", value: "22", color: "text-green-600" },
    { label: "Courts Connected", value: "1000+", color: "text-purple-600" },
    { label: "Daily Users", value: "10K+", color: "text-orange-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Gavel className="w-10 h-10 text-blue-600" />
            All DoJ Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive digital services covering all aspects of the Indian judicial system. 
            Access everything from case tracking to legal aid in one unified platform.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Categories */}
        <div className="space-y-8">
          {serviceCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <Card key={categoryIndex} className="bg-white/70 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center`}>
                      <CategoryIcon className="w-6 h-6" />
                    </div>
                    {category.title}
                  </CardTitle>
                  <CardDescription>
                    Essential services for {category.title.toLowerCase()} needs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {category.services.map((service, serviceIndex) => {
                      const ServiceIcon = service.icon;
                      return (
                        <Link key={serviceIndex} href={service.link}>
                          <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group border border-gray-200 hover:border-blue-300 hover:shadow-md">
                            <div className="flex items-center gap-3 mb-2">
                              <ServiceIcon className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
                              <Badge variant="outline" className="text-xs">
                                {service.link === "/" ? "Coming Soon" : "Available"}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-gray-800 group-hover:text-blue-700 mb-1">
                              {service.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {service.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Services */}
        <Card className="mt-8 bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4 text-center">Most Popular Services</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/case-status" className="text-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Search className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Case Status</h4>
                <p className="text-sm text-blue-100">Real-time tracking</p>
              </Link>
              <Link href="/efiling" className="text-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <FileText className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-medium mb-1">eFiling</h4>
                <p className="text-sm text-blue-100">Electronic submissions</p>
              </Link>
              <Link href="/tele-law" className="text-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <Phone className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-medium mb-1">Tele Law</h4>
                <p className="text-sm text-blue-100">Video consultations</p>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}