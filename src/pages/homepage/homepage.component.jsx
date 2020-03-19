import React from 'react'
import './homepage.styles.scss'
import Directory from '../../components/directory/directory.component'

const HomePage = ({ history }) => {
    return <div className='homePage'>
        <Directory />
    </div>
}

export default HomePage