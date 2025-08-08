import Navigation from "@/components/navigation";
import { 
  Video, Calendar, Clock, Users, Volume2, VolumeX, Maximize, 
  Share, Download, Eye, MapPin, Gavel, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function LiveStreamingPage() {
  const [selectedCourt, setSelectedCourt] = useState("supreme-court");

  const liveStreams = [
    {
      id: "supreme-court",
      courtName: "Supreme Court of India",
      location: "New Delhi",
      currentCase: "PIL No. 12/2024 - Environmental Protection vs. Industrial Development",
      judges: ["CJI D.Y. Chandrachud", "Justice P.S. Narasimha", "Justice J.B. Pardiwala"],
      viewers: 2847,
      startTime: "10:30 AM",
      expectedDuration: "3 hours",
      status: "live",
      category: "Constitutional"
    },
    {
      id: "delhi-hc",
      courtName: "Delhi High Court",
      location: "New Delhi",
      currentCase: "CRL.A. 234/2024 - Bank Fraud Appeal",
      judges: ["Justice Rajiv Shakdher", "Justice Tara Vitasta Ganju"],
      viewers: 1523,
      startTime: "11:00 AM", 
      expectedDuration: "2 hours",
      status: "live",
      category: "Criminal"
    },
    {
      id: "mumbai-hc",
      courtName: "Bombay High Court",
      location: "Mumbai",
      currentCase: "WP 567/2024 - Property Dispute",
      judges: ["Justice G.S. Kulkarni"],
      viewers: 892,
      startTime: "2:30 PM",
      expectedDuration: "1.5 hours", 
      status: "scheduled",
      category: "Civil"
    }
  ];

  const upcomingSchedule = [
    {
      time: "2:30 PM",
      court: "Bombay High Court",
      case: "Property Dispute WP 567/2024",
      category: "Civil"
    },
    {
      time: "3:00 PM", 
      court: "Karnataka High Court",
      case: "Labour Law Appeal CRL.A. 789/2024",
      category: "Labour"
    },
    {
      time: "4:15 PM",
      court: "Madras High Court", 
      case: "Family Dispute WP 901/2024",
      category: "Family"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'ended': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'constitutional': return 'bg-purple-100 text-purple-800';
      case 'criminal': return 'bg-red-100 text-red-800';
      case 'civil': return 'bg-blue-100 text-blue-800';
      case 'family': return 'bg-green-100 text-green-800';
      case 'labour': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentStream = liveStreams.find(stream => stream.id === selectedCourt);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Video className="w-10 h-10 text-red-600" />
            Live Court Streaming
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Watch court proceedings live from across India. Transparent justice accessible to all citizens 
            with real-time streaming of important cases and hearings.
          </p>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-red-600">12</div>
              <div className="text-sm text-gray-600">Live Now</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-blue-600">5,262</div>
              <div className="text-sm text-gray-600">Total Viewers</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">28</div>
              <div className="text-sm text-gray-600">Courts Online</div>
            </CardContent>
          </Card>
          <Card className="bg-white/70 backdrop-blur-sm border-white/20">
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-purple-600">247</div>
              <div className="text-sm text-gray-600">Hours Today</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    {currentStream && (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                          <span>LIVE</span>
                        </div>
                        <Badge className={getCategoryColor(currentStream.category)}>
                          {currentStream.category}
                        </Badge>
                      </>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    {currentStream?.viewers.toLocaleString()} viewers
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentStream ? (
                  <div className="space-y-4">
                    {/* Video Player Area */}
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative">
                      <div className="text-white text-center">
                        <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-lg font-medium">Live Stream</p>
                        <p className="text-sm opacity-75">{currentStream.courtName}</p>
                        <Button className="mt-4 bg-red-600 hover:bg-red-700">
                          <Video className="w-4 h-4 mr-2" />
                          Join Live Stream
                        </Button>
                      </div>
                      
                      {/* Video Controls */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Volume2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Share className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                            <Maximize className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Case Information */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold">{currentStream.currentCase}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {currentStream.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Started: {currentStream.startTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Duration: {currentStream.expectedDuration}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Presiding Judges:</h4>
                        <ul className="text-sm text-gray-600">
                          {currentStream.judges.map((judge, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Gavel className="w-3 h-3" />
                              {judge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Video className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p>Select a court to watch live proceedings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Live Courts */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  Live Now
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {liveStreams.filter(stream => stream.status === 'live').map((stream) => (
                  <div
                    key={stream.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors border ${
                      selectedCourt === stream.id 
                        ? 'bg-blue-100 border-blue-300' 
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                    onClick={() => setSelectedCourt(stream.id)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-sm">{stream.courtName}</h4>
                      <Badge className={getCategoryColor(stream.category)} variant="outline">
                        {stream.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">{stream.currentCase}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {stream.viewers}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {stream.startTime}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Schedule */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Upcoming Today
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingSchedule.map((item, index) => (
                  <div key={index} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-sm">{item.time}</span>
                      </div>
                      <Badge className={getCategoryColor(item.category)} variant="outline">
                        {item.category}
                      </Badge>
                    </div>
                    <h4 className="font-medium text-sm">{item.court}</h4>
                    <p className="text-xs text-gray-600">{item.case}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Streaming Guidelines */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-2">
                <p>• Maintain courtroom decorum while viewing</p>
                <p>• Recording or distribution prohibited</p>
                <p>• Some sensitive cases may not be streamed</p>
                <p>• Audio may be muted during deliberations</p>
                <p>• Report technical issues via support</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}