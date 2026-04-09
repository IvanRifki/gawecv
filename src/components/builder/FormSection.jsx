import React from 'react';
import { useCv } from '../../context/CvContext';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import ImageCropper from '../common/ImageCropper';
import './FormSection.css';

const FormSection = () => {
  const { 
    personalInfo, setPersonalInfo,
    summary, setSummary,
    experience, setExperience,
    education, setEducation,
    skills, setSkills,
    template, setTemplate,
    themeConfig, setThemeConfig
  } = useCv();

  const [expandedSection, setExpandedSection] = React.useState('personal'); // personal, summary, experience, education, skills
  const [rawImage, setRawImage] = React.useState(null);
  const [showCropper, setShowCropper] = React.useState(false);

  const toggleSection = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setRawImage(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
    // reset input value so the same file could be selected again if needed
    e.target.value = '';
  };

  const onCropComplete = (croppedImageBase64) => {
    setPersonalInfo(prev => ({ ...prev, photo: croppedImageBase64 }));
    setShowCropper(false);
    setRawImage(null);
  };

  const onCropCancel = () => {
    setShowCropper(false);
    setRawImage(null);
  };

  const handleSkillsChange = (e) => {
    const arraySkills = e.target.value.split(',').map(s => s.trim());
    setSkills(arraySkills);
  };

  // --- Dynamic Experience Arrays ---
  const addExperience = () => {
    const newId = Date.now().toString();
    setExperience([...experience, { id: newId, company: '', position: '', startDate: '', endDate: '', description: '' }]);
  };

  const updateExperience = (id, field, value) => {
    setExperience(experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  };

  const removeExperience = (id) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  // --- Dynamic Education Arrays ---
  const addEducation = () => {
    const newId = Date.now().toString();
    setEducation([...education, { id: newId, school: '', degree: '', startDate: '', endDate: '', description: '' }]);
  };

  const updateEducation = (id, field, value) => {
    setEducation(education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu));
  };

  const removeEducation = (id) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  return (
    <div className="form-sections">
      <div className="section-header">
        <h2 className="section-title">Informasi CV</h2>
        <p className="section-subtitle">Pilih template dan masukkan data Anda.</p>
      </div>

      {/* Template Selection */}
      <div className="form-group template-selector">
        <label className="input-label">Pilih Template</label>
        <div className="radio-group">
          <label className={`radio-card ${template === 'ats' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="template" 
              value="ats" 
              checked={template === 'ats'} 
              onChange={() => setTemplate('ats')}
            />
            ATS Friendly
          </label>
          <label className={`radio-card ${template === 'creative' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="template" 
              value="creative" 
              checked={template === 'creative'} 
              onChange={() => setTemplate('creative')}
            />
            Creative Modern
          </label>
        </div>
      </div>

      {/* Theme Settings Accordion - Only visibly for creative template */}
      {template === 'creative' && (
        <div className={`accordion-card ${expandedSection === 'theme' ? 'expanded' : ''}`}>
          <div className="accordion-header" onClick={() => toggleSection('theme')}>
            <h3 className="sub-section-title">Kustomisasi Desain</h3>
            {expandedSection === 'theme' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <div className="accordion-body">
            <div className="input-row">
              <div className="input-group">
                <label className="input-label">Warna Utama</label>
                <input 
                  type="color" 
                  className="input-field" 
                  value={themeConfig.themeColor} 
                  onChange={(e) => setThemeConfig(prev => ({ ...prev, themeColor: e.target.value }))} 
                />
              </div>
              <div className="input-group">
                <label className="input-label">Warna Aksen</label>
                <input 
                  type="color" 
                  className="input-field" 
                  value={themeConfig.accentColor} 
                  onChange={(e) => setThemeConfig(prev => ({ ...prev, accentColor: e.target.value }))} 
                />
              </div>
            </div>
            <div className="input-group">
              <label className="input-label">Bentuk Profil Foto</label>
              <select 
                className="input-field"
                value={themeConfig.avatarShape}
                onChange={(e) => setThemeConfig(prev => ({ ...prev, avatarShape: e.target.value }))}
              >
                <option value="circle">Lingkaran</option>
                <option value="square">Persegi</option>
                <option value="rounded">Sudut Membulat</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Personal Info Accordion */}
      <div className={`accordion-card ${expandedSection === 'personal' ? 'expanded' : ''}`}>
        <div className="accordion-header" onClick={() => toggleSection('personal')}>
          <h3 className="sub-section-title">Informasi Pribadi</h3>
          {expandedSection === 'personal' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <div className="accordion-body">
          <div className="input-group">
            <label className="input-label">Foto Profil (Khusus Template Creative)</label>
            <input type="file" className="input-field" accept="image/*" onChange={handlePhotoUpload} />
          </div>
          <div className="input-group">
            <label className="input-label">Nama Lengkap</label>
            <input type="text" className="input-field" name="fullName" value={personalInfo.fullName} onChange={handlePersonalChange} placeholder="John Doe" />
          </div>
          <div className="input-group">
            <label className="input-label">Posisi / Pekerjaan</label>
            <input type="text" className="input-field" name="jobTitle" value={personalInfo.jobTitle} onChange={handlePersonalChange} placeholder="Software Engineer" />
          </div>
          <div className="input-row">
            <div className="input-group">
              <label className="input-label">Email</label>
              <input type="email" className="input-field" name="email" value={personalInfo.email} onChange={handlePersonalChange} placeholder="john@example.com" />
            </div>
            <div className="input-group">
              <label className="input-label">Telepon</label>
              <input type="text" className="input-field" name="phone" value={personalInfo.phone} onChange={handlePersonalChange} placeholder="+62..." />
            </div>
          </div>
          <div className="input-group">
            <label className="input-label">Alamat</label>
            <input type="text" className="input-field" name="address" value={personalInfo.address} onChange={handlePersonalChange} placeholder="Jakarta, Indonesia" />
          </div>
          <div className="input-group">
            <label className="input-label">LinkedIn (Opsional)</label>
            <input type="text" className="input-field" name="linkedIn" value={personalInfo.linkedIn} onChange={handlePersonalChange} placeholder="linkedin.com/in/johndoe" />
          </div>
          <div className="input-group">
            <label className="input-label">Web Portofolio (Opsional)</label>
            <input type="text" className="input-field" name="portfolio" value={personalInfo.portfolio || ''} onChange={handlePersonalChange} placeholder="portofolio-saya.com" />
          </div>
        </div>
      </div>

      {/* Summary Accordion */}
      <div className={`accordion-card ${expandedSection === 'summary' ? 'expanded' : ''}`}>
        <div className="accordion-header" onClick={() => toggleSection('summary')}>
          <h3 className="sub-section-title">Profil Profesional</h3>
          {expandedSection === 'summary' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <div className="accordion-body">
          <div className="input-group">
            <textarea className="input-field" value={summary} onChange={(e) => setSummary(e.target.value)} rows="4" placeholder="Ceritakan singkat tentang diri Anda..."></textarea>
          </div>
        </div>
      </div>

      {/* Experience Accordion */}
      <div className={`accordion-card ${expandedSection === 'experience' ? 'expanded' : ''}`}>
        <div className="accordion-header" onClick={() => toggleSection('experience')}>
          <h3 className="sub-section-title">Pengalaman Kerja ({experience.length})</h3>
          {expandedSection === 'experience' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <div className="accordion-body form-list-container">
          {experience.map((exp, index) => (
            <div key={exp.id} className="dynamic-item-card animate-fade-in">
              <div className="dynamic-item-header">
                <h4>Pengalaman {index + 1}</h4>
                <button className="btn-icon text-danger" onClick={() => removeExperience(exp.id)} title="Hapus Pengalaman">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="input-group">
                <label className="input-label">Perusahaan</label>
                <input type="text" className="input-field" value={exp.company} onChange={(e) => updateExperience(exp.id, 'company', e.target.value)} placeholder="Perusahaan XYZ" />
              </div>
              <div className="input-group">
                <label className="input-label">Posisi / Jabatan</label>
                <input type="text" className="input-field" value={exp.position} onChange={(e) => updateExperience(exp.id, 'position', e.target.value)} placeholder="Manajer Pemasaran" />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label className="input-label">Mulai (Bulan/Tahun)</label>
                  <input type="text" className="input-field" value={exp.startDate} onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)} placeholder="Jan 2020" />
                </div>
                <div className="input-group">
                  <label className="input-label">Selesai (Bulan/Tahun)</label>
                  <input type="text" className="input-field" value={exp.endDate} onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)} placeholder="Sekarang" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Deskripsi Pekerjaan</label>
                <textarea className="input-field" value={exp.description} onChange={(e) => updateExperience(exp.id, 'description', e.target.value)} rows="3" placeholder="Menyelesaikan target penjualan, dll..."></textarea>
              </div>
            </div>
          ))}
          <button className="btn btn-outline btn-block mt-2" onClick={addExperience}>
            <Plus size={16} /> Tambah Pengalaman Kerja
          </button>
        </div>
      </div>

      {/* Education Accordion */}
      <div className={`accordion-card ${expandedSection === 'education' ? 'expanded' : ''}`}>
        <div className="accordion-header" onClick={() => toggleSection('education')}>
          <h3 className="sub-section-title">Pendidikan ({education.length})</h3>
          {expandedSection === 'education' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <div className="accordion-body form-list-container">
          {education.map((edu, index) => (
            <div key={edu.id} className="dynamic-item-card animate-fade-in">
              <div className="dynamic-item-header">
                <h4>Pendidikan {index + 1}</h4>
                <button className="btn-icon text-danger" onClick={() => removeEducation(edu.id)} title="Hapus Pendidikan">
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="input-group">
                <label className="input-label">Institusi / Universitas</label>
                <input type="text" className="input-field" value={edu.school} onChange={(e) => updateEducation(edu.id, 'school', e.target.value)} placeholder="Universitas ABC" />
              </div>
              <div className="input-group">
                <label className="input-label">Gelar / Jurusan</label>
                <input type="text" className="input-field" value={edu.degree} onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)} placeholder="S1 Teknik Informatika" />
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label className="input-label">Mulai (Tahun)</label>
                  <input type="text" className="input-field" value={edu.startDate} onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)} placeholder="2015" />
                </div>
                <div className="input-group">
                  <label className="input-label">Selesai (Tahun)</label>
                  <input type="text" className="input-field" value={edu.endDate} onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)} placeholder="2019" />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">Informasi Tambahan (IPK, Prestasi)</label>
                <textarea className="input-field" value={edu.description} onChange={(e) => updateEducation(edu.id, 'description', e.target.value)} rows="2" placeholder="Lulus dengan predikat Cum Laude (IPK 3.8)"></textarea>
              </div>
            </div>
          ))}
          <button className="btn btn-outline btn-block mt-2" onClick={addEducation}>
            <Plus size={16} /> Tambah Pendidikan
          </button>
        </div>
      </div>

      {/* Skills Accordion */}
      <div className={`accordion-card ${expandedSection === 'skills' ? 'expanded' : ''}`}>
        <div className="accordion-header" onClick={() => toggleSection('skills')}>
          <h3 className="sub-section-title">Keahlian</h3>
          {expandedSection === 'skills' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <div className="accordion-body">
          <div className="input-group">
            <label className="input-label">Daftar Keahlian (Pisahkan dengan koma)</label>
            <textarea className="input-field" value={skills.join(', ')} onChange={handleSkillsChange} placeholder="React, Node.js, Design..." rows="3"></textarea>
          </div>
        </div>
      </div>

      {showCropper && rawImage && (
        <ImageCropper
          image={rawImage}
          onCropComplete={onCropComplete}
          onCancel={onCropCancel}
        />
      )}

    </div>
  );
};

export default FormSection;
