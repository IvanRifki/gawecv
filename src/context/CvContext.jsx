import React, { createContext, useState, useContext } from 'react';

const CvContext = createContext();

export const useCv = () => useContext(CvContext);

export const CvProvider = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Faiz Dallin Izaz Nuralif',
    jobTitle: 'Pengembang Perangkat Lunak',
    email: 'fdalling.in.com',
    phone: '+62 812 3456 7890',
    address: 'Bogor, Indonesia',
    linkedIn: 'linkedin.com/in/faizdallinizaznuralif',
    portfolio: 'portofolio-faiz.com',
    photo: null,
  });

  const [summary, setSummary] = useState(
    'Seorang Pengembang Perangkat Lunak yang berdedikasi dengan pengalaman lebih dari 5 tahun dalam pengembangan web full-stack. Memiliki rekam jejak yang terbukti dalam membangun aplikasi yang skalabel dan dapat bekerja secara efektif dalam tim yang dinamis.'
  );

  const [experience, setExperience] = useState([
    {
      id: '1',
      company: 'PT Solusi Teknologi Nusantara',
      position: 'Pengembang Senior',
      startDate: '2020-01',
      endDate: 'Sekarang',
      description: 'Memimpin tim beranggotakan 5 pengembang untuk membangun aplikasi SaaS modern. Berhasil meningkatkan performa aplikasi hingga 40%.',
    },
  ]);

  const [education, setEducation] = useState([
    {
      id: '1',
      school: 'Universitas Indonesia',
      degree: 'Sarjana Ilmu Komputer',
      startDate: '2015-08',
      endDate: '2019-07',
      description: 'Lulus dengan predikat Cum Laude. Menjabat sebagai Ketua Himpunan Mahasiswa Ilmu Komputer.',
    },
  ]);

  const [skills, setSkills] = useState(['JavaScript', 'React', 'Node.js', 'Desain UI/UX', 'Manajemen Proyek']);

  const [template, setTemplate] = useState('ats'); // 'ats' or 'creative'

  const [themeConfig, setThemeConfig] = useState({
    themeColor: '#2b3a4a',
    accentColor: '#4cd137',
    avatarShape: 'circle',
  });

  const value = {
    personalInfo, setPersonalInfo,
    summary, setSummary,
    experience, setExperience,
    education, setEducation,
    skills, setSkills,
    template, setTemplate,
    themeConfig, setThemeConfig
  };

  return (
    <CvContext.Provider value={value}>
      {children}
    </CvContext.Provider>
  );
};
