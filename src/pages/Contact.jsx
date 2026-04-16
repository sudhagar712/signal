import { useState } from 'react';
import { Send } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({ state: 'idle', msg: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState({ state: 'loading', msg: '' });
    // Simulate send
    setTimeout(() => {
      setFormState({ state: 'success', msg: 'Message sent successfully. We will be in touch.' });
    }, 1500);
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-20 relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial from-signal-amber/5 to-transparent opacity-50 z-0 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mb-20">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Let’s Build Your <span className="text-signal-amber">Visibility</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light">
            Tell us what you need. We’ll make it stand out.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-signal-amber transition-colors" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Phone</label>
                  <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-signal-amber transition-colors" placeholder="+91 98765 43210" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Email</label>
                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-signal-amber transition-colors" placeholder="john@company.com" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Requirement Type</label>
                <select required className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-signal-amber transition-colors appearance-none">
                  <option value="" disabled selected>Select a solution</option>
                  <option value="led">LED Displays</option>
                  <option value="acp">ACP Elevation</option>
                  <option value="signage">Sign Boards & Signages</option>
                  <option value="print">Flex & Print</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 uppercase tracking-wide">Message</label>
                <textarea required rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-signal-amber transition-colors resize-none" placeholder="Tell us about your project..."></textarea>
              </div>

              <button 
                disabled={formState.state === 'loading'}
                type="submit" 
                className="w-full flex items-center justify-center space-x-2 bg-signal-amber text-black font-semibold rounded-xl px-6 py-4 hover:bg-white transition-colors duration-300 disabled:opacity-50"
              >
                <span>{formState.state === 'loading' ? 'Sending...' : 'Submit Request'}</span>
                {!formState.state && <Send size={18} />}
              </button>

              {formState.msg && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 rounded-xl mt-4">
                  {formState.msg}
                </div>
              )}
            </form>
          </div>

          {/* Contact Details & Process */}
          <div className="space-y-16">
            <div>
              <h3 className="text-2xl font-display font-medium mb-6 border-b border-white/10 pb-4">Contact Info</h3>
              <ul className="space-y-6 text-gray-300 font-light">
                <li className="flex flex-col">
                  <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Phone</span>
                  <span className="text-xl">+91 98765 43210</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Email</span>
                  <span className="text-xl">hello@signalvisibility.com</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Location</span>
                  <span className="text-xl">123 Visibility District,<br/>Tech Park Avenue, 400001</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
              <h3 className="text-xl font-display font-medium mb-6 text-signal-amber">What Happens Next</h3>
              <p className="text-sm text-gray-400 mb-6 border-b border-white/10 pb-6">Once you reach out, our team will:</p>
              <ul className="space-y-4 text-white text-sm">
                <li className="flex items-center"><span className="w-6 text-signal-amber font-mono text-xs">01</span> Understand your requirement</li>
                <li className="flex items-center"><span className="w-6 text-signal-amber font-mono text-xs">02</span> Recommend the right solution</li>
                <li className="flex items-center"><span className="w-6 text-signal-amber font-mono text-xs">03</span> Share a clear quote</li>
                <li className="flex items-center"><span className="w-6 text-signal-amber font-mono text-xs">04</span> Plan execution timelines</li>
              </ul>
              <p className="mt-8 font-medium italic text-gray-400 border-t border-white/10 pt-6">No delays. No confusion. <span className="text-white">Just clear action.</span></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
