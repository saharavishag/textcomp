import React, { useEffect } from 'react';
import './AdComponent.css';

const AdComponent = () => {
  useEffect(() => {
    // Check if we're in development or production
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (isDevelopment) {
      console.log('AdComponent: Skipping ad in development mode');
      return;
    }

    // Function to safely load AdSense
    const loadAdSense = () => {
      try {
        // Check if adsbygoogle is already available
        if (window.adsbygoogle) {
          console.log('AdComponent: AdSense already loaded');
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          return;
        }

        // Create script element with proper attributes
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1410994805817879';
        script.async = true;
        script.defer = true;
        
        // Add error handling
        script.onerror = () => {
          console.log('AdComponent: Failed to load AdSense script');
        };

        // Add to head
        document.head.appendChild(script);

        // Wait for script to load and initialize
        script.onload = () => {
          console.log('AdComponent: AdSense script loaded');
          setTimeout(() => {
            try {
              if (window.adsbygoogle) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                console.log('AdComponent: Ad initialized successfully');
              }
            } catch (error) {
              console.log('AdComponent: Error initializing ad:', error);
            }
          }, 500);
        };

      } catch (error) {
        console.log('AdComponent: Error loading AdSense:', error);
      }
    };

    // Load AdSense with a small delay to ensure DOM is ready
    setTimeout(loadAdSense, 1000);

    return () => {
      // No cleanup needed - let browser handle script lifecycle
    };
  }, []);

  return (
    <div className="ad-container">
      <div className="ad-label">Advertisement</div>
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-1410994805817879"
        data-ad-slot="7367311901"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <div className="ad-fallback">
        <p>Ad loading...</p>
        <small>If you don't see an ad, it may be due to:</small>
        <ul>
          <li>Ad blocker or privacy settings</li>
          <li>Custom domain restrictions</li>
          <li>New AdSense account (1-2 weeks review period)</li>
          <li>Ad inventory not available</li>
        </ul>
      </div>
    </div>
  );
};

export default AdComponent; 