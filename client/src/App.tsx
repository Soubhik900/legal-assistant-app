import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import ChatbotPage from "@/pages/chatbot";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Switch>
          <Route path="/" component={ChatbotPage} />
          <Route>
            <ChatbotPage />
          </Route>
        </Switch>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}
