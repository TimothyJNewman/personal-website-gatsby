import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ExperienceCard = ({
  img,
  alt = '',
  title,
  date,
  company,
  description,
  location
}) => (
  <div className='rounded-lg p-1 to-50% bg-gradient-to-br from-[#a6432d] to-transparent'>
    <div className="rounded-lg bg-white  col-span-1">
      <div className={`flex flex-col justify-between p-4`}>
        <div className='grid grid-cols-3'>
          <div className='col-span-2'>
            <h3 className='font-semibold'>{title}</h3>
            <h4 className='font-semibold'>{company}</h4>
            <h4 className='font-semibold'>{location}</h4>
            <p className="text-sm italic text-dategray">{date}</p>
          </div>
          <div>
            <img className="w-full col-span-1" src={img} alt={alt} />
          </div>
        </div>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

export default ExperienceCard;
