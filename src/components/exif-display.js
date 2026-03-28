import React from 'react';

const formatShutterSpeed = (exposureTime) => {
  if (!exposureTime) return null;
  if (exposureTime >= 1) return `${exposureTime}s`;
  return `1/${Math.round(1 / exposureTime)}s`;
};

const ExifItem = ({ label, value }) => {
  if (value == null || value === '') return null;
  return (
    <div className="exif-item">
      <span className="exif-item-label">{label}</span>
      <span className="exif-item-value">{value}</span>
    </div>
  );
};

const ExifDisplay = ({
  camera,
  lens,
  aperture,
  shutterSpeed,
  iso,
  focalLength,
  dateTaken,
  latitude,
  longitude,
}) => {
  const hasExif =
    camera || lens || aperture || shutterSpeed || iso || focalLength || dateTaken;
  if (!hasExif) return null;

  return (
    <div className="exif-panel">
      <h3 className="exif-panel-title">
        <i className="fas fa-camera mr-2" />
        Camera Info
      </h3>
      <div className="exif-grid">
        <ExifItem label="Camera" value={camera} />
        <ExifItem label="Lens" value={lens} />
        <ExifItem label="Aperture" value={aperture ? `f/${aperture}` : null} />
        <ExifItem label="Shutter Speed" value={formatShutterSpeed(shutterSpeed)} />
        <ExifItem label="ISO" value={iso != null ? String(iso) : null} />
        <ExifItem label="Focal Length" value={focalLength ? `${focalLength}mm` : null} />
        {dateTaken && <ExifItem label="Date Taken" value={dateTaken} />}
        {latitude && longitude && (
          <ExifItem
            label="Location"
            value={`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
          />
        )}
      </div>
    </div>
  );
};

export default ExifDisplay;
