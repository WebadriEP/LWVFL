import React from 'react';

import { useState, useEffect, useMemo } from 'react';
import { getAllDonors } from '../api/axios';

// components
import DonorActionBar from "../components/donors/DonorActionBar";
import DonorList from "../components/donors/DonorList";

// css
import '../components/members/memberStyles.css'

const Donors = () => {
    const [donors, setDonors] = useState([]); // State for members
    const [queryResults, setQueryResults] = useState([]); // State for search results

    // Fetch all members -- Used for search functionality
    useEffect(() => {
        getAllDonors().then(json => {
            setDonors(json)
            setQueryResults(json)
        })
    }, [])

    return(
        <>
            <h1>Donors List</h1>
            <DonorActionBar donors={donors} setQueryResults={setQueryResults} />
            <div className="member-list-labels">
                <h3>Name</h3>
                <h3>Email</h3>
                <h3>City</h3>
            </div>
            <DonorList queryResults={queryResults} />
        </>
    );
}

export default Donors;