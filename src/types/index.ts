export type Club = {
  slug: string;
  name: string;
  city: string;
  region: string;
  address: string;
  lat: number;
  lng: number;
  contact: {
    phone?: string;
    instagram?: string;
    facebook?: string;
    email?: string;
  };
  trainingSchedule: string;
  description: string;
  imageUrl?: string;
};

export type ArmEvent = {
  slug: string;
  name: string;
  date: string;
  city: string;
  venue: string;
  organizer: string;
  categories: string[];
  registrationUrl?: string;
  description: string;
  imageUrl?: string;
};

export type Guide = {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  tags: string[];
};
