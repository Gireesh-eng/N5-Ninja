import React, { useState, useEffect } from 'react';

const Logo = () => {
  const logos = ['愛', '天', '光', '和', '道'];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === logos.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-8 h-8 bg-gradient-to-br from-indigo to-sakura-dark rounded-lg flex items-center justify-center text-white font-bold text-lg transform rotate-12">
      {logos[currentIndex]}
    </div>
  );
};

export default Logo;