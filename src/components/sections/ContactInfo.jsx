import React from 'react';

export default function ContactInfo() {
  return (
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
  );
}
