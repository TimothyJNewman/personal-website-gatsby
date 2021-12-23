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
  <div className="bg-primary-lighter shadow-md rounded">
    {img !== undefined && <Link to={link}><GatsbyImage className="rounded-t" image={getImage(img)} alt={alt} /></Link>}
    <div className="px-4 py-5 pt-3 min-h-full justify-between flex flex-col">
      <Link className="" to={link}>
        <h3 className="">{title}</h3>
        <p className="italic text-dategray text-sm">{date}</p>
        <p className="">{description}</p>
      </Link>
      <div className="mt-4">
        {tag1 ? <Link className="text-sm mr-1 p-1 hover:bg-transparent focus:bg-transparent border-2 border-transparent hover:border-primary-dark focus:border-primary-dark text-std-secondary bg-primary-dark rounded" to={`/tag/${tag1}`}>{tag1}</Link> : ''}
        {tag2 ? <Link className="text-sm mr-1 p-1 hover:bg-transparent focus:bg-transparent border-2 border-transparent hover:border-primary-dark focus:border-primary-dark text-std-secondary bg-primary-dark rounded" to={`/tag/${tag2}`}>{tag2}</Link> : ''}
        {tag3 ? <Link className="text-sm mr-1 p-1 hover:bg-transparent focus:bg-transparent border-2 border-transparent hover:border-primary-dark focus:border-primary-dark text-std-secondary bg-primary-dark rounded" to={`/tag/${tag3}`}>{tag3}</Link> : ''}
      </div>
    </div>
  </div>
);

export default Card;
