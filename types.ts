import { ReactNode } from 'react';

export interface Testimonial {
  id: number;
  parentName: string;
  childName: string;
  childAge: string;
  content: string;
  avatar?: string;
}

export interface Program {
  id: string;
  title: string;
  age: string;
  description: string;
  color: string;
  icon: ReactNode;
  features: string[];
  timings: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  category: 'classroom' | 'outdoor' | 'event' | 'activity';
  alt: string;
}