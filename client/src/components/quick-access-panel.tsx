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
    { icon: Search, text: "Case Status Tracking", query: "case status tracking CNR number" },
    { icon: Gavel, text: "Legal Aid Information", query: "legal aid eligibility and application" },
    { icon: FileUp, text: "Court Services Info", query: "court timings procedures locations" },
    { icon: Phone, text: "Basic Legal Guidance", query: "FIR filing consumer complaints legal guidance" },
    { icon: Video, text: "Multilingual Support", query: "multilingual support regional languages" },
    { icon: Car, text: "Voice Search Features", query: "voice input natural language search" },
  ];

  return (
    <>
      <Card className="mb-6 bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
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
                className="w-full text-left p-3 h-auto justify-start bg-slate-100 border-slate-200 hover:bg-slate-200 hover:border-primary-blue transition-colors btn-no-yellow"
                onClick={() => onQuickQuery(item.query)}
              >
                <IconComponent className="text-primary-blue mr-2 h-4 w-4" />
                <span className="text-sm">{item.text}</span>
              </Button>
            );
          })}
        </CardContent>
      </Card>

      {/* Statistics Panel */}
      <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-lg">
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
