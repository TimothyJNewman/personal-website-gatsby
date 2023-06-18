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
  tags,
}) => (
  <div className="rounded bg-primary-lighter shadow-md hover:shadow col-span-1">
    <Link to={link} className="grid grid-cols-3 h-full">
      <div className={`flex flex-col justify-between p-4 ${img === undefined ? 'col-span-3' : 'col-span-2'}`}>
        <div>
          <h3 className='font-semibold'>{title}</h3>
          <p className="text-sm italic text-dategray">{date}</p>
          <p>{description}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <Link className="tag-button" to={`/tag/${tag}`}>
              {tag}
            </Link>
          ))}
        </div>
      </div>
      {img !== undefined && (
        <GatsbyImage className="rounded-r col-span-1" image={getImage(img)} alt={alt} />
      )}
    </Link>
  </div>
);

export default Card;
