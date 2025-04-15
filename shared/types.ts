export interface Category {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface QuickAction {
  id: string;
  text: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  messages: Message[];
  createdAt: number;
}

export interface JudgeVacancyData {
  court: string;
  sanctioned: number;
  working: number;
  vacancies: number;
}

export interface TrafficViolation {
  violation: string;
  fine: string;
}

export interface CourtCase {
  type: string;
  description: string;
  link?: string;
}

export interface JudicialData {
  judgeVacancies: JudgeVacancyData[];
  trafficViolations: TrafficViolation[];
  courtCases: CourtCase[];
  efilingSteps: string[];
  fastTrackCourts: string[];
  teleLawServices: string[];
}
