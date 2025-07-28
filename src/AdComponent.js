import React, { useEffect } from 'react';
import './AdComponent.css';

const AdComponent = () => {
  useEffect(() => {
    console.log('AdComponent: Starting ad initialization...');
    
    // Function to load AdSense script
    const loadAdSenseScript = () => {
      return new Promise((resolve, reject) => {
        // Check if script already exists
        const existingScript = document.querySelector('script[src*="googlesyndication"]');
        if (existingScript) {
          console.log('AdComponent: AdSense script already loaded');
          resolve();
          return;
        }

        // Create script element
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1410994805817879';
        script.async = true;
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          console.log('AdComponent: AdSense script loaded successfully');
          resolve();
        };
        
        script.onerror = () => {
          console.log('AdComponent: Failed to load AdSense script');
          reject(new Error('Failed to load AdSense script'));
        };
        
        // Append to head
        document.head.appendChild(script);
        console.log('AdComponent: AdSense script added to head');
      });
    };

    // Load script and then initialize ad
    loadAdSenseScript()
      .then(() => {
        // Wait a bit for script to initialize
        setTimeout(() => {
          try {
            if (window.adsbygoogle) {
              (window.adsbygoogle = window.adsbygoogle || []).push({});
              console.log('AdComponent: Ad pushed to queue successfully');
            } else {
              console.log('AdComponent: adsbygoogle not available');
            }
          } catch (error) {
            console.log('AdComponent: Error pushing ad:', error);
          }
        }, 100);
      })
      .catch((error) => {
        console.log('AdComponent: Script loading failed:', error);
      });

    return () => {
      // Cleanup is handled automatically by browser
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
          <li>New AdSense account (1-2 weeks review period)</li>
          <li>Ad inventory not available</li>
        </ul>
      </div>
    </div>
  );
};

export default AdComponent; 