import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
  },
  {
    filterType: 'Location',
    array: ['Delhi', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },

  {
    filterType: 'Salary',
    array: ['0-48k', '20-30 Lpa', '40-50 Lpa'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue]= useState('');
  const dispatch= useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  }
  useEffect(() => {
dispatch(setSearchedQuery(selectedValue));
  },[selectedValue])
  return (
    <div className='w-full bg-white g-3 rounded-nd'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup  value={selectedValue} onValueChange={changeHandler} className="grid gap-4 p-4">
        {filterData.map((data, index) => (
          <div>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId= `id${index}-${idx}`
              return (
                <div className="flex items-center space-x-2 my-2">
                  <RadioGroupItem value={item}  id={itemId} />
                  <Label htmlFor={itemId}>{item}</Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
