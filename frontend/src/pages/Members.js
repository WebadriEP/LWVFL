import axios from 'axios'
import React from 'react';

import { useState, useEffect, useMemo } from 'react';
import { getAllMembers } from '../api/axios';
import { Link } from "react-router-dom";


// components
import MemberActionBar from "../components/members/MemberActionBar";
import MemberList from "../components/members/MemberList";
import AddMember from "./AddMember"
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
            <h1>Members List</h1>
            <MemberActionBar members={members} setQueryResults={setQueryResults} />
            <div className="member-list-labels">
                <h3>Name</h3>
                <h3>Email</h3>
                <h3>City</h3>
            </div>
            <MemberList queryResults={queryResults} />
            <br></br>
      <Link to='/AddMember'>Edit Member List</Link>
            

        </>
    );
}

export default Members;