import React from 'react';
import { useCv } from '../../context/CvContext';
import AtsTemplate from '../templates/AtsTemplate';
import CreativeTemplate from '../templates/CreativeTemplate';

const PreviewSection = () => {
  const { template } = useCv();

  return (
    <div className="cv-preview-content">
      {template === 'ats' ? <AtsTemplate /> : <CreativeTemplate />}
    </div>
  );
};

export default PreviewSection;
