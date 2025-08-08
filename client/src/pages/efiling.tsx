import Navigation from "@/components/navigation";
import { FileText, Upload, CheckCircle, Clock, AlertCircle, Download, CreditCard, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function EFilingPage() {
  const steps = [
    {
      step: 1,
      title: "Document Preparation",
      description: "Prepare your legal documents in PDF format",
      icon: FileText,
      details: ["All documents must be in PDF format", "Maximum file size: 10MB per document", "Ensure all pages are clearly readable"]
    },
    {
      step: 2,
      title: "Case Registration",
      description: "Register your case and get case number",
      icon: CheckCircle,
      details: ["Fill case registration form", "Pay court fees online", "Get unique case number (CNR)"]
    },
    {
      step: 3,
      title: "Document Upload",
      description: "Upload your prepared documents",
      icon: Upload,
      details: ["Upload main petition/application", "Attach supporting documents", "Add advocate details"]
    },
    {
      step: 4,
      title: "Payment & Submission",
      description: "Pay fees and submit your case",
      icon: CreditCard,
      details: ["Pay court fees securely", "Review all documents", "Submit case electronically"]
    }
  ];

  const documentTypes = [
    { name: "Civil Petitions", fee: "₹500", time: "2-3 days" },
    { name: "Criminal Applications", fee: "₹300", time: "1-2 days" },
    { name: "Appeal Petitions", fee: "₹1000", time: "3-5 days" },
    { name: "Bail Applications", fee: "₹200", time: "Same day" },
    { name: "Revision Petitions", fee: "₹750", time: "2-4 days" },
    { name: "Writ Petitions", fee: "₹1500", time: "3-7 days" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <FileText className="w-10 h-10 text-blue-600" />
            eFiling Services
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            File your legal documents electronically with our secure and efficient eFiling system. 
            Save time, reduce paperwork, and track your submissions in real-time.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Service Available</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">98%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-navy-600">2-5 Min</div>
              <div className="text-sm text-gray-600">Average Time</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-600">₹200-1500</div>
              <div className="text-sm text-gray-600">Filing Fees</div>
            </CardContent>
          </Card>
        </div>

        {/* eFiling Process */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Upload className="w-6 h-6 text-blue-600" />
              eFiling Process
            </CardTitle>
            <CardDescription>Follow these simple steps to file your documents electronically</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.step} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="mb-2">
                      <Badge variant="outline" className="mb-2">Step {step.step}</Badge>
                      <h3 className="font-semibold text-lg">{step.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                    </div>
                    <ul className="text-xs text-gray-500 space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Document Types & Fees */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-green-600" />
                Document Types & Fees
              </CardTitle>
              <CardDescription>Standard filing fees for different document types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documentTypes.map((doc) => (
                  <div key={doc.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium">{doc.name}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Processing: {doc.time}
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-green-700 bg-green-100">
                      {doc.fee}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Security & Requirements
              </CardTitle>
              <CardDescription>Important guidelines for secure eFiling</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Security Features
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• SSL encrypted document transfer</li>
                  <li>• Digital signature verification</li>
                  <li>• Secure payment gateway integration</li>
                  <li>• Audit trail for all submissions</li>
                </ul>
              </div>
              
              <div className="p-4 bg-amber-50 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Document Requirements
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• PDF format only (max 10MB each)</li>
                  <li>• Clear, readable scanned documents</li>
                  <li>• All pages must be properly oriented</li>
                  <li>• Advocate signature mandatory</li>
                </ul>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium flex items-center gap-2 mb-2">
                  <Download className="w-4 h-4 text-green-600" />
                  After Submission
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Instant acknowledgment receipt</li>
                  <li>• SMS & email notifications</li>
                  <li>• Real-time case status tracking</li>
                  <li>• Digital case diary access</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to File Your Documents?</h3>
            <p className="mb-6 text-blue-100">
              Start your eFiling process now and get your documents submitted within minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Upload className="w-4 h-4 mr-2" />
                Start eFiling
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                <Download className="w-4 h-4 mr-2" />
                Download Forms
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}