




import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../redux/slices/filterSlice';
import { RootState } from '../redux/store/store';
import '../styles/FilterForm.css';

interface FilterFormProps {
  onFilter: (filters: any) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<any>({
    location: '',
    bodyType: '',
    brand: [],
    owners: '',
    budget: [],
    fuelType: '',
    transmission: '',
  });


  const [options, setOptions] = useState<any>({});
  const dispatch = useDispatch();
  const currentFilters = useSelector((state: RootState) => state.filters);
  const records = useSelector((state: RootState) => state.records.records);
  const [filteredRecords, setFilteredRecords] = useState<any[]>([]);

  useEffect(() => {
    fetch('/option.json')
      .then(response => response.json())
      .then(data => setOptions(data))
      .catch(error => console.error('Error fetching options:', error));
  }, []);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLButtonElement>) => {
    if (e.target.type === 'checkbox') {
      const { name, checked } = e.target as HTMLInputElement;
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        brand: checked ? [...prevFilters.brand, name] : prevFilters.brand.filter((item: string) => item !== name),
      }));
    } else if (e.target.type === 'button') {
      const { name, value } = e.target as HTMLButtonElement;
      setFilters((prevFilters: any) => ({
        ...prevFilters,
        budget: Array.isArray(prevFilters.budget) ?
          prevFilters.budget.includes(value)
            ? prevFilters.budget.filter((item: string) => item !== value)
            : [...prevFilters.budget, value]
          : [value],
      }));
    } else {
      setFilters((prevFilters: any) => ({ ...prevFilters, [e.target.name]: e.target.value }));
    };
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted filters:', filters);

    // Filtering logic
    const newFilteredRecords = records.filter((record: any) => {
      return (
        (filters.location === '' || record.location === filters.location) &&
        (filters.bodyType === '' || record.bodyType === filters.bodyType) &&
        (filters.brand.length === 0 || filters.brand.includes(record.brand)) &&
        (filters.owners === '' || record.owners === filters.owners) &&
        (filters.budget.length === 0 || filters.budget.includes(record.budget)) &&
        (filters.fuelType === '' || record.fuelType === filters.fuelType) &&
        (filters.transmission === '' || record.transmission === filters.transmission)
      );
    });

    // Update the state with filtered records
    setFilteredRecords(newFilteredRecords);
    onFilter(newFilteredRecords);
  };

  return (
    <>
      <div className="container">
        <div className="left-section">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Location:</label>
              <select name="location" value={filters.location} onChange={handleInputChange}>
                <option value="">Select Location</option>
                {options.location &&
                  options.location.map((location: string) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
              </select>
            </div>
            <div>
              <label>Body Type:</label>
              <select name="bodyType" value={filters.bodyType} onChange={handleInputChange}>
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
              <div>
                <label>Brand :</label>
                <select name="brand" value={filters.brand} onChange={handleInputChange}>
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
            <div>
              <label>Owners:</label>
              <div>
                {options.owners &&
                  options.owners.map((owner: string) => (
                    <div key={owner}>
                      <input
                        type="radio"
                        name="owners"
                        value={owner}
                        onChange={handleInputChange}
                        checked={filters.owners === owner}
                      />
                      <label>{owner}</label>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <label>Budget:</label>
              <div className="button-options">
                {options.budget &&
                  options.budget.map((value: string) => (
                    <button
                      key={value}
                      type="button"
                      name="budget"
                      value={value}
                      onClick={() => handleInputChange({ target: { type: 'button', name: 'budget', value } } as React.ChangeEvent<HTMLInputElement>)}
                      className={filters.budget.includes(value) ? 'selected' : ''}
                    >
                      {value}
                    </button>
                  ))}
              </div>
            </div>
            <div>
              <label>Fuel Type:</label>
              <div className="radio-options">
                {options.fuelType &&
                  options.fuelType.map((fuelType: string) => (
                    <div key={fuelType}>
                      <input
                        type="radio"
                        name="fuelType"
                        value={fuelType}
                        onChange={handleInputChange}
                        checked={filters.fuelType === fuelType}
                      />
                      <label>{fuelType}</label>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <label>Transmission:</label>
              <div>
                {options.transmission &&
                  options.transmission.map((transmission: string) => (
                    <div key={transmission}>
                      <input
                        type="radio"
                        name="transmission"
                        value={transmission}
                        onChange={handleInputChange}
                        checked={filters.transmission === transmission}
                      />
                      <label>{transmission}</label>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <button type="submit">Filter</button>
            </div>
          </form>
        </div>

        <div className="center-section">
          <h3>Vehicle Results</h3>
          {filteredRecords.length === 0 ? (
            records?.map((record: any, index: number) => (
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
            ))
          ) : (
            filteredRecords.map((record: any, index: number) => (
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
            ))
          )}
        </div>
        <div className="right-section"></div>
      </div></>
  );
};

export default FilterForm;
