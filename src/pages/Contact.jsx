import React from 'react';
import PageBanner from '../components/sections/PageBanner';
import useSEO from '../hooks/useSEO';
import ContactInfo from '../components/sections/ContactInfo';
import ContactForm from '../components/sections/ContactForm';

export default function Contact() {
  useSEO({
    title: 'Contact Us',
    description: 'Get in touch with Signal Visibility. Request a quote or book a strategic consultation for premium digital displays and aesthetic signages.',
    keywords: 'Contact, Quote, Strategy, LED Purchase, Customer Support, Signal Visibility Contact'
  });

  return (
    <div className="bg-[#050505] min-h-screen pb-20 relative selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* Checked Grid Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] [background-size:60px_60px]"></div>
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-blue-600/5 blur-[140px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-blue-500/5 blur-[120px] rounded-full"></div>
      </div>

      <PageBanner 
        badge="Get In Touch"
        title="Contact Us"
        subtitle="Tell us what you need. We’ll make it stand out. Discuss your project requirements with our engineering team."
      />
      
      <div className="container mx-auto px-6 md:px-30 relative z-10 pt-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
       
            <div className="order-2 md:order-1">
              {/* Contact Details & Process */}
           <ContactInfo />
            </div>
           
           <div className="order-1 md:order-2">
             {/* Form */}
          <ContactForm />
           </div>

        </div>
      </div>
    </div>
  );
}
