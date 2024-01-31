import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addRecord } from '../redux/slices/recordsSlice';
import { setFilters } from '../redux/slices/filterSlice';

import { RootState } from '../redux/store/store';
import '../styles/Form.css';


interface FormProps {
  onFormSubmit: (formData: any) => void;
  selectedLogo: string;
}

const Form: React.FC<FormProps> = ({ onFormSubmit, selectedLogo }) => {
  const [formData, setFormData] = useState<any>({});
  const dispatch = useDispatch();
  const records = useSelector((state: RootState) => state.records.records);

  const [options, setOptions] = useState<any>({});

  useEffect(() => {
    fetch('/option.json')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error fetching options:', error));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    }
  };


  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedFormData = { ...formData, model: selectedLogo };
    const photoUrl = formData.photo ? URL.createObjectURL(formData.photo) : '';

    dispatch(addRecord({ ...updatedFormData, photo: photoUrl }));
    dispatch(setFilters(updatedFormData));
  };

  return (
    <>
      <div className="center-container">
        <form className="form-container" onSubmit={handleFormSubmit}>
          <h2>VEHICLE DETAILS</h2>

          <div className="form-row">
            <div>
              <label>Model:</label>
              <input type="text" name="model" value={selectedLogo} readOnly />
            </div>
            <div >
              <label>Location:</label>
              <select name="location" className="select-box" onChange={handleInputChange} required>
                <option value="">Select Location</option>
                {options.location &&
                  options.location.map((location: string) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Color:</label>
              <input type="text" name="color" onChange={handleInputChange} required />
            </div>

            <div>
              <label>No of Owners:</label>
              <select name="owners" className="select-box" onChange={handleInputChange} required>
                <option value="">Select No of Owners</option>
                {options.owners &&
                  options.owners.map((value: string) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Year of Manufacture:</label>
              <input type="date" name="manufactureYear" onChange={handleInputChange} required />
            </div>

            <div>
              <label>Transmission:</label>
              <select name="transmission" className="select-box" onChange={handleInputChange} required>
                <option value="">Select Transmission</option>
                {options.transmission &&
                  options.transmission.map((value: string) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
              </select>
            </div>
          </div>


          <div className="form-row">
            <div>
              <label>Body Type:</label>
              <select name="bodyType" className="select-box" onChange={handleInputChange} required>
                <option value="">Select Body Type</option>
                {options.bodyType &&
                  options.bodyType.map((type: string) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Brand:</label>
              <select name="brand" className="select-box" onChange={handleInputChange} required>
                <option value="">Select Brand</option>
                {options.brand &&
                  options.brand.map((type: string) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
              </select>
            </div>


          </div>
          <div className="form-row">


            <div>
              <label>Fuel Type:</label>
              <select name="fuelType" className="select-box" onChange={handleInputChange} required>
                <option value="">Select Fuel Type</option>
                {options.fuelType &&
                  options.fuelType.map((value: string) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label>Budget:</label>
              <select name="budget" className="select-box" onChange={handleInputChange} required>
                <option value="">Select Budget</option>
                {options.budget &&
                  options.budget.map((value: string) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div>
              <label>Insurance Validity upto:</label>
              <input type="date" name="insuranceKms" onChange={handleInputChange} required />
            </div>
            <div>
              <label>External Fitments:</label>
              <input type="text" name="externalFitments" onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label>Kms:</label>
              <input type="number" name="kms" onChange={handleInputChange} required />
            </div>
            <div>
              <label>Photo:</label>
              <input type="file" name="photo" onChange={handleFileChange} accept="image/*" />
            </div>
          </div>

          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>

      <div className="json-container">
        <h3>Vehicle Records:</h3>
        {records?.map((record: any, index: number) => (
          <div key={index} className="record-item">
            <h4>Record {index + 1}</h4>
            {record.photo && <img style={{ height: 200 }} src={record.photo} alt={`Vehicle ${index + 1}`} className="record-image" />}
            <p>Model: {record.model}</p>
            <p>Color: {record.color}</p>
            <p>Location: {record.location}</p>
            <p>No of Owners: {record.owners}</p>
            <p>Transmission: {record.transmission}</p>
            <p>Fuel Type: {record.fuelType}</p>
            <p>insurance Kms: {record.insuranceKms}</p>
            <p>Manufacture Year: {record.manufactureYear}</p>
            <p>Brand: {record.brand}</p>
            <p>Body Type: {record.bodyType}</p>

          </div>
        ))}
      </div>

    </>
  );
};

export default Form;
