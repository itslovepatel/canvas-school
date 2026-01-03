import React from 'react';
import { Program, Testimonial, Activity, GalleryItem } from './types';
import { Baby, BookOpen, Music, Palette, Trees, Gamepad2, Blocks, Smile, Star, ShieldCheck, Heart, GraduationCap, Users, Calculator, FlaskConical } from 'lucide-react';

export const SCHOOL_NAME = "Canwas Public School";
export const SCHOOL_PHONE = "+91 82099 09098";
export const SCHOOL_EMAIL = "Canvasdausa1377@gmail.com";
export const SCHOOL_ADDRESS = "New Mandi Road, Behind Durga Mandir, Dausa";
export const SCHOOL_WEBSITE = "www.canwaspublicschool.com";

// Programs from Pre-School to Class 8
export const PROGRAMS: Program[] = [
  {
    id: 'playgroup',
    title: 'Playgroup',
    age: '2 – 3 Years',
    description: 'A gentle introduction to school life with play-based learning, social skills, and motor development.',
    color: 'bg-pink-100 text-pink-700 border-pink-200',
    icon: <Baby className="w-8 h-8 text-pink-500" />,
    features: ['Play-Based Learning', 'Motor Skills', 'Social Interaction', 'Basic Hygiene'],
    timings: '8:30 AM – 2:00 PM'
  },
  {
    id: 'nursery',
    title: 'Nursery',
    age: '3 – 4 Years',
    description: 'Building foundations for literacy and numeracy through interactive activities.',
    color: 'bg-sky-100 text-sky-700 border-sky-200',
    icon: <Blocks className="w-8 h-8 text-sky-500" />,
    features: ['Alphabet Recognition', 'Number Concepts', 'Art & Craft', 'Rhymes & Stories'],
    timings: '8:30 AM – 2:00 PM'
  },
  {
    id: 'lkg',
    title: 'L.K.G',
    age: '4 – 5 Years',
    description: 'Lower Kindergarten with structured learning and creative activities.',
    color: 'bg-green-100 text-green-700 border-green-200',
    icon: <Smile className="w-8 h-8 text-green-500" />,
    features: ['Reading Readiness', 'Writing Practice', 'Basic Maths', 'Environmental Awareness'],
    timings: '8:30 AM – 2:00 PM'
  },
  {
    id: 'ukg',
    title: 'U.K.G',
    age: '5 – 6 Years',
    description: 'Upper Kindergarten preparing children for primary school with confidence.',
    color: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    icon: <Star className="w-8 h-8 text-yellow-500" />,
    features: ['Sentence Formation', 'Addition & Subtraction', 'General Knowledge', 'Creative Expression'],
    timings: '8:30 AM – 2:00 PM'
  },
  {
    id: 'primary',
    title: 'Primary (Class 1-5)',
    age: '6 – 11 Years',
    description: 'Strong academic foundation with focus on core subjects and holistic development.',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    icon: <BookOpen className="w-8 h-8 text-blue-500" />,
    features: ['English & Hindi', 'Mathematics', 'Science & EVS', 'Computer Education'],
    timings: '8:30 AM – 2:00 PM'
  },
  {
    id: 'middle',
    title: 'Middle School (Class 6-8)',
    age: '11 – 14 Years',
    description: 'Advanced curriculum preparing students for higher education with specialized subjects.',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: <GraduationCap className="w-8 h-8 text-purple-500" />,
    features: ['Science & Maths', 'Social Studies', 'Sanskrit/Hindi', 'Computer Science'],
    timings: '8:30 AM – 2:00 PM'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    parentName: "Mrs. Sharma",
    childName: "Vihaan",
    childAge: "Class 3",
    content: "Canwas Public School has excellent teachers and a nurturing environment. My son loves going to school!",
  },
  {
    id: 2,
    parentName: "Mr. Rajesh Gupta",
    childName: "Aanya",
    childAge: "Class 6",
    content: "The school maintains great hygiene standards and focuses on both academics and extracurricular activities.",
  },
  {
    id: 3,
    parentName: "Mrs. Meena Verma",
    childName: "Kabir",
    childAge: "U.K.G",
    content: "The personal attention given to each child has made my son more confident and eager to learn.",
  }
];

export const ACTIVITIES: Activity[] = [
  {
    id: 'technology',
    title: 'Technology & Apps',
    description: 'Modern Audio-Visual rooms for interactive learning.',
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