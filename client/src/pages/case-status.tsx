import Navigation from "@/components/navigation";
import { Search, Clock, CheckCircle, AlertCircle, Calendar, User, FileText, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function CaseStatusPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<"cnr" | "party">("cnr");
  const [caseData, setCaseData] = useState<any>(null);

  const handleSearch = () => {
    // Simulate case data retrieval
    const simulatedCase = {
      cnr: searchType === "cnr" ? searchTerm : "MHMU010012023000123",
      caseNumber: "CC/123/2023",
      caseType: "Civil Suit",
      filingDate: "2023-08-15",
      petitioner: searchType === "party" ? searchTerm : "Ramesh Kumar",
      respondent: "State Bank of India",
      court: "District Court, Mumbai",
      judge: "Hon. Justice P.K. Sharma",
      stage: "Evidence Recording",
      nextDate: "2024-01-25",
      status: "Active",
      lastUpdated: "2024-01-20",
      hearings: [
        { date: "2024-01-20", purpose: "Evidence Recording", status: "Completed" },
        { date: "2024-01-15", purpose: "Arguments", status: "Completed" },
        { date: "2024-01-10", purpose: "Document Verification", status: "Completed" },
        { date: "2024-01-25", purpose: "Final Arguments", status: "Scheduled" }
      ]
    };
    setCaseData(simulatedCase);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Search className="w-10 h-10 text-blue-600" />
            Case Status Tracking
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track your case progress in real-time. Search by CNR number or party name to get 
            the latest updates on hearings, orders, and case status.
          </p>
        </div>

        {/* Search Section */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Search Your Case</CardTitle>
            <CardDescription>Enter CNR number or party name to track case status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4 mb-4">
                <Button
                  variant={searchType === "cnr" ? "default" : "outline"}
                  onClick={() => setSearchType("cnr")}
                  className={searchType === "cnr" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  CNR Number
                </Button>
                <Button
                  variant={searchType === "party" ? "default" : "outline"}
                  onClick={() => setSearchType("party")}
                  className={searchType === "party" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  Party Name
                </Button>
              </div>
              
              <div className="flex gap-4">
                <Input
                  placeholder={searchType === "cnr" ? "Enter CNR Number (e.g., MHMU010012023000123)" : "Enter Party Name"}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Case Information */}
        {caseData && (
          <div className="space-y-6">
            {/* Basic Case Info */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-blue-600" />
                    Case Information
                  </span>
                  <Badge className={getStatusColor(caseData.status)}>
                    {caseData.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">CNR Number</h4>
                    <p className="text-gray-600">{caseData.cnr}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Case Number</h4>
                    <p className="text-gray-600">{caseData.caseNumber}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Case Type</h4>
                    <p className="text-gray-600">{caseData.caseType}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Filing Date</h4>
                    <p className="text-gray-600">{caseData.filingDate}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Current Stage</h4>
                    <p className="text-gray-600">{caseData.stage}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Next Date</h4>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {caseData.nextDate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Party Details */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-6 h-6 text-green-600" />
                  Party Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Petitioner/Plaintiff</h4>
                    <p className="text-gray-600">{caseData.petitioner}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Respondent/Defendant</h4>
                    <p className="text-gray-600">{caseData.respondent}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Court</h4>
                    <p className="text-gray-600">{caseData.court}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-1">Presiding Judge</h4>
                    <p className="text-gray-600 flex items-center gap-1">
                      <Gavel className="w-4 h-4" />
                      {caseData.judge}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hearing History */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-6 h-6 text-orange-600" />
                  Hearing History & Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseData.hearings.map((hearing: any, index: number) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {hearing.status === 'Completed' ? (
                          <CheckCircle className="w-6 h-6 text-green-600" />
                        ) : hearing.status === 'Scheduled' ? (
                          <Clock className="w-6 h-6 text-blue-600" />
                        ) : (
                          <AlertCircle className="w-6 h-6 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{hearing.purpose}</h4>
                            <p className="text-sm text-gray-600">{hearing.date}</p>
                          </div>
                          <Badge className={getStatusColor(hearing.status)}>
                            {hearing.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Need Help with Your Case?</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="bg-white text-blue-600 hover:bg-blue-50">
                    <FileText className="w-4 h-4 mr-2" />
                    Download Case Summary
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    <Calendar className="w-4 h-4 mr-2" />
                    Set Court Reminders
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Contact Court Registry
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Search Tips */}
        {!caseData && (
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                Search Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">CNR Number Format</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 16-digit unique case identifier</li>
                    <li>• Example: MHMU010012023000123</li>
                    <li>• Available on court orders and receipts</li>
                    <li>• Most accurate search method</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Party Name Search</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Enter exact name as filed</li>
                    <li>• Use full name for better results</li>
                    <li>• Case-sensitive search</li>
                    <li>• May return multiple matches</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}