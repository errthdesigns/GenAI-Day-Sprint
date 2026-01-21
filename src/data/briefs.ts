import { Brief } from "../types";
import heroProductImage from "figma:asset/fde3884abb470c3c781eb7b3c75c951f7e07fbe8.png";

// Outcome content - same for all briefs on page 2
const outcomeContent = [
  "**Outcome:**",
  "",
  "You must do what is asked in the brief.",
  "Uploaded files can be video, image, pdf or mp3.",
  "You have 10 mins.",
  "",
  "The fastest and best wins...",
];

// The initial brief - always shown first with 2 pages
export const initialBrief: Brief = {
  id: 0,
  pages: [
    {
      content: [
        "**Brief:**",
        "",
        "It's February...",
        "Lidl URGENTLY need a Christmas social post by EOP.",
        "",
        "It must show off Lidl bakery, and should include a croissant...",
      ],
    },
    {
      content: outcomeContent,
    },
  ],
};

// Feedback briefs - shown after each submission (randomly selected)
// Each brief is 2 pages: Page 1 is feedback, Page 2 is outcome (same for all)

export const feedbackBriefs: Brief[] = [
  {
    id: 1,
    pages: [
      {
        content: ["Oh no!", "", "The client made a spelling error. It was actually for Halloween! Please update your asset"],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 2,
    pages: [
      {
        content: ["Oh no!", "", "The client's wife has celiac and croissants are triggering… Please hero Lidl's 'Fresh Credentials' instead!"],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 3,
    pages: [
      {
        content: ["Oh no!", "", "The client want's a voice-over so that people really 'Get'. What your ad is about. Please add one."],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 4,
    pages: [
      {
        content: ["Yey!", "", "The client loves your idea so much! They want a key visual for Easter! Valentines' day! And Ramadan!"],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 6,
    pages: [
      {
        content: ["Yey!", "", "The client loves it! But they think it would look better if it included a racoon wearing the 'lidl Jacket'"],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 7,
    pages: [
      {
        content: ["Yey!", "", "The client loves it! But they think it would look better if it included a racoon wearing the 'lidl Jacket'"],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 11,
    pages: [
      {
        content: ["Yey!", "", "The client loves your idea! But could it be more innovative… Surprise us!"],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 12,
    pages: [
      {
        content: ["Oh No!", "", "A new pitch came in! We need you to pivot and do an ad for Love Honey instead."],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 14,
    pages: [
      {
        content: ["Oh No!", "", "The client wants an in-person meeting to see the work. Please use 'agent mode' to find them a taxi from BR2 to Liverpool street for the lowest possible price."],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 16,
    pages: [
      {
        content: ["Oh No!", "", "The client's Social was hacked! Please make 3 OOH instead. The headlines must be written with AI (as the client would like to show they are #AiFirst)"],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 17,
    pages: [
      {
        content: ["Oh No!", "", "An URGENT brief came in from Sohel! We need you to create an ad for LoveLace instead!"],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 18,
    pages: [
      {
        content: ["Yey!", "", "The client loves it. But could it be a bit more yellow?"],
      },
      {
        content: outcomeContent,
      },
    ],
  },
  {
    id: 19,
    pages: [
      {
        content: ["Oh No!", "", "Aldi has come out with a perfume Dupe! Please pivot and create a new lidl perfume dupe to go viral."],
      },
      {
        content: outcomeContent,
      },
    ],
  },
];

let lastBriefId: number | null = null;

export function getRandomFeedbackBrief(excludeId?: number): Brief {
  // Filter out the last brief to avoid repetition
  let availableBriefs = excludeId 
    ? feedbackBriefs.filter(b => b.id !== excludeId)
    : feedbackBriefs;
  
  // If all briefs are excluded (shouldn't happen), use all briefs
  if (availableBriefs.length === 0) {
    availableBriefs = feedbackBriefs;
  }
  
  const selectedBrief = availableBriefs[Math.floor(Math.random() * availableBriefs.length)];
  lastBriefId = selectedBrief.id;
  
  return selectedBrief;
}
