import React, { useState } from 'react';
import '../styles/HomeScreen.css';

import Form from '../components/AddVehicleDetailsForm';
import dummyData from '../utils/dummyData';

const HomeScreen: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedLogo, setSelectedLogo] = useState<{ name: string; image: string } | null>(null);

  const handleLogoClick = (logo: { name: string; image: string }) => {
    setShowForm(true);
    setSelectedLogo(logo);
  };

  const handleFormSubmit = (formData: any) => {
    console.log(formData);
  };

  const handleClick = () => {
    console.log('More clicked');
  };

  return (
    <div className="HomeScreen">
      <div className="content">
        <div className="logo-container">
          {dummyData.logos.map((logo, index) => (
            <div
              key={`logo${index + 1}`}
              className="logo-card"
              onClick={() => handleLogoClick(logo)}
            >
              <img src={logo.image} height={60} alt={logo.name} />
              <div className='brand-names'>{logo.name}</div>
            </div>
          ))}
          <div
            className="logo-card"
            onClick={handleClick}
          >
            <div style={{ position: "relative", bottom: 32 }}>
              <div style={{ height: 60 }} />
              <div className='More-names'>MORE</div>
            </div>
          </div>
        </div>

        {showForm && (
          <Form
            onFormSubmit={handleFormSubmit}
            selectedLogo={selectedLogo ? selectedLogo.name : ''}
          />
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
