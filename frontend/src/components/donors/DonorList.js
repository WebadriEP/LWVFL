// components
import DonorListItem from './DonorListItem';
import React from 'react';

// css
//import './memberStyles.css'

const DonorList = ({ queryResults }) => {
    // Generate a list of MemberListItem components
    const results = queryResults.map(donor => 
        <DonorListItem key={donor._id} donor={donor} 
    />); 

    // Handle no results found
    const content = results.length ? results : <article><p>No members found</p></article>;

    return (
        <main className="member-list shadow">{content}</main>
    );

}

export default DonorList