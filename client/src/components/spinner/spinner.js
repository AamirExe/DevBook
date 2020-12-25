import React from 'react'
import { Fragment } from 'react'
import Loader from 'react-loader-spinner'




const LoadCircle = () => {
    return (<div className='middle'>
        <Loader type="BallTriangle" color="black" height={80} width={80}/>
    </div>
        
    )}


export default LoadCircle