import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Filter from '../components/FilterForm';
import { useAppContext } from '../context-provider/AppProvider';

interface Record {
  location: string;
}

const ResultsPage: React.FC = () => {
  const { records } = useAppContext();
  const location = useLocation();
  const [filteredRecords, setFilteredRecords] = useState<Record[]>(records); // Initial state is all records

  const handleFilter = (filterCriteria: { location: string }) => {
    if (records) {
      const filtered = records.filter((record: { location: string }) => record.location === filterCriteria.location);
      setFilteredRecords(filtered);
    }
  };

  return (
    <div>
      <Filter onFilter={handleFilter} />
      {filteredRecords && filteredRecords.map((record: { location: string }, index: number) => (
        <></>
      ))}
    </div>
  );


};

export default ResultsPage;
