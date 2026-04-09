import React from 'react';
import { useCv } from '../../context/CvContext';
import './AtsTemplate.css';

const AtsTemplate = () => {
  const { personalInfo, summary, experience, education, skills } = useCv();

  return (
    <div className="ats-template">
      <header className="ats-header">
        <h1 className="ats-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="ats-contact">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span> • {personalInfo.phone}</span>}
          {personalInfo.address && <span> • {personalInfo.address}</span>}
          {personalInfo.linkedIn && <span> • {personalInfo.linkedIn}</span>}
          {personalInfo.portfolio && <span> • {personalInfo.portfolio}</span>}
        </div>
      </header>

      {summary && (
        <section className="ats-section">
          <h2 className="ats-section-title">PROFESSIONAL SUMMARY</h2>
          <p className="ats-text">{summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">WORK EXPERIENCE</h2>
          {experience.map(exp => (
            <div key={exp.id} className="ats-item">
              <div className="ats-item-header">
                <strong>{exp.position}</strong>
                <span>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div className="ats-item-sub">
                <i>{exp.company}</i>
              </div>
              <p className="ats-text">{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">EDUCATION</h2>
          {education.map(edu => (
            <div key={edu.id} className="ats-item">
              <div className="ats-item-header">
                <strong>{edu.school}</strong>
                <span>{edu.startDate} - {edu.endDate}</span>
              </div>
              <div className="ats-item-sub">
                <i>{edu.degree}</i>
              </div>
              <p className="ats-text">{edu.description}</p>
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="ats-section">
          <h2 className="ats-section-title">SKILLS</h2>
          <p className="ats-text">{skills.join(', ')}</p>
        </section>
      )}
    </div>
  );
};

export default AtsTemplate;
