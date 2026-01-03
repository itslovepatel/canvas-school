import React from 'react';
import { Section, SectionHeading, Card } from '../components/ui';
import { Target, Heart, Eye, CheckCircle, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <>
      <Section bgColor="bg-slate-50">
        <SectionHeading 
          title="About Canvas" 
          subtitle="Where Little Minds Begin Their Big Journey." 
        />
        
        {/* Intro */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-heading text-slate-800">Our Story</h3>
            <p className="text-slate-600 leading-relaxed">
              Canvas International Pre-School is an exemplary pre-school that is foremost in offering a powerful foundation to young children. We act like an empty canvas for kids to fill with their wonderful imagination and mold their identity.
            </p>
            <p className="text-slate-600 leading-relaxed">
              At our Dausa branch, we provide an environment where children can explore and learn in a caring atmosphere. We focus on holistic development, integrating play, social skills, and emotional growth.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
             <img src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg mt-8" alt="Philosophy 1" />
             <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=400" className="rounded-2xl shadow-lg" alt="Philosophy 2" />
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
           <Card className="bg-white border-t-4 border-t-brand-pink">
              <div className="w-12 h-12 bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink mb-4">
                 <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-slate-600 text-sm">To nurture children with important values which will help them to grow into successful adults. We aim to be a leading center for early childhood education.</p>
           </Card>
           <Card className="bg-white border-t-4 border-t-brand-blue">
              <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mb-4">
                 <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-slate-600 text-sm">To foster high standards of behavior with responsibility, self-discipline, and social consciousness. We assist each student to discover their strengths and talents.</p>
           </Card>
        </div>

        {/* Philosophy - 5 Educators */}
        <div className="mb-16">
            <h3 className="text-2xl font-bold font-heading text-slate-800 text-center mb-8">Inspired by Great Educators</h3>
            <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                {[
                    { name: "Maria Montessori", desc: "Child-centered environments where children freely move and explore." },
                    { name: "Rabindranath Tagore", desc: "Open education philosophy; classrooms free of fixed furniture." },
                    { name: "Mahatma Gandhi", desc: "Teaching through Head, Heart, and Hands for self-reliance." },
                    { name: "Rudolph Steiner", desc: "Waldorf philosophy: Creativity, imagination, and hands-on learning." },
                    { name: "Loris Malaguzzi", desc: "Reggio Emilia: Children as capable, curious learners." }
                ].map((edu, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                        <div className="w-12 h-12 bg-brand-yellow/20 rounded-full mx-auto mb-3 flex items-center justify-center text-brand-pink font-bold">
                            {edu.name.charAt(0)}
                        </div>
                        <h4 className="font-bold text-sm mb-2">{edu.name}</h4>
                        <p className="text-xs text-slate-500">{edu.desc}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Principal/Management Message */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-slate-100 flex flex-col md:flex-row gap-8 items-center mb-16">
           <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shrink-0 border-4 border-brand-yellow">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" alt="Principal" className="w-full h-full object-cover" />
           </div>
           <div className="flex-1 text-center md:text-left">
              <div className="text-brand-pink font-bold uppercase tracking-wide text-sm mb-2">Message from Management</div>
              <h3 className="text-2xl font-bold font-heading mb-4">Principal's Desk</h3>
              <p className="text-slate-600 italic mb-4">
                 "Canvas is a vision transformed to create an education system with a goal to develop a whole new art of teaching and learning encircled within fun and creativity. We strive to shape the future generation by nurturing each child's individuality at our Dausa campus."
              </p>
              <div className="flex gap-2 justify-center md:justify-start">
                 <Award className="w-5 h-5 text-yellow-500" />
                 <span className="text-sm font-semibold text-slate-500">Dedicated to Excellence in Education</span>
              </div>
           </div>
        </div>

      </Section>
      
      {/* Safety */}
      <Section>
        <SectionHeading title="Safety & Hygiene" subtitle="We create a safe, secure and serene environment." />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
           {[
             "Electrical Safety",
             "Road Safety Education",
             "Water Safety",
             "Good Health & Hygiene",
             "CCTV Monitoring",
             "Background Verified Staff",
             "Safe Touch Awareness",
             "Nutritious Meals"
           ].map((item, i) => (
             <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                <span className="font-semibold text-slate-700">{item}</span>
             </div>
           ))}
        </div>
      </Section>
    </>
  );
};

export default About;