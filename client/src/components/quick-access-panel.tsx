import { Gavel, Search, FileUp, Car, Video, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuickAccessPanelProps {
  onQuickQuery: (query: string) => void;
  statistics?: {
    activeCases: string;
    eFilingToday: string;
    resolvedCases: string;
    lastUpdated: string;
  };
}

export default function QuickAccessPanel({ onQuickQuery, statistics }: QuickAccessPanelProps) {
  const quickAccessItems = [
    { icon: Gavel, text: "Judge Appointments", query: "judge appointments" },
    { icon: Search, text: "Case Status", query: "case status" },
    { icon: FileUp, text: "eFiling Procedures", query: "efiling procedures" },
    { icon: Car, text: "Traffic Violations", query: "traffic violations" },
    { icon: Video, text: "Live Court Streaming", query: "court streaming" },
    { icon: Phone, text: "Tele Law Services", query: "tele law services" },
  ];

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-navy font-[Noto_Sans]">Quick Access</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {quickAccessItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={index}
                variant="outline"
                className="w-full text-left p-3 h-auto justify-start border-gray-200 hover:border-saffron hover:bg-orange-50 transition-colors"
                onClick={() => onQuickQuery(item.query)}
              >
                <IconComponent className="text-saffron mr-2 h-4 w-4" />
                <span className="text-sm">{item.text}</span>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Statistics Panel */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-navy font-[Noto_Sans]">Service Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {statistics ? (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Cases</span>
                <span className="font-semibold text-navy">{statistics.activeCases}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">eFiling Today</span>
                <span className="font-semibold text-indian-green">{statistics.eFilingToday}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Resolved Cases</span>
                <span className="font-semibold text-purple-accent">{statistics.resolvedCases}</span>
              </div>
            </>
          ) : (
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
