import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

const Card = ({
  img,
  alt = '',
  title,
  date,
  link,
  description,
  tag1,
  tag2,
  tag3,
}) => (
  <div className="rounded bg-primary-lighter shadow-md hover:shadow">
    <div className="flex min-h-full flex-col justify-between">
      <Link to={link} className="flex-grow">
        {img !== undefined && (
          <GatsbyImage className="rounded-t" image={getImage(img)} alt={alt} />
        )}
        <div className="p-4">
          <h3 className='font-semibold'>{title}</h3>
          <p className="text-sm italic text-dategray">{date}</p>
          <p>{description}</p>
        </div>
      </Link>
      <div className="flex flex-wrap p-4 pt-0">
        {tag1 ? (
          <Link className="tag-button" to={`/tag/${tag1}`}>
            {tag1}
          </Link>
        ) : (
          ''
        )}
        {tag2 ? (
          <Link className="tag-button" to={`/tag/${tag2}`}>
            {tag2}
          </Link>
        ) : (
          ''
        )}
        {tag3 ? (
          <Link className="tag-button" to={`/tag/${tag3}`}>
            {tag3}
          </Link>
        ) : (
          ''
        )}
      </div>
    </div>
  </div>
);

export default Card;
