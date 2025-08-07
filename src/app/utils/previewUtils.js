// utils/previewUtils.js
// Utility functions for generating and managing delivery preview URLs

/**
 * Generate a preview URL for a delivery
 * @param {string} clientId - The client ID
 * @param {string} deliveryName - The delivery name
 * @returns {string} - The complete preview URL
 */
export const generatePreviewUrl = (clientId, deliveryName) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    return `${baseUrl}/${clientId}/preview?delivery=${encodeURIComponent(deliveryName)}`;
  };
  
  /**
   * Copy preview URL to clipboard with optional success callback
   * @param {string} clientId - The client ID
   * @param {string} deliveryName - The delivery name
   * @param {function} onSuccess - Optional callback function on successful copy
   * @param {function} onError - Optional callback function on error
   * @returns {Promise<boolean>} - Whether the copy was successful
   */
  export const copyPreviewUrl = async (clientId, deliveryName, onSuccess, onError) => {
    try {
      const url = generatePreviewUrl(clientId, deliveryName);
      await navigator.clipboard.writeText(url);
      
      if (onSuccess) onSuccess();
      return true;
    } catch (error) {
      console.error('Failed to copy preview URL:', error);
      if (onError) onError(error);
      return false;
    }
  };
  
  /**
   * Open preview URL in a new tab
   * @param {string} clientId - The client ID
   * @param {string} deliveryName - The delivery name
   */
  export const openPreviewUrl = (clientId, deliveryName) => {
    const url = generatePreviewUrl(clientId, deliveryName);
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  /**
   * Share preview URL using Web Share API (if available) or fallback to clipboard
   * @param {string} clientId - The client ID
   * @param {string} deliveryName - The delivery name
   * @param {string} title - Optional title for sharing
   * @returns {Promise<boolean>} - Whether the share was successful
   */
  export const sharePreviewUrl = async (clientId, deliveryName, title = 'Delivery Preview') => {
    const url = generatePreviewUrl(clientId, deliveryName);
    
    // Check if Web Share API is available
    if (navigator.share && navigator.canShare) {
      try {
        await navigator.share({
          title: title,
          text: `Check out this delivery: ${deliveryName}`,
          url: url
        });
        return true;
      } catch (error) {
        if (error.name === 'AbortError') {
          // User cancelled sharing
          return false;
        }
        console.error('Error sharing:', error);
      }
    }
    
    // Fallback to clipboard copy
    return await copyPreviewUrl(clientId, deliveryName);
  };
  
  /**
   * Validate if a preview URL is properly formatted
   * @param {string} url - The URL to validate
   * @returns {boolean} - Whether the URL is a valid preview URL
   */
  export const isValidPreviewUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      
      // Check if URL has the expected structure: /clientId/preview
      if (pathParts.length >= 3 && pathParts[2] === 'preview') {
        // Check if delivery parameter exists
        return urlObj.searchParams.has('delivery');
      }
      
      return false;
    } catch (error) {
      return false;
    }
  };
  
  /**
   * Extract client ID and delivery name from a preview URL
   * @param {string} url - The preview URL
   * @returns {object|null} - Object with clientId and deliveryName, or null if invalid
   */
  export const parsePreviewUrl = (url) => {
    try {
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split('/');
      
      if (pathParts.length >= 3 && pathParts[2] === 'preview') {
        const clientId = pathParts[1];
        const deliveryName = urlObj.searchParams.get('delivery');
        
        if (clientId && deliveryName) {
          return {
            clientId: decodeURIComponent(clientId),
            deliveryName: decodeURIComponent(deliveryName)
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing preview URL:', error);
      return null;
    }
  };