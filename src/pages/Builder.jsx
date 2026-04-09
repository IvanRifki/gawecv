import React, { useRef } from 'react';
import FormSection from '../components/builder/FormSection';
import PreviewSection from '../components/builder/PreviewSection';
import html2pdf from 'html2pdf.js';
import { useCv } from '../context/CvContext';
import './Builder.css';

const Builder = () => {
  const cvRef = useRef(null);
  const { personalInfo, themeConfig } = useCv();

  const getExportFilename = (ext) => {
    const name = personalInfo?.fullName ? personalInfo.fullName.replace(/\s+/g, '_').toLowerCase() : 'nama';
    const position = personalInfo?.jobTitle ? personalInfo.jobTitle.replace(/\s+/g, '_').toLowerCase() : 'posisi';
    return `cv_${name}_${position}.${ext}`;
  };

  const handleDownloadPDF = async () => {
    const element = cvRef.current;
    if (!element) return;
    
    // Temporarily add class to remove any scaling that might ruin the PDF dimensions
    element.classList.add('exporting');
    
    // Tiny delay to allow CSS rules to apply on the real DOM before printing
    await new Promise(resolve => setTimeout(resolve, 100));

    const opt = {
      margin:       [0, 0, -5, 0], // Slight negative bottom margin ensures no extra blank page
      filename:     getExportFilename('pdf'),
      image:        { type: 'jpeg', quality: 1.0 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save().then(() => {
      element.classList.remove('exporting');
    }).catch((err) => {
      console.error(err);
      element.classList.remove('exporting');
    });
  };

  const handleDownloadWord = () => {
    const element = cvRef.current;
    if (!element) return;
    
    // Clone to manipulate the DOM for Word compatibility (Tables instead of Flexbox)
    const clone = element.cloneNode(true);
    
    // Fix layout for internal timelines (Creative and ATS) to use Tables over Flexbox
    const timelines = clone.querySelectorAll('.cr-timeline-item, .ats-item');
    timelines.forEach(item => {
      if (item.classList.contains('cr-timeline-item')) {
        const date = item.querySelector('.cr-timeline-date');
        const content = item.querySelector('.cr-timeline-content');
        if (!date || !content) return;
        
        const t = document.createElement('table');
        t.setAttribute('width', '100%');
        const row = document.createElement('tr');
        const tdLeft = document.createElement('td');
        tdLeft.setAttribute('width', '130');
        tdLeft.setAttribute('valign', 'top');
        tdLeft.style.paddingRight = '15px';
        const tdRight = document.createElement('td');
        tdRight.setAttribute('valign', 'top');
        
        while(date.firstChild) tdLeft.appendChild(date.firstChild);
        while(content.firstChild) tdRight.appendChild(content.firstChild);
        
        row.appendChild(tdLeft);
        row.appendChild(tdRight);
        t.appendChild(row);
        item.innerHTML = '';
        item.appendChild(t);
      } else if (item.classList.contains('ats-item')) {
        const header = item.querySelector('.ats-item-header');
        if (!header) return;
        const strong = header.querySelector('strong');
        const span = header.querySelector('span');
        if (!strong || !span) return;
        
        const t = document.createElement('table');
        t.setAttribute('width', '100%');
        t.style.marginBottom = '5px';
        const row = document.createElement('tr');
        const tdLeft = document.createElement('td');
        tdLeft.setAttribute('align', 'left');
        const tdRight = document.createElement('td');
        tdRight.setAttribute('align', 'right');
        
        while(strong.firstChild) tdLeft.appendChild(strong.firstChild);
        while(span.firstChild) tdRight.appendChild(span.firstChild);
        strong.appendChild(tdLeft);
        
        row.appendChild(tdLeft);
        row.appendChild(tdRight);
        t.appendChild(row);
        header.innerHTML = '';
        header.appendChild(t);
      }
    });
    
    // Fix layout for Creative Template
    const creativeTemplate = clone.querySelector('.creative-template');
    if (creativeTemplate) {
      const sidebar = creativeTemplate.querySelector('.cr-sidebar');
      const main = creativeTemplate.querySelector('.cr-main');
      
      const table = document.createElement('table');
      table.setAttribute('width', '100%');
      table.setAttribute('cellpadding', '0');
      table.setAttribute('cellspacing', '0');
      table.style.backgroundColor = '#ffffff';
      table.style.width = '100%';
      
      const tr = document.createElement('tr');
      const tdLeft = document.createElement('td');
      tdLeft.setAttribute('width', '30%');
      tdLeft.setAttribute('valign', 'top');
      tdLeft.style.backgroundColor = themeConfig?.themeColor || '#2b3a4a';
      tdLeft.style.color = '#ffffff';
      tdLeft.style.padding = '20px';
      
      const tdRight = document.createElement('td');
      tdRight.setAttribute('width', '70%');
      tdRight.setAttribute('valign', 'top');
      tdRight.style.padding = '30px';
      
      // Move node children
      while(sidebar && sidebar.firstChild) tdLeft.appendChild(sidebar.firstChild);
      while(main && main.firstChild) tdRight.appendChild(main.firstChild);
      
      tr.appendChild(tdLeft);
      tr.appendChild(tdRight);
      table.appendChild(tr);
      
      // Clear and append
      creativeTemplate.innerHTML = '';
      creativeTemplate.appendChild(table);
      
      // Word text alignment fix for avatar
      const avatarText = tdLeft.querySelector('.cr-avatar-text');
      if(avatarText) {
         avatarText.style.textAlign = 'center';
      }
    }
    
    const htmlSnippet = clone.innerHTML;
    
    const avatarRadius = themeConfig?.avatarShape === 'square' ? '8px' : themeConfig?.avatarShape === 'rounded' ? '20px' : '50%';

    const style = `
      <style>
        body { font-family: 'Arial', sans-serif; color: #333; }
        .cr-name { font-size: 24pt; font-weight: bold; color: ${themeConfig?.themeColor || '#2b3a4a'}; }
        .cr-jobtitle { font-size: 14pt; color: ${themeConfig?.accentColor || '#4cd137'}; }
        .cr-section-title { font-size: 16pt; font-weight: bold; border-bottom: 1px solid #ccc; margin-top: 20px; margin-bottom: 10px; color: ${themeConfig?.themeColor || '#2b3a4a'}; }
        .ats-name { font-size: 24pt; font-weight: bold; text-align: center; }
        .ats-section-title { font-size: 14pt; font-weight: bold; border-bottom: 1px solid #000; margin-top: 15px; margin-bottom: 10px; }
        .ats-header { text-align: center; margin-bottom: 20px; }
        img.cr-avatar-img { width: 120px; height: 120px; border-radius: ${avatarRadius}; object-fit: cover; }
        div.cr-avatar-text { border-radius: ${avatarRadius}; }
        h1, h2, h3, h4, h5, h6 { margin-bottom: 5px; margin-top: 5px; }
        p { margin-bottom: 10px; }
      </style>
    `;
    
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
      "xmlns:w='urn:schemas-microsoft-com:office:word' "+
      "xmlns='http://www.w3.org/TR/REC-html40'>"+
      "<head><meta charset='utf-8'><title>GaweCV Resume</title>"+
      style +
      "</head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + htmlSnippet + footer;
    
    // Generate doc blob
    const blob = new Blob(['\ufeff', sourceHTML], {
      type: 'application/msword;charset=utf-8'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    document.body.appendChild(link);
    link.href = url;
    
    // Explicitly set the extension to .doc
    link.download = getExportFilename('doc');
    link.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <div className="builder-container animate-fade-in">
      <div className="builder-sidebar">
        <FormSection />
      </div>
      <div className="builder-main">
        <div className="builder-toolbar glass">
          <div className="toolbar-left">
            <span className="toolbar-title">Preview CV</span>
          </div>
          <div className="toolbar-right">
            {/* <button className="btn btn-outline" onClick={handleDownloadWord}>
              Download Word
            </button> */}
            <button className="btn btn-primary" onClick={handleDownloadPDF}>
              Download PDF
            </button>
          </div>
        </div>
        <div className="preview-scroll-area">
          <div className="preview-canvas" ref={cvRef}>
            <PreviewSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
