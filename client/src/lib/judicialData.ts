import { Category, QuickAction } from "@shared/types";

export const judicialCategories: Category[] = [
  {
    id: "judges",
    title: "Judge Appointments",
    description: "Vacancies and appointments across courts",
    icon: "gavel"
  },
  {
    id: "cases",
    title: "Case Status",
    description: "Track and monitor court case status",
    icon: "fact_check"
  },
  {
    id: "fines",
    title: "Traffic Violations",
    description: "Fines and penalty information",
    icon: "local_police"
  },
  {
    id: "efiling",
    title: "eFiling & ePay",
    description: "Electronic filing and payment",
    icon: "description"
  },
  {
    id: "streaming",
    title: "Case Live Streaming",
    description: "Court case broadcasts",
    icon: "wifi_tethering"
  },
  {
    id: "fasttrack",
    title: "Fast Track Courts",
    description: "Expedited judicial proceedings",
    icon: "speed"
  },
  {
    id: "mobile",
    title: "eCourts Mobile App",
    description: "Mobile services information",
    icon: "smartphone"
  },
  {
    id: "telelaw",
    title: "Tele Law Services",
    description: "Remote legal consultation",
    icon: "support_agent"
  }
];

export const quickActions: QuickAction[] = [
  {
    id: "track-case",
    text: "How do I track my case?"
  },
  {
    id: "efile",
    text: "eFiling procedures"
  },
  {
    id: "vacancies",
    text: "Judge vacancies"
  },
  {
    id: "traffic",
    text: "Traffic violation fines"
  }
];
