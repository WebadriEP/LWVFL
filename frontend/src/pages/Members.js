import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { getAllMembers } from '../api/axios';

// components
import MemberActionBar from "../components/members/MemberActionBar";
import MemberList from "../components/members/MemberList";

// css
import '../components/members/memberStyles.css'

const Members = () => {
    const [members, setMembers] = useState([]); // State for members
    const [queryResults, setQueryResults] = useState([]); // State for search results

    // Fetch all members -- Used for search functionality
    useEffect(() => {
        getAllMembers().then(json => {
            setMembers(json)
            setQueryResults(json)
        })
    }, [])

    return(
        <>
            <h1>Member Management</h1>

            {/* Action bar containing search + filters + add */}
            <MemberActionBar members={members} setQueryResults={setQueryResults} />

            {/* List column labels */}
            <div className="member-list-labels">
                <h3>Name</h3>
                <h3>Email</h3>
                <h3>City</h3>
            </div>

            {/* Member List -- receives query results to filter */}
            <MemberList queryResults={queryResults} />
        </>
    );
}

export default Members;