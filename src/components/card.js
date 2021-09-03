import '../css/card.css';
import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

const Card = ({
  img,
  alt = '',
  title,
  date,
  description,
  tag1,
  tag2,
  tag3,
}) => (
  <>
    <div className="card">
      {img !== undefined && <GatsbyImage className="card-image" image={getImage(img)} alt={alt} />}
      <div className="card-contents">
        <div>
          <h3 className="card-heading">{title}</h3>
          <p className="card-date">
            {date}
          </p>
          <p className="card-body">
            {description}
          </p>
        </div>
        <div className="card-tag-container">
          {tag1 ? <Link className="card-tag-link" to={`/tag/${tag1}`}>{tag1}</Link> : ''}
          {tag2 ? <Link className="card-tag-link" to={`/tag/${tag2}`}>{tag2}</Link> : ''}
          {tag3 ? <Link className="card-tag-link" to={`/tag/${tag3}`}>{tag3}</Link> : ''}
        </div>
      </div>
    </div>
  </>
);

export default Card;
