import { styled } from '@mui/system';
import React from 'react';
import './button.scss';

const SelectButton = ({ children, selected, onClick }) => {
  const Select = styled('div')(() => ({
    border: '1px solid gold',
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: 'Inter',
    cursor: 'pointer',
    backgroundColor: selected ? 'gold' : '',
    color: selected ? 'black' : '',
    transitionDuration: '0.4s',
    fontWeight: selected ? 700 : 500,
    '&:hover': {
      backgroundColor: 'gold',
      color: 'black',
    },
    width: '22%',
  }));

  return (
    <Select onClick={onClick} className="">
      {children}
    </Select>
  );
};

export default SelectButton;
