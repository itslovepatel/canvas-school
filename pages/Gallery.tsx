import React, { useState } from 'react';
import { Section, SectionHeading, Card } from '../components/ui';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'classroom' | 'outdoor' | 'event' | 'activity'>('all');

  const filteredImages = filter === 'all' 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(img => img.category === filter);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'classroom', label: 'Classroom' },
    { id: 'outdoor', label: 'Outdoor Play' },
    { id: 'event', label: 'Events' },
    { id: 'activity', label: 'Activities' },
  ];

  return (
    <Section bgColor="bg-slate-50 min-h-screen">
      <SectionHeading title="Moments of Joy" subtitle="A glimpse into the daily life at Little Steps." />
      
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id as any)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
              filter === cat.id 
                ? 'bg-brand-pink text-white shadow-lg shadow-pink-200' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredImages.map((img) => (
          <div key={img.id} className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md bg-white">
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <p className="text-white font-bold text-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                {img.alt}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredImages.length === 0 && (
         <div className="text-center py-20 text-slate-500">
            No photos found in this category yet.
         </div>
      )}
    </Section>
  );
};

export default Gallery;
