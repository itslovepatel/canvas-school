import React, { useState, useEffect } from 'react';
import { Section, SectionHeading, Button, Card } from '../components/ui';
import { Shield, Users, Smile, Play, Star, ChevronRight, Video, GraduationCap, ArrowRight, ShieldCheck, Heart, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PROGRAMS, TESTIMONIALS, SCHOOL_NAME } from '../constants';

const Home: React.FC = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPopupVisible(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative bg-orange-50 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-yellow/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-brand-pink/20 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 md:pt-24 md:pb-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left space-y-6">
              <div className="inline-block bg-white px-4 py-1.5 rounded-full text-sm font-bold text-brand-pink shadow-sm mb-2 border border-brand-pink/20">
                Admissions Open for 2024-25
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-slate-800 leading-tight">
                Begin The <span className="text-brand-pink">Journey</span> With <span className="text-brand-yellow drop-shadow-sm text-stroke-pink">CANWAS</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto md:mx-0">
                A concept preschool in Dausa where we believe in "Learning by Doing" to nurture young, creative minds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <Button to="/contact" variant="primary" className="text-lg px-8 py-4">
                  Book a School Visit
                </Button>
                <Button to="/admissions" variant="outline" className="text-lg px-8 py-4">
                  View Programs
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://plus.unsplash.com/premium_photo-1664303228186-a61e7dc91597?q=80&w=800" 
                alt="Happy child playing with blocks" 
                className="rounded-[3rem] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-8 border-white w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <Section className="bg-white">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <Shield className="w-8 h-8 text-brand-blue" />, title: "Safety First", text: "CCTV & Electrical Safety", color: "bg-brand-blue/10" },
              { icon: <Users className="w-8 h-8 text-brand-pink" />, title: "Trained Staff", text: "Regular Workshops", color: "bg-brand-pink/10" },
              { icon: <Play className="w-8 h-8 text-brand-mint" />, title: "Learning Rooms", text: "No Classrooms", color: "bg-brand-mint/10" },
              { icon: <GraduationCap className="w-8 h-8 text-brand-yellow" />, title: "Holistic Growth", text: "Mind & Body", color: "bg-brand-yellow/10" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-3 group cursor-default">
                 <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    {item.icon}
                 </div>
                 <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                 <p className="text-slate-500 text-sm">{item.text}</p>
              </div>
            ))}
         </div>
      </Section>

      {/* Programs Preview */}
      <Section bgColor="bg-slate-50">
        <SectionHeading 
          title="Our Programs" 
          subtitle="Age-appropriate learning paths designed to nurture curiosity and confidence at every step."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PROGRAMS.map((program) => (
            <Link to="/programs" key={program.id} className="block h-full">
              <Card className="h-full border-t-4 border-t-brand-pink hover:border-t-8 transition-all flex flex-col items-start text-left">
                <div className={`p-3 rounded-xl ${program.color} mb-4`}>
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{program.title}</h3>
                <span className="text-sm font-semibold text-slate-500 mb-3 bg-slate-100 px-2 py-1 rounded-md">{program.age}</span>
                <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {program.description}
                </p>
                <div className="text-brand-pink font-bold text-sm flex items-center gap-1 mt-auto">
                  Learn More <ChevronRight className="w-4 h-4" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button to="/programs" variant="secondary">View Detailed Curriculum</Button>
        </div>
      </Section>

      {/* About Preview / Vision */}
      <Section className="overflow-hidden">
        <div className="grid md:grid-cols-2 gap-16 items-center">
           <div className="order-2 md:order-1 relative">
              <div className="absolute inset-0 bg-brand-yellow/20 rounded-full blur-3xl transform -translate-x-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop" 
                alt="Teacher reading to kids" 
                className="rounded-3xl shadow-xl relative z-10 w-full object-cover"
              />
              <div className="absolute top-10 -right-10 bg-white p-4 rounded-xl shadow-lg z-20 hidden lg:block max-w-[200px]">
                 <div className="flex gap-1 mb-2 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                 </div>
                 <p className="text-xs text-slate-600 font-semibold italic">"Best preschool in Dausa!"</p>
              </div>
           </div>
           <div className="order-1 md:order-2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800">
                Nurturing the <span className="text-brand-blue">Leaders of Tomorrow</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                At {SCHOOL_NAME}, we aim to enhance a child's self-esteem. We focus on making a child independent and grow as an individual.
              </p>
              <ul className="space-y-3">
                 {[
                   "No Blackboard - We have Scribble Boards",
                   "Inspired by 5 Great Educators (Montessori, Gandhi...)",
                   "Holistic PSED Approach",
                   "Focus on 4 C's (Critical Thinking, Collaboration...)"
                 ].map((item, i) => (
                   <li key={i} className="flex items-center gap-3 text-slate-700">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-3 h-3" />
                      </div>
                      {item}
                   </li>
                 ))}
              </ul>
              <Button to="/about" variant="outline" className="mt-4">Read Our Story</Button>
           </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section bgColor="bg-brand-pink/5">
        <SectionHeading title="Parents Love Us" subtitle="Hear from the families who trust us with their little ones." />
        <div className="grid md:grid-cols-3 gap-8">
           {TESTIMONIALS.map((t) => (
             <Card key={t.id} className="relative pt-10 text-center">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center shadow-md">
                   <Heart className="w-6 h-6 text-yellow-700 fill-current" />
                </div>
                <p className="text-slate-600 italic mb-6">"{t.content}"</p>
                <div>
                   <h4 className="font-bold text-slate-800">{t.parentName}</h4>
                   <p className="text-xs text-brand-pink font-semibold">Parent of {t.childName}</p>
                </div>
             </Card>
           ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Section className="bg-brand-blue text-white text-center">
         <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">Ready to start the journey?</h2>
            <p className="text-lg md:text-xl text-sky-100">
               Admissions are open. Schedule a visit to our Dausa branch today.
            </p>
            <div className="flex justify-center gap-4 pt-4">
               <Button to="/contact" variant="primary" className="bg-white text-brand-blue hover:bg-sky-50 shadow-none">
                  Book a Visit
               </Button>
               <Button to="/contact" className="bg-transparent border-2 border-white text-white hover:bg-white/10 shadow-none">
                  Contact Us
               </Button>
            </div>
         </div>
      </Section>

      {/* Fixed Pop-up Notification */}
      <div className={`fixed bottom-24 left-4 md:bottom-8 md:left-8 z-50 bg-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all duration-1000 border border-slate-100 ${isPopupVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
          <div className="w-12 h-12 bg-brand-mint rounded-full flex items-center justify-center">
            <Smile className="text-green-600 w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-slate-800">Happy Kids</p>
            <p className="text-xs text-slate-500">Admissions Open</p>
          </div>
      </div>
    </>
  );
};

export default Home;