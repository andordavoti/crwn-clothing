import React, { useState } from 'react';
import FormInput from '../form-input/form-input.component';

import './sign-in.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
    const initialState = {
        email: '',
        password: '',
    };

    const [userCredentials, setUserCredentials] = useState(initialState);

    const { email, password } = userCredentials;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setUserCredentials(initialState);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { value, name } = e.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    };

    return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label="email" type="email" name="email" value={email} handleChange={handleChange} required />

                <FormInput
                    label="password"
                    type="password"
                    name="password"
                    value={password}
                    handleChange={handleChange}
                    required
                />

                <div className="buttons">
                    <CustomButton type="submit">Sign in</CustomButton>
                    <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
                        Sign in with Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
};

export default SignIn;
