import React, { useState, useRef, useEffect } from 'react';

const useDropdown = () => {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // console.log(dropdownRef.current);

  const toggleDropdown = () => {
    setIsOpened(prev => !prev);
  };

  const handleDocumentClick = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleDocumentClick);
    return () => {
      document.removeEventListener('mousedown', handleDocumentClick);
    };
  }, []);

  return { isOpened, toggleDropdown, dropdownRef };
};

export default useDropdown;
