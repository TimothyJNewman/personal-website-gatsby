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
        await navigator
          .share(shareDetails)
          .then(() => console.log('Hooray! Your content was shared to tha world'));
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        'Web share is currently not supported on this browser. Please provide a callback'
      );
      window.alert('Web Share is not supported in your browser. Please try copying the URL.')
    }
  };
  return (
    <button className="py-0.5 px-2 border-2 border-primary-dark rounded article-share-button" type="button" onClick={handleSharing}>
      {label}
    </button>
  );
}