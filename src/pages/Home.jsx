import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Sparkles, LayoutTemplate, Download } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container animate-fade-in">
      <section className="hero">
        <div className="hero-content">
          <div className="badge">✨ V1.0 Telah Rilis</div>
          <h1>Buat CV Profesional dalam Menit</h1>
          <p className="subtitle">
            GaweCV membantu Anda membuat Curriculum Vitae yang menarik dan ATS-Friendly dengan mudah. Tidak perlu repot mendesain, cukup isi data Anda dan unduh.
          </p>
          <div className="cta-group">
            <Link to="/builder" className="btn btn-primary btn-lg">
              Mulai Buat CV Sekarang <Sparkles size={20} />
            </Link>
          </div>
        </div>
        <div className="hero-illustration">
          <div className="mockup-glass">
            <div className="mockup-header">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="mockup-body">
              <div className="skeleton-line w-30"></div>
              <div className="skeleton-line w-70"></div>
              <div className="skeleton-line w-50"></div>
              <div className="skeleton-line mt-2 w-100"></div>
              <div className="skeleton-line w-90"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="features bg-dark">
        <div className="features-container">
          <h2>Kenapa Memilih GaweCV?</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon bg-primary">
                <LayoutTemplate size={24} />
              </div>
              <h3>Beragam Template</h3>
              <p>Pilih dari desain ATS-Friendly untuk melamar ke perusahaan besar, atau desain Creative untuk menunjukkan sisi artistik Anda.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon bg-secondary">
                <FileText size={24} />
              </div>
              <h3>Real-time Preview</h3>
              <p>Lihat secara langsung setiap perubahan pada CV Anda selagi Anda mengetik. Tanpa perlu klik tombol preview berkali-kali.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon bg-accent">
                <Download size={24} />
              </div>
              <h3>Export PDF & Word</h3>
              <p>Unduh hasil CV Anda dalam format PDF atau Word (.docx) secara instan. Siap dikirim ke rekruter.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
