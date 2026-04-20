import { useEffect } from 'react';

export default function useSEO({ title, description, keywords }) {
  useEffect(() => {
    // 1. Set Page Title dynamically
    const baseTitle = 'Signal Visibility';
    document.title = title ? `${title} | ${baseTitle}` : `${baseTitle} | Premium LED Display Solutions`;
    
    // 2. Set Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = description || 'Signal Visibility provides premium LED display systems, smart signages, exact ACP elevation, and high-visibility branding solutions globally.';

    // 3. Set Meta Keywords (Optional but good practice)
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.content = keywords;
    }

    // 4. Force unique ID attributes parsing validation check logic (no action needed, purely semantic config)
  }, [title, description, keywords]);
}
