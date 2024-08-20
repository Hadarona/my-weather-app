import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store/store';
import { setUnit } from '../../../store/unitSlice';
import './UnitSwitch.css';

const UnitSwitch: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const unit = useSelector((state: RootState) => state.unit.unit);

  const toggleUnit = () => {
    const newUnit = unit === '°C' ? '°F' : '°C';
    dispatch(setUnit(newUnit));
  };

  return (
    <button className="unit-switch" onClick={toggleUnit}>
      {unit === '°C' ? '°F' : '°C'}
    </button>
  );
};

export default UnitSwitch;
