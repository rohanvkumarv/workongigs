'use client';  // This is important for Next.js 13+

import { useEffect } from 'react';

// This component can be imported and used only on the page you want to protect
const DevToolsBlocker = () => {
  useEffect(() => {
    // 1. Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    
    // 2. Prevent keyboard shortcuts 
    const handleKeyDown = (e) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        e.keyCode === 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.ctrlKey && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
        (e.ctrlKey && e.keyCode === 85) // Ctrl+U
      ) {
        e.preventDefault();
        return false;
      }
    };
    
    // 3. Detect when DevTools is opened
    const detectDevTools = () => {
      const threshold = 160;
      const devtools = {
        isOpen: false,
        orientation: undefined
      };

      const checkDevTools = () => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';

        if (widthThreshold || heightThreshold) {
          if (!devtools.isOpen || devtools.orientation !== orientation) {
            devtools.isOpen = true;
            devtools.orientation = orientation;
            // Optional: Take action when DevTools is opened
            document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;font-family:sans-serif;font-size:2rem;color:#444;padding:2rem;text-align:center;">This content is protected. Please close developer tools to continue viewing.</div>';
          }
        } else {
          if (devtools.isOpen) {
            devtools.isOpen = false;
            devtools.orientation = undefined;
            window.location.reload(); // Reload when DevTools is closed
          }
        }
      };

      // Check frequently
      setInterval(checkDevTools, 1000);
    };
    
    // FIXED: Define preventDrag outside of preventSelection so it's available in cleanup
    const preventDrag = (e) => {
      e.preventDefault();
    };
    
    // 4. Prevent selection and dragging of content
    const preventSelection = () => {
      document.body.style.userSelect = 'none';
      document.body.style.webkitUserSelect = 'none';
      document.body.style.msUserSelect = 'none';
      document.body.style.mozUserSelect = 'none';
      
      // Prevent dragging of images and videos
      document.querySelectorAll('img, video').forEach(el => {
        el.addEventListener('dragstart', preventDrag);
      });
    };
    
    // Apply all protections
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);
    detectDevTools();
    preventSelection();
    
    // Cleanup event listeners when component unmounts
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
      document.body.style.msUserSelect = '';
      document.body.style.mozUserSelect = '';
      document.querySelectorAll('img, video').forEach(el => {
        el.removeEventListener('dragstart', preventDrag);
      });
    };
  }, []);
  
  return null; // This component doesn't render anything
};

export default DevToolsBlocker;