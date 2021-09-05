import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const CoverImage = ({
  title,
  desc,
  img,
  alt = '',
}) => (
  <div className="cover-image-container">
    <div className="cover-image-title-container">
      <h2 className="cover-image-title">{title}</h2>
      {desc
        ? <p className="cover-image-desc">{desc}</p>
        : ''}
    </div>
    {img
      ? <GatsbyImage className="cover-image" image={getImage(img)} alt={alt} />
      : ''}
  </div>
);

export default CoverImage;
