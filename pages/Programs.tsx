import React from 'react';
import { Section, SectionHeading, Card, Button } from '../components/ui';
import { PROGRAMS, ACTIVITIES } from '../constants';
import { Clock, Calendar, Check } from 'lucide-react';

const Programs: React.FC = () => {
  return (
    <>
      {/* Programs List */}
      <Section bgColor="bg-slate-50">
        <SectionHeading 
          title="Our Programs" 
          subtitle="Structured learning paths tailored for every developmental stage."
        />
        <div className="space-y-12">
           {PROGRAMS.map((program, index) => (
             <div key={program.id} id={program.id} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1">
                   <div className={`inline-block p-3 rounded-2xl ${program.color} mb-4`}>
                      {program.icon}
                   </div>
                   <h3 className="text-3xl font-heading font-bold text-slate-800 mb-2">{program.title}</h3>
                   <div className="flex flex-wrap gap-4 mb-4 text-sm font-semibold text-slate-500">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {program.age}</span>
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {program.timings}</span>
                   </div>
                   <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                      {program.description}
                   </p>
                   <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                      <h4 className="font-bold text-slate-800 mb-3">Key Highlights:</h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                         {program.features.map((feat, i) => (
                            <li key={i} className="flex items-center gap-2 text-slate-600">
                               <div className="w-1.5 h-1.5 rounded-full bg-brand-pink"></div>
                               {feat}
                            </li>
                         ))}
                      </ul>
                   </div>
                   <div className="mt-8">
                      <Button to="/admissions" variant="primary">Enroll Now</Button>
                   </div>
                </div>
                <div className="flex-1 w-full">
                   <img 
                      src={`https://picsum.photos/seed/${program.id}/800/600`} 
                      alt={program.title} 
                      className="rounded-3xl shadow-xl w-full h-[300px] md:h-[400px] object-cover hover:scale-[1.02] transition-transform duration-500"
                   />
                </div>
             </div>
           ))}
        </div>
      </Section>

      {/* Curriculum / Activities */}
      <Section>
        <SectionHeading title="Learning Beyond Books" subtitle="Our curriculum is rich with activities that spark creativity and joy." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {ACTIVITIES.map((activity) => (
              <Card key={activity.id} hover={true} className="text-center group">
                 <div className="w-16 h-16 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-slate-600 group-hover:bg-brand-pink group-hover:text-white transition-colors duration-300 mb-4">
                    {activity.icon}
                 </div>
                 <h4 className="text-xl font-bold text-slate-800 mb-2">{activity.title}</h4>
                 <p className="text-slate-600 text-sm">{activity.description}</p>
              </Card>
           ))}
        </div>
      </Section>
    </>
  );
};

export default Programs;
