import { useState, useEffect } from "react";
import React from 'react';

import { useParams } from "react-router-dom";
import { getSingleMember } from "../api/axios";

// css
import '../components/members/memberStyles.css'

// components
import MemberDetail from "../components/members/MemberDetail";
import MemberDetailEmail from "../components/members/MemberDetailEmail";

const Member = (props) => {
  const { id } = useParams(); // Get the ID from the URL
  const [member, setMember] = useState({});

  // Acquire member details
  useEffect(() => {
    getSingleMember(id) // Axios call to get member by ID

    // Set member state
    .then(json => {
      setMember(json)
    })

    // Error handling
    .catch(err => {
      console.log(err)
    })
  }, [])

  // Format dates
  const createdAt = new Date(member.createdAt).toLocaleDateString();
  const lastUpdated = new Date(member.updatedAt).toLocaleDateString();

  return (
    <main>
      <h1>Viewing Member: {member.firstName} {member.lastName}</h1>
      <small className="updatedDate">Last Updated: {lastUpdated}</small>

      <div className="member-details shadow">
        <div className="details-section">
          {/* Full Name -- Dynamic */}
          <MemberDetail label="Full Name" detail={`${member.firstName} ${member.lastName}`}/>

          {/* Email -- Dynamic */}
          <MemberDetailEmail label="Email" email={member.email} />

          {/* Gender -- Hardcoded */}
          <MemberDetail label="Gender" detail={`Not specified`}/>

          {/* Household -- Hardcdded */}
          <MemberDetail label="Household" detail={`None`}/>

          {/* Member Type -- Hardcoded */}
          <MemberDetail label="Member Type" detail={`Student`}/>

          {/* Member Status -- Hardcoded */}
          <MemberDetail label="Member Status" detail={`Active`}/>

          {/* Member Since -- Dynamic */}
          <MemberDetail label="Member Since" detail={createdAt}/> 
        </div>
      </div>
    </main>
  )
}

export default Member