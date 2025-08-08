import { FileUp, Video, Search, Phone, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function ServiceCards() {
  const services = [
    {
      icon: FileUp,
      title: "eFiling Services",
      description: "File your cases electronically with our secure eFiling system",
      borderColor: "border-primary-blue",
      bgColor: "bg-blue-100",
      iconColor: "text-primary-blue",
      buttonColor: "text-primary-blue hover:text-blue-700",
      link: "/efiling"
    },
    {
      icon: Video,
      title: "Live Court Streaming",
      description: "Watch court proceedings live from anywhere",
      borderColor: "border-indian-green",
      bgColor: "bg-green-100",
      iconColor: "text-indian-green",
      buttonColor: "text-indian-green hover:text-green-700",
      link: "/live-streaming"
    },
    {
      icon: Search,
      title: "Case Status",
      description: "Track your case progress and get real-time updates",
      borderColor: "border-navy",
      bgColor: "bg-blue-100",
      iconColor: "text-navy",
      buttonColor: "text-navy hover:text-blue-700",
      link: "/case-status"
    },
    {
      icon: Phone,
      title: "Tele Law Services",
      description: "Get legal advice through video consultation",
      borderColor: "border-slate-600",
      bgColor: "bg-slate-100",
      iconColor: "text-slate-600",
      buttonColor: "text-slate-600 hover:text-slate-700",
      link: "/tele-law"
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
              className={`hover:shadow-xl transition-shadow border-t-4 ${service.borderColor} bg-white`}
            >
              <CardContent className="p-6 text-center bg-white">
                <div className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-gray-200`}>
                  <IconComponent className={`${service.iconColor} h-8 w-8`} />
                </div>
                <h4 className="font-semibold text-navy mb-2 font-[Noto_Sans]">{service.title}</h4>
                <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                <Link href={service.link}>
                  <Button 
                    variant="ghost" 
                    className={`${service.buttonColor} text-sm font-medium transition-colors h-auto p-0`}
                  >
                    Learn More 
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
