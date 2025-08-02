import { FileUp, Video, Search, Phone, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ServiceCards() {
  const services = [
    {
      icon: FileUp,
      title: "eFiling Services",
      description: "File your cases electronically with our secure eFiling system",
      borderColor: "border-saffron",
      bgColor: "bg-orange-100",
      iconColor: "text-saffron",
      buttonColor: "text-saffron hover:text-orange-600",
    },
    {
      icon: Video,
      title: "Live Court Streaming",
      description: "Watch court proceedings live from anywhere",
      borderColor: "border-indian-green",
      bgColor: "bg-green-100",
      iconColor: "text-indian-green",
      buttonColor: "text-indian-green hover:text-green-700",
    },
    {
      icon: Search,
      title: "Case Status",
      description: "Track your case progress and get real-time updates",
      borderColor: "border-navy",
      bgColor: "bg-blue-100",
      iconColor: "text-navy",
      buttonColor: "text-navy hover:text-blue-700",
    },
    {
      icon: Phone,
      title: "Tele Law Services",
      description: "Get legal advice through video consultation",
      borderColor: "border-purple-accent",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-accent",
      buttonColor: "text-purple-accent hover:text-purple-700",
    },
  ];

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-navy mb-6 text-center font-[Noto_Sans]">Popular Services</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <Card 
              key={index} 
              className={`hover:shadow-xl transition-shadow border-t-4 ${service.borderColor}`}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className={`${service.iconColor} h-8 w-8`} />
                </div>
                <h4 className="font-semibold text-navy mb-2 font-[Noto_Sans]">{service.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <Button 
                  variant="ghost" 
                  className={`${service.buttonColor} text-sm font-medium transition-colors h-auto p-0`}
                >
                  Learn More 
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
