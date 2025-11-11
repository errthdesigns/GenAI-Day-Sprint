export interface BriefPage {
  content: string[];
  image?: string; // Optional image URL for the page
}

export interface Brief {
  id: number;
  text?: string; // For simple feedback briefs (legacy, not used anymore)
  pages?: BriefPage[]; // For multi-page briefs
}

export type AppState = 'pre-start' | 'active' | 'submitting' | 'reaction' | 'result';

export type ReactionType = 'grin' | 'frown' | 'surprised';
