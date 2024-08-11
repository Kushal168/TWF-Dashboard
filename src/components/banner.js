import React from 'react';

const Banner = ({ banner, timeLeft }) => {
  if (!banner.isVisible) return null; // Don't render banner if it's not visible

  return (
    <div className="banner">
      <h1>{banner.description}</h1>
      <p>
        {timeLeft > 0 ? `Time left: ${timeLeft}s` : 'The banner has expired'}
      </p>
      {banner.link && (
        <a href={banner.link} target="_blank" rel="noopener noreferrer">
          {/* {banner.link} */}
          Learn more
        </a>
      )}
    </div>
  );
};

export default Banner;
