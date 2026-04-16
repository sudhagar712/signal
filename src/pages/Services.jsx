import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 'led',
      title: 'Next-Gen LED Display Systems',
      desc: 'High-performance indoor and outdoor LED displays designed for clarity, brightness, and durability.',
      tags: ['Indoor', 'Outdoor', 'Custom Sizes', 'Installation', 'Maintenance'],
      link: '/services/led-display',
      isPrimary: true
    },
    {
      id: 'acp',
      title: 'ACP Elevation',
      desc: 'Modern exterior solutions that elevate your building’s visual identity with clean finishes and durable materials.',
      tags: ['Clean Finishes', 'Durable Materials', 'Custom Designs'],
    },
    {
      id: 'signage',
      title: 'Sign Boards & Signages',
      desc: 'Clear, bold, and built for visibility. Both outdoor and indoor directional systems.',
      tags: ['Outdoor Signs', 'Indoor Signs', 'Directional', 'Custom Branding'],
    },
    {
      id: 'nameboards',
      title: 'Name Boards',
      desc: 'Professional identity markers designed to reflect your brand with precision.',
      tags: ['Corporate', 'Retail', 'Premium Materials'],
    },
    {
      id: 'flex',
      title: 'Flex Printing',
      desc: 'High-quality prints for large-scale outdoor visibility and event promotions.',
      tags: ['Outdoor Flex', 'Event Banners', 'Promotional Displays'],
    },
    {
      id: 'print',
      title: 'Print Materials',
      desc: 'Designed to communicate. Printed to impress. High-quality marketing collateral.',
      tags: ['Pamphlets', 'Flyers', 'Brochures'],
    }
  ];

  return (
    <div className="bg-background min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-4xl mb-24">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Complete Visibility Solutions</h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            From digital displays to physical branding, we deliver end-to-end solutions that make your business stand out across every touchpoint.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div 
              key={service.id}
              className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 border
                ${service.isPrimary 
                  ? 'bg-signal-amber text-black border-signal-amber col-span-1 md:col-span-2 lg:col-span-2' 
                  : 'bg-white/5 border-white/5 hover:border-signal-amber/30 text-white'}`}
            >
              <div className="relative z-10 flex flex-col h-full">
                <h2 className="text-3xl font-display font-bold mb-4">{service.title}</h2>
                <p className={`text-lg mb-8 ${service.isPrimary ? 'text-black/80' : 'text-gray-400 font-light'}`}>
                  {service.desc}
                </p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`text-xs px-3 py-1 rounded-full border
                          ${service.isPrimary ? 'border-black/20 text-black/90' : 'border-white/10 text-gray-400'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {service.link ? (
                    <Link 
                      to={service.link}
                      className={`inline-flex items-center space-x-2 font-semibold group-hover:translate-x-2 transition-transform duration-300
                        ${service.isPrimary ? 'text-black' : 'text-signal-amber'}`}
                    >
                      <span>Explore Solution</span>
                      <ArrowRight size={18} />
                    </Link>
                  ) : (
                    <Link 
                      to="/contact"
                      className="inline-flex items-center space-x-2 font-semibold group-hover:translate-x-2 transition-transform duration-300 text-gray-400 hover:text-white"
                    >
                      <span>Request Quote</span>
                      <ArrowRight size={18} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
