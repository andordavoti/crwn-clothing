import React from 'react'
import FormInput from '../form-input/form-input.component'

import './sign-in.styles.scss'
import CustomButton from '../custom-button/custom-button.component'

export default class SignIn extends React.Component {

    state = { email: '', password: '' }

    handleSubmit = e => {
        e.preventDefault()

        this.setState({ email: '', password: '' })
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

                <CustomButton type='submit'>Sign In</CustomButton>
            </form>
        </div>
    }
}