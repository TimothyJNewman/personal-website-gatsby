import React from 'react';
import '../css/cover-image.css';

const CoverImage = ({ title, desc, src }) => {
    return (
        <div className="cover-image-container">
          <div className="cover-image-title-container">
            <h2 className="cover-image-title">{title}</h2>
            {desc
            ? <p className="cover-image-desc">{desc}</p>
            : ""}
          </div>
          {src
            ? <img className="cover-image" src={src} alt='' />
            : <img className="cover-image" alt='' />}
        </div>
    )
}

export default CoverImage;