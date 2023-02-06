import { Link } from "react-router-dom";
import React from 'react';

// css
import '../members/memberStyles.css'

const DonorListItem = ({ donor }) => {
    let { _id, firstName, lastName, email, } = donor;

    return (
        <div className='member-list-item'>
            <Link to={`/donor/${_id}`} state={donor}>{firstName} {lastName}</Link>
            <p>{email}</p>
            <div className="actions">
                {/* TODO: Add functionality to these action buttons */}
                <button className="edit"><Link to='/AddDonor'><i className="fa fa-pencil"></i></Link></button>
                <button className="delete"><i className="fa fa-remove"></i></button>
            </div>
        
        </div>
    );
}

export default DonorListItem