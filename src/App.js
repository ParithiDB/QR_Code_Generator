import './App.css';
import QRCode from 'qrcode.react';
import FileSaver from 'file-saver';
import React, { useState } from 'react';

function App() {

  const [data, setData] = useState('');
  const [width, setWidth] = useState(268);
  const [height, setHeight] = useState(268);
  const [format, setFormat] = useState('png');
  const [qrColor, setQRColor] = useState('#000000');
  const [bgColor, setBGColor] = useState('#FFFFFF');

 
  const generateQRCode = () => {
    if (format !== 'svg' && data.trim() !== '') {
      
      return (
        <QRCode
          value={data}
          size={width}
          bgColor={bgColor}
          fgColor={qrColor}
          level="H"
        />
      );
    } else if (format === 'svg' && data.trim() !== '') {
      return (
        <QRCode
          value={data}
          size={width}
          bgColor={bgColor}
          fgColor={qrColor}
          level="H"
          renderAs={'svg'}
        />
      );
    } else {
    
      return <div></div>;
    }
  };

  const handleDownload = () => {
    
    if (data.trim() !== '') {
      const canvas = document.querySelector('canvas');

      if (canvas) {
        canvas.toBlob((blob) => {
          if (blob) {
            FileSaver.saveAs(blob, `qrcode.${format}`);
          }
        });
      }
    } else {
      const svgString = document.querySelector('.qrcode svg').outerHTML;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    FileSaver.saveAs(blob, 'qrcode.svg');
    }
  };

  return (
    <div className="container mt-2">
      <h1 className="text-center">QR Code Generator</h1>
      <div className="row">
        <div className="col-12 col-md-6">
          <div className="mb-2">
            <label className="form-label">Enter the Data:</label>
            <input
              type="text"
              className="form-control"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Width:</label>
            <input
              type="text"
              className="form-control"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Height:</label>
            <input
              type="text"
              className="form-control"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Format:</label>
            <select
              className="form-select"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="png">.png</option>
              <option value="svg">.svg</option>
              <option value="jpg">.jpg</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">QR Color:</label>
            <input
              type="color"
              className="form-control"
              value={qrColor}
              onChange={(e) => setQRColor(e.target.value)}
              style={{height: 40}}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Background Color:</label>
            <input
              type="color"
              className="form-control"
              value={bgColor}
              onChange={(e) => setBGColor(e.target.value)}
              style={{height: 40}}
            />
          </div>
          <button className="btn btn-primary w-100" onClick={handleDownload}>
            Download QR Code
          </button>
        </div>
        <div className="col-12 col-md-6">
          <div className="qrcode">{generateQRCode()}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
