import React, { useState } from 'react';
import { Section, SectionHeading, Card, Button, Input } from '../components/ui';
import { FileText, Calendar, UserCheck, CheckCircle2, Mail, Loader2 } from 'lucide-react';
import { PROGRAMS, SCHOOL_PHONE } from '../constants';
import { submitAdmissionInquiry, isValidEmail, type AdmissionInquiryData } from '../services/formService';

const Admissions: React.FC = () => {
  const [formData, setFormData] = useState({
    parentName: '',
    childName: '',
    childAge: '',
    phone: '',
    email: '',
    program: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState('');

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
      const submissionData: AdmissionInquiryData = {
        parentName: formData.parentName,
        phone: formData.phone,
        email: formData.email || undefined,
        childName: formData.childName,
        childAge: formData.childAge,
        program: formData.program,
        message: formData.message || undefined
      };

      const result = await submitAdmissionInquiry(submissionData);

      if (result.status === 'success') {
        setSubmitted(true);
        setEmailSent(result.emailSent || false);
      } else if (result.status === 'duplicate') {
        setError('This inquiry was already submitted. Our team will contact you soon.');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  if (submitted) {
     return (
        <Section className="min-h-[60vh] flex items-center justify-center text-center">
           <div className="max-w-md mx-auto p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-3xl font-heading font-bold text-slate-800 mb-4">Thank You!</h2>
              <p className="text-slate-600 mb-4">
                 We have received your inquiry for <strong>{formData.childName}</strong>. Our admissions team will contact you shortly to schedule a visit.
              </p>
              
              {emailSent && formData.email && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-center gap-2 text-blue-700">
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">Confirmation email sent to:</span>
                  </div>
                  <p className="text-blue-600 font-semibold mt-1">{formData.email}</p>
                  <p className="text-blue-500 text-sm mt-2">Please check your inbox (and spam folder)</p>
                </div>
              )}
              
              <Button onClick={() => {
                setSubmitted(false);
                setFormData({
                  parentName: '',
                  childName: '',
                  childAge: '',
                  phone: '',
                  email: '',
                  program: '',
                  message: ''
                });
              }} variant="outline">Submit Another Inquiry</Button>
           </div>
        </Section>
     )
  }

  return (
    <>
      {/* Process Steps */}
      <Section bgColor="bg-sky-50">
        <SectionHeading title="Admission Process" subtitle="Joining the Little Steps family is simple and transparent." />
        <div className="relative">
           {/* Connecting Line (Desktop) */}
           <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
           
           <div className="grid md:grid-cols-4 gap-8 relative z-10">
              {[
                { icon: <FileText className="w-6 h-6" />, title: "Inquiry", text: "Fill the online form or call us." },
                { icon: <Calendar className="w-6 h-6" />, title: "School Visit", text: "Tour our campus and meet teachers." },
                { icon: <UserCheck className="w-6 h-6" />, title: "Interaction", text: "Friendly chat with the child." },
                { icon: <CheckCircle2 className="w-6 h-6" />, title: "Enrollment", text: "Submit documents & fees." },
              ].map((step, i) => (
                 <div key={i} className="bg-white p-6 rounded-2xl shadow-md text-center border-b-4 border-b-brand-blue">
                    <div className="w-12 h-12 bg-brand-blue text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                       {i + 1}
                    </div>
                    <h3 className="font-bold text-slate-800 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500">{step.text}</p>
                 </div>
              ))}
           </div>
        </div>
      </Section>

      {/* Docs & Form */}
      <Section>
         <div className="grid lg:grid-cols-2 gap-16">
            <div>
               <h3 className="text-2xl font-heading font-bold text-slate-800 mb-6">Documents Required</h3>
               <Card className="mb-8">
                  <ul className="space-y-4">
                     {[
                        "Birth Certificate of the child (Copy)",
                        "Aadhar Card of Parents & Child (Copy)",
                        "Passport size photos of Child (4)",
                        "Passport size photos of Parents (2 each)",
                        "Immunization Record / Medical Fitness Certificate",
                        "Previous School Report Card (for KG)"
                     ].map((doc, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-600">
                           <div className="w-5 h-5 rounded-full bg-brand-pink/20 text-brand-pink flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">{i + 1}</div>
                           {doc}
                        </li>
                     ))}
                  </ul>
               </Card>
               <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 mb-2">Note for Parents</h4>
                  <p className="text-sm text-yellow-700">
                     Age criteria is strictly followed as per government norms. Please ensure all documents are ready at the time of admission to secure the seat.
                  </p>
               </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
               <h3 className="text-2xl font-heading font-bold text-slate-800 mb-2">Admission Inquiry Form</h3>
               <p className="text-slate-500 mb-6 text-sm">Fill this form to express interest or schedule a visit.</p>
               
               <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                     <Input 
                        id="parentName" label="Parent's Name" required 
                        value={formData.parentName} onChange={handleChange} 
                     />
                     <Input 
                        id="phone" label="Phone Number" required type="tel" placeholder="+91"
                        value={formData.phone} onChange={handleChange} 
                     />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                     <Input 
                        id="childName" label="Child's Name" required 
                        value={formData.childName} onChange={handleChange} 
                     />
                     <Input 
                        id="childAge" label="Child's Age" required type="number" 
                        value={formData.childAge} onChange={handleChange} 
                     />
                  </div>
                  <Input 
                     id="email" label="Email Address (for confirmation)" type="email" 
                     value={formData.email} onChange={handleChange} 
                  />
                  <p className="text-xs text-slate-500 -mt-2 mb-4 ml-1">
                     📧 We'll send you a confirmation email with your inquiry details
                  </p>
                  <Input 
                     id="program" label="Interested Program" required options={PROGRAMS.map(p => p.title)}
                     value={formData.program} onChange={handleChange} 
                  />
                  <Input 
                     id="message" label="Any Specific Queries?" textarea 
                     value={formData.message} onChange={handleChange} 
                  />
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm">
                      {error}
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    variant="primary" 
                    className="w-full mt-2"
                    disabled={isSubmitting}
                  >
                     {isSubmitting ? (
                       <span className="flex items-center justify-center gap-2">
                         <Loader2 className="w-5 h-5 animate-spin" />
                         Submitting...
                       </span>
                     ) : (
                       'Submit Inquiry'
                     )}
                  </Button>
               </form>
            </div>
         </div>
      </Section>
    </>
  );
};

export default Admissions;
