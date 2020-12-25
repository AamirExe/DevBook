import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import {deleteExperience} from '../../actions.js/profile'
const Experience = ({experience,deleteExperience}) => {
    console.log(experience)
   const experiences = experience.map(exp => (<tr key={exp.id}>
       <td>{exp.company}</td>
       <td className='hide-sm' > {exp.title}</td>
       <td>
           <Moment format ='YYYY/MM/DD'>{exp.from}</Moment> - {
               exp.to === null ? 'Now' : (<Moment format ='YYYY/MM/DD'>{exp.to}</Moment>)
           }
       </td>
       <td>
           <button onClick={() => deleteExperience(exp.id)} className='btn btn-danger'>Delete</button>
       </td>
   </tr>))
   return(<Fragment>
        <h1 className='my-2'> Experience Credentials</h1>
        <table className='table'>
            <thead>
                <tr>
                    <th>company</th>
                    <th className='hide-sm'>Titile</th>
                    <th className='hide-sm'>Years</th>
                    <th /> 
                </tr>
            </thead>
            <tbody>{experiences}</tbody>
        </table>
    </Fragment>)
}


export default connect(null,{deleteExperience})(Experience)     