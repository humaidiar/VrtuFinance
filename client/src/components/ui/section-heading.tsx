import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  center = false,
  className = '',
}) => {
  return (
    <div className={`mb-8 md:mb-12 ${center ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-gray-600 ${center ? 'max-w-3xl mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
