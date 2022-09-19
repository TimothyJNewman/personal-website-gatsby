/*
 * Credit: Peter Mbanugo
 * Source: https://www.telerik.com/blogs/using-web-share-api-react
 */
import React from 'react';
import { useLocation } from '@reach/router';

export default function Share({ label, text, title }) {
  const url = useLocation().href;
  const shareDetails = { url, title, text };

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareDetails);
      } catch (error) {
        console.error(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.error('Web share is currently not supported on this browser');
      window.alert(
        'Web Share is not supported in your browser. Please try copying the URL.'
      );
    }
  };
  return (
    <button
      className="article-share-button rounded border-2 border-primary-dark py-0.5 px-2 text-sm sm:text-base"
      type="button"
      onClick={handleSharing}
    >
      {label}
    </button>
  );
}
