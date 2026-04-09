import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../../utils/cropImage';
import './ImageCropper.css';

const ImageCropper = ({ image, onCropComplete, onCancel }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    try {
      const croppedImageBase64 = await getCroppedImg(image, croppedAreaPixels, 0);
      onCropComplete(croppedImageBase64);
    } catch (e) {
      console.error(e);
      alert('Gagal memotong foto.');
    }
  };

  return (
    <div className="cropper-modal-overlay">
      <div className="cropper-modal-content animate-fade-in">
        <h3 className="cropper-title">Sesuaikan Foto</h3>
        <div className="cropper-container">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} // 1:1 aspect ratio for circular/square avatars
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className="cropper-controls">
          <label>Zoom</label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(e.target.value)}
            className="zoom-range"
          />
        </div>
        <div className="cropper-actions">
          <button className="btn btn-outline" onClick={onCancel}>Batal</button>
          <button className="btn btn-primary" onClick={handleSave}>Simpan Foto</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
