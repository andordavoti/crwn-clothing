import React from 'react'
import FormInput from '../form-input/form-input.component'

import './sign-in.styles.scss'
import CustomButton from '../custom-button/custom-button.component'

import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

export default class SignIn extends React.Component {

    state = { email: '', password: '' }

    handleSubmit = async e => {
        e.preventDefault()

        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: '' })

        } catch (error) {
            console.error(error)
        }
    }

    handleChange = e => {
        const { value, name } = e.target

        this.setState({ [name]: value })
    }

    render() {
        const { email, password } = this.state

        return <div className='sign-in'>
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={this.handleSubmit}>
                <FormInput label='email' type="email" name='email' value={email} handleChange={this.handleChange} required />

                <FormInput label='password' type="password" name='password' value={password} handleChange={this.handleChange} required />

                <div className='buttons'>
                    <CustomButton type='submit'>Sign in</CustomButton>
                    <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                </div>
            </form>
        </div>
    }
}