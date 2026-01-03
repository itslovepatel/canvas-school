import React from 'react';
import { Link } from 'react-router-dom';

export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}> = ({ children, variant = 'primary', className = '', to, onClick, type = 'button' }) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-pink text-white hover:bg-rose-400 focus:ring-rose-400 shadow-rose-200 hover:shadow-lg hover:-translate-y-0.5",
    secondary: "bg-brand-blue text-white hover:bg-sky-400 focus:ring-sky-400 shadow-sky-200 hover:shadow-lg hover:-translate-y-0.5",
    outline: "border-2 border-brand-pink text-brand-pink hover:bg-brand-pink hover:text-white focus:ring-brand-pink",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={combinedClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgColor?: string;
}> = ({ children, className = '', id, bgColor = 'bg-white' }) => {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${bgColor} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export const SectionHeading: React.FC<{
  title: string;
  subtitle?: string;
  center?: boolean;
}> = ({ title, subtitle, center = true }) => {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-800 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-blue">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1.5 w-24 rounded-full bg-brand-yellow ${center ? 'mx-auto' : ''}`}></div>
    </div>
  );
};

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}> = ({ children, className = '', hover = true }) => {
  return (
    <div className={`bg-white rounded-3xl p-6 md:p-8 ${hover ? 'hover:shadow-xl hover:-translate-y-1' : 'shadow-md'} transition-all duration-300 border border-slate-100 ${className}`}>
      {children}
    </div>
  );
};

export const Input: React.FC<{
  label: string;
  type?: string;
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  required?: boolean;
  textarea?: boolean;
  options?: string[];
}> = ({ label, type = "text", id, placeholder, value, onChange, required, textarea, options }) => {
  const baseClasses = "w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-colors bg-slate-50";
  
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          rows={4}
          className={baseClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      ) : options ? (
        <select
          id={id}
          className={baseClasses}
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="" disabled>Select an option</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          className={baseClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
        />
      )}
    </div>
  );
};
