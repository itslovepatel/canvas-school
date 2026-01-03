import React, { useState } from 'react';
import { Section, SectionHeading, Card, Button } from '../components/ui';
import { MapPin, Phone, Mail, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { SCHOOL_ADDRESS, SCHOOL_EMAIL, SCHOOL_PHONE, PROGRAMS } from '../constants';
import { submitVisitRequest, isValidEmail, type VisitRequestData } from '../services/formService';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childName: '',
    program: '',
    visitDate: '',
    visitTime: 'Morning (9-11)'
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // Validate email if provided
    if (formData.email && !isValidEmail(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      const submissionData: VisitRequestData = {
        parentName: formData.parentName,
        phone: formData.phone,
        email: formData.email || undefined,
        childName: formData.childName || undefined,
        program: formData.program || undefined,
        visitDate: formData.visitDate,
        visitTime: formData.visitTime
      };

      const result = await submitVisitRequest(submissionData);

      if (result.status === 'success') {
        setSubmitted(true);
        setEmailSent(result.emailSent || false);
      } else if (result.status === 'duplicate') {
        setError('This visit request was already submitted. Our team will contact you soon.');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({
      parentName: '',
      phone: '',
      email: '',
      childName: '',
      program: '',
      visitDate: '',
      visitTime: 'Morning (9-11)'
    });
    setEmailSent(false);
    setError('');
  };

  return (
    <>
      <Section bgColor="bg-slate-50">
         <SectionHeading title="Get in Touch" subtitle="We'd love to hear from you. Visit our Dausa branch." />
         
         <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <Card className="flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue mb-4">
                  <Phone className="w-7 h-7" />
               </div>
               <h3 className="font-bold text-lg mb-2">Call Us</h3>
               <p className="text-slate-600 mb-4">{SCHOOL_PHONE}</p>
               <Button variant="outline" className="w-full" onClick={() => window.location.href = `tel:${SCHOOL_PHONE}`}>Call Now</Button>
            </Card>
            
            <Card className="flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-brand-pink/10 rounded-full flex items-center justify-center text-brand-pink mb-4">
                  <Mail className="w-7 h-7" />
               </div>
               <h3 className="font-bold text-lg mb-2">Email Us</h3>
               <p className="text-slate-600 mb-4 break-all">{SCHOOL_EMAIL}</p>
               <Button variant="outline" className="w-full" onClick={() => window.location.href = `mailto:${SCHOOL_EMAIL}`}>Send Email</Button>
            </Card>
            
            <Card className="flex flex-col items-center text-center">
               <div className="w-14 h-14 bg-brand-mint/10 rounded-full flex items-center justify-center text-green-600 mb-4">
                  <Clock className="w-7 h-7" />
               </div>
               <h3 className="font-bold text-lg mb-2">Visit Hours</h3>
               <p className="text-slate-600 text-sm">Mon - Sat: 8:30 AM - 2:00 PM</p>
               <div className="text-xs text-slate-400 font-semibold mt-2">Sunday Closed</div>
            </Card>
         </div>

         <div className="grid lg:grid-cols-2 gap-8 h-[500px]">
            {/* Map - Updated query for Dausa address */}
            <div className="rounded-3xl overflow-hidden shadow-lg h-full border border-slate-200 relative">
                <iframe 
                  src="https://maps.google.com/maps?q=Durga+Mandir,+New+Mandi+Road,+Dausa,+Rajasthan&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="School Location"
                ></iframe>
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-xl shadow-lg flex items-start gap-2 max-w-xs">
                   <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                   <p className="text-sm text-slate-700 font-semibold">{SCHOOL_ADDRESS}</p>
                </div>
            </div>

            {/* Book a Visit Form */}
            <div className="bg-brand-pink/5 p-8 rounded-3xl flex flex-col justify-center">
               {submitted ? (
                 <div className="text-center py-8">
                   <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                     <CheckCircle2 className="w-8 h-8 text-green-500" />
                   </div>
                   <h3 className="text-2xl font-heading font-bold text-slate-800 mb-2">Visit Scheduled!</h3>
                   <p className="text-slate-600 mb-4">
                     Thank you! Our team will call you to confirm your visit.
                   </p>
                   {emailSent && formData.email && (
                     <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4">
                       <div className="flex items-center justify-center gap-2 text-blue-700 text-sm">
                         <Mail className="w-4 h-4" />
                         <span>Confirmation sent to <strong>{formData.email}</strong></span>
                       </div>
                     </div>
                   )}
                   <Button variant="outline" onClick={resetForm}>Schedule Another Visit</Button>
                 </div>
               ) : (
                 <>
                   <h3 className="text-2xl font-heading font-bold text-slate-800 mb-4">Schedule a Campus Tour</h3>
                   <p className="text-slate-600 mb-6">Can't decide? Come visit us! Experience our 'Learning Rooms' and 'Scribble Boards' firsthand.</p>
                   <form className="space-y-4" onSubmit={handleSubmit}>
                      <input 
                        type="text" 
                        name="parentName"
                        placeholder="Your Name *" 
                        required
                        value={formData.parentName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none" 
                      />
                      <input 
                        type="tel" 
                        name="phone"
                        placeholder="Phone Number *" 
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none" 
                      />
                      <input 
                        type="email" 
                        name="email"
                        placeholder="Email (for confirmation)" 
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none" 
                      />
                      <input 
                        type="text" 
                        name="childName"
                        placeholder="Child's Name" 
                        value={formData.childName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none" 
                      />
                      <select 
                        name="program"
                        value={formData.program}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none text-slate-500"
                      >
                        <option value="">Interested Program</option>
                        {PROGRAMS.map(p => (
                          <option key={p.id} value={p.title}>{p.title}</option>
                        ))}
                      </select>
                      <div className="grid grid-cols-2 gap-4">
                         <input 
                           type="date" 
                           name="visitDate"
                           required
                           value={formData.visitDate}
                           onChange={handleChange}
                           min={new Date().toISOString().split('T')[0]}
                           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none text-slate-500" 
                         />
                         <select 
                           name="visitTime"
                           value={formData.visitTime}
                           onChange={handleChange}
                           className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-pink focus:ring-1 focus:ring-brand-pink outline-none text-slate-500"
                         >
                            <option>Morning (9-11)</option>
                            <option>Mid-day (11-1)</option>
                         </select>
                      </div>
                      
                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                          {error}
                        </div>
                      )}
                      
                      <Button 
                        type="submit" 
                        variant="primary" 
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Booking...
                          </span>
                        ) : (
                          'Confirm Booking'
                        )}
                      </Button>
                   </form>
                 </>
               )}
            </div>
         </div>
      </Section>
    </>
  );
};

export default Contact;