import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Button } from '@mui/material';
import Component1 from '../components/Component1';
import Component2 from '../components/Component2';
import "./SecondPage.css"

const App: React.FC = () => {

    const storedUserDataString = localStorage.getItem('userData');
    const storedUserData = storedUserDataString ? JSON.parse(storedUserDataString) : {};
    const name = storedUserData.name;
    const phoneNumber = storedUserData.phoneNumber;
    const email = storedUserData.email;
    const history = useNavigate();


    if (!name || !phoneNumber || !email) {
        // Redirect user back to first page if information is missing
        history('/');
        return <Typography>Please enter your details</Typography>;
    }

    return (
        <>
            <section>
                <Typography variant="h5" className="title">User Details:</Typography>
                <div className="container">
                    <Typography className="info">Name: {name}</Typography>
                    <Typography className="info">Phone number: {phoneNumber}</Typography>
                    <Typography className="info">Email: {email}</Typography>
                </div>
                <Button variant="contained" className="button" onClick={() => {
                    history('/');
                    localStorage.removeItem('name');
                    localStorage.removeItem('email');
                    localStorage.removeItem('phoneNumber');
                }}>
                    Go back
                </Button>
            </section>
            <section>
                <Typography variant="h5" className="title">Component 1 - Tables:</Typography><br />
                <Component1 />
            </section>
            <section>
                <Typography variant="h5" className="title">Component 2 - Departments:</Typography>
                <Component2 /></section>
        </>
    );
};

export default App;
