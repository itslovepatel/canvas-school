import React from 'react';
import { Program, Testimonial, Activity, GalleryItem } from './types';
import { Baby, BookOpen, Music, Palette, Trees, Gamepad2, Blocks, Smile, Star, ShieldCheck, Heart } from 'lucide-react';

export const SCHOOL_NAME = "Canvas International Pre-School";
export const SCHOOL_PHONE = "+91 94140 12345"; // Placeholder, updated below if specific provided, else generic
export const SCHOOL_EMAIL = "Canvasdausa1377@gmail.com";
export const SCHOOL_ADDRESS = "New Mandi Road, Behind Durga Mandir, Dausa";
export const SCHOOL_WEBSITE = "www.canvasinternationalschool.com";

// Updated Programs based on PDF naming conventions
export const PROGRAMS: Program[] = [
  {
    id: 'infant-community',
    title: 'Infant Community (Playgroup)',
    age: '1.5 – 2.5 Years',
    description: 'A gentle introduction focusing on phonological awareness, pre-writing skills, and social interaction.',
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    icon: <Baby className="w-8 h-8 text-pink-500" />,
    features: ['Phonological Awareness', 'Pattern Writing', 'My Body & Cleanliness', 'Mannerisms'],
    timings: '9:30 AM – 12:30 PM'
  },
  {
    id: 'inquirers',
    title: 'Inquirers (Nursery)',
    age: '2.5 – 3.5 Years',
    description: 'Building foundations for literacy and curiosity through the "Inquirer" methodology.',
    color: 'bg-sky-100 text-sky-700 border-sky-200',
    icon: <Blocks className="w-8 h-8 text-sky-500" />,
    features: ['Writing Patterns', 'Logical Reasoning', 'My Amazing Body', 'Sensory Development'],
    timings: '9:00 AM – 1:00 PM'
  },
  {
    id: 'collaborators',
    title: 'Collaborators (K.G)',
    age: '3.5 – 4.5 Years',
    description: 'Collaborative learning focusing on CVC words, simple sentences, and sorting concepts.',
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: <BookOpen className="w-8 h-8 text-green-500" />,
    features: ['Reading CVC Words', 'Simple Addition/Subtraction', 'Community Helpers', 'Living vs Non-Living'],
    timings: '8:30 AM – 1:30 PM'
  },
  {
    id: 'creators',
    title: 'Creators (Prep)',
    age: '4.5 – 6 Years',
    description: 'Advanced preparation with creative writing, number bonds, and complex concepts.',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    features: ['Creative Writing', 'Number Bonds (0-100)', 'Courtesy Words', 'Food and Nutrition'],
    timings: '8:30 AM – 1:30 PM'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    parentName: "Mrs. Sharma",
    childName: "Vihaan",
    childAge: "Infant Community",
    content: "The 'Learning Rooms' concept instead of classrooms is wonderful. Vihaan loves the scribble boards!",
  },
  {
    id: 2,
    parentName: "Mr. Rajesh Gupta",
    childName: "Aanya",
    childAge: "Inquirers",
    content: "Canvas Dausa has excellent hygiene standards. The 'Bagless' approach reduces burden and makes learning fun.",
  },
  {
    id: 3,
    parentName: "Mrs. Meena Verma",
    childName: "Kabir",
    childAge: "Collaborators",
    content: "The focus on PSED (Personal, Social, Emotional Development) has truly made my child more confident.",
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'technology',
    title: 'Technology & Apps',
    description: 'Canvas App and Audio-Visual rooms for modern learning.',
    icon: <Gamepad2 className="w-6 h-6" />
  },
  {
    id: 'culmination',
    title: 'Culmination Day',
    description: 'Kids present their skills and knowledge gained throughout the term.',
    icon: <Star className="w-6 h-6" />
  },
  {
    id: 'art',
    title: 'Creative Arts',
    description: 'Expressing creativity through colors, textures, and scribble boards.',
    icon: <Palette className="w-6 h-6" />
  },
  {
    id: 'music',
    title: 'Music & Dance',
    description: 'Rhythm and movement activities including Zumba.',
    icon: <Music className="w-6 h-6" />
  },
  {
    id: 'outdoor',
    title: 'Fun Olympics',
    description: 'Not just a boring sports day; parents and kids celebrate health together.',
    icon: <Trees className="w-6 h-6" />
  },
  {
    id: 'roleplay',
    title: 'Role Plays',
    description: 'Puppet shows and role play to enhance imagination.',
    icon: <Smile className="w-6 h-6" />
  }
];

export const GALLERY_IMAGES: GalleryItem[] = [
  { id: '1', src: 'https://picsum.photos/id/10/800/600', category: 'outdoor', alt: 'Fun Olympics Celebration' },
  { id: '2', src: 'https://picsum.photos/id/20/800/600', category: 'classroom', alt: 'Learning Room Activities' },
  { id: '3', src: 'https://picsum.photos/id/30/800/600', category: 'activity', alt: 'Puppet Show' },
  { id: '4', src: 'https://picsum.photos/id/40/800/600', category: 'event', alt: 'Culmination Day' },
  { id: '5', src: 'https://picsum.photos/id/50/800/600', category: 'classroom', alt: 'Montessori Activity' },
  { id: '6', src: 'https://picsum.photos/id/60/800/600', category: 'outdoor', alt: 'Sand pit play' },
];