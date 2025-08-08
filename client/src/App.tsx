import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import HomePage from "@/pages/home";
import EFilingPage from "@/pages/efiling";
import CaseStatusPage from "@/pages/case-status";
import ServicesPage from "@/pages/services";
import LiveStreamingPage from "@/pages/live-streaming";
import TeleLawPage from "@/pages/tele-law";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/efiling" component={EFilingPage} />
          <Route path="/case-status" component={CaseStatusPage} />
          <Route path="/services" component={ServicesPage} />
          <Route path="/live-streaming" component={LiveStreamingPage} />
          <Route path="/tele-law" component={TeleLawPage} />
          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}
