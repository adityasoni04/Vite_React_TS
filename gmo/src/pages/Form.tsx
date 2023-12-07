import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';
import viteLogo from '/vite.svg';
import './Form.css';

const inputStyle = {
  '& input': {
    color: 'blue',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'red',
  },
};

const commonTextFieldProps = {
  fullWidth: true,
  margin: 'normal' as const, 
  InputLabelProps: {
    style: { color: 'red', borderColor: 'white' },
  },
  InputProps: {
    sx: inputStyle,
  },
};

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.name || !formData.phoneNumber || !formData.email) {
      alert('Please fill in all the entries before submitting.');
      return;
    }

    localStorage.setItem('userData', JSON.stringify(formData));
    navigate('/second-page');
  };

  return (
    <div className='first-page'>
      <img src={viteLogo} className="logo" alt="Vite logo" />
      <h1 className="title">Vite + React TS Assignment</h1>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" align="center" gutterBottom>
          User Information
        </Typography>
        <TextField label="Name" value={formData.name} onChange={handleChange('name')} required {...commonTextFieldProps} />
        <TextField label="Phone Number" value={formData.phoneNumber} onChange={handleChange('phoneNumber')} required {...commonTextFieldProps} />
        <TextField label="Email" value={formData.email} onChange={handleChange('email')} required {...commonTextFieldProps} />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
