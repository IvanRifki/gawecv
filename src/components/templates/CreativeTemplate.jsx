import React from 'react';
import { useCv } from '../../context/CvContext';
import './CreativeTemplate.css';

const CreativeTemplate = () => {
  const { personalInfo, summary, experience, education, skills, themeConfig } = useCv();

  return (
    <div className="creative-template" style={{
      '--cr-theme-color': themeConfig.themeColor || '#2b3a4a',
      '--cr-accent-color': themeConfig.accentColor || '#4cd137'
    }}>
      <div className="cr-sidebar">
        <div className="cr-profile-pic">
          {personalInfo.photo ? (
            <img src={personalInfo.photo} alt="Profile" className={`cr-avatar-img shape-${themeConfig.avatarShape || 'circle'}`} />
          ) : (
            <div className={`cr-avatar-text shape-${themeConfig.avatarShape || 'circle'}`}>
               {personalInfo.fullName ? personalInfo.fullName.charAt(0) : 'CV'}
            </div>
          )}
        </div>
        
        <div className="cr-contact">
          <h3 className="cr-side-title">Contact</h3>
          {personalInfo.email && <div className="cr-side-item">{personalInfo.email}</div>}
          {personalInfo.phone && <div className="cr-side-item">{personalInfo.phone}</div>}
          {personalInfo.address && <div className="cr-side-item">{personalInfo.address}</div>}
          {personalInfo.linkedIn && <div className="cr-side-item">{personalInfo.linkedIn}</div>}
          {personalInfo.portfolio && <div className="cr-side-item">{personalInfo.portfolio}</div>}
        </div>

        {skills && skills.length > 0 && (
          <div className="cr-skills">
            <h3 className="cr-side-title">Skills</h3>
            <ul className="cr-skill-list">
              {skills.map((skill, index) => (
                <li key={index} className="cr-skill-item">{skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="cr-main">
        <header className="cr-header">
          <h1 className="cr-name">{personalInfo.fullName || 'Your Name'}</h1>
          <h2 className="cr-jobtitle">{personalInfo.jobTitle || 'Your Job Title'}</h2>
        </header>

        {summary && (
          <section className="cr-section">
            <h3 className="cr-section-title">Profile</h3>
            <p className="cr-text">{summary}</p>
          </section>
        )}

        {experience && experience.length > 0 && (
          <section className="cr-section">
            <h3 className="cr-section-title">Experience</h3>
            <div className="cr-timeline">
              {experience.map(exp => (
                <div key={exp.id} className="cr-timeline-item">
                  <div className="cr-timeline-date">{exp.startDate} - {exp.endDate}</div>
                  <div className="cr-timeline-content">
                    <h4 className="cr-item-title">{exp.position}</h4>
                    <div className="cr-item-company">{exp.company}</div>
                    <p className="cr-text">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {education && education.length > 0 && (
          <section className="cr-section">
            <h3 className="cr-section-title">Education</h3>
            <div className="cr-timeline">
              {education.map(edu => (
                <div key={edu.id} className="cr-timeline-item">
                  <div className="cr-timeline-date">{edu.startDate} - {edu.endDate}</div>
                  <div className="cr-timeline-content">
                    <h4 className="cr-item-title">{edu.degree}</h4>
                    <div className="cr-item-company">{edu.school}</div>
                    <p className="cr-text">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate;
