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
    <div className="bg-background min-h-screen pb-20 relative">
      <PageBanner 
        badge="Get In Touch"
        title="Contact Us"
        subtitle="Tell us what you need. We’ll make it stand out. Discuss your project requirements with our engineering team."
      />
      <div className="absolute top-[60vh] right-0 w-1/2 h-full bg-gradient-radial from-signal-amber/5 to-transparent opacity-50 z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-30 relative z-10 pt-24">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
       
            <div>
              {/* Contact Details & Process */}
           <ContactInfo />
            </div>
           
           <div>
             {/* Form */}
          <ContactForm />
           </div>

        </div>
      </div>
    </div>
  );
}
