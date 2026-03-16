import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';

const ArticleCard = ({
  img,
  alt = '',
  title,
  date,
  link,
  description,
  tags,
}) => (
  <div className="border-b border-primary py-4 col-span-1 flex gap-4 items-stretch">
    <div className="flex-1 min-w-0">
      <Link to={link}>
        <h3 className="font-semibold not-italic">{title}</h3>
        <p className="text-sm italic text-dategray">{date}</p>
        <p className="mt-1">{description}</p>
      </Link>
      {tags && (
        <div className="flex flex-wrap gap-1 mt-2">
          {tags.map((tag) => (
            <Link className="tag-button" to={`/tag/${tag}`} key={tag}>
              {tag}
            </Link>
          ))}
        </div>
      )}
    </div>
    {img !== undefined && (
      <Link to={link} className="w-48 shrink-0 relative self-stretch overflow-hidden">
        <GatsbyImage className="h-full w-full" image={getImage(img)} alt={alt} />
      </Link>
    )}
  </div>
);

export default ArticleCard;
