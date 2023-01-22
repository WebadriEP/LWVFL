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

  // Format memberType
  let type;
  switch (member.memberType) {
    case 'member':
      type = 'Member'
      break;
    case 'donor':
      type = 'Donor';
      break;
    case 'memberdonor':
      type = 'Member & Donor';
      break;
    default:
      type = 'Member';
  }

  // Format memberStatus
  let status;
  switch (member.memberStatus) {
    case 'active':
      status = 'Active';
      break;
    case 'inactive':
      status = 'Inactive';
      break;
    default:
      status = 'Active';
  }

  // Render donations
  // const donations = member.donations.map(donation => {
  //   <MemberDonation key={donation._id} donation={donation} />
  // })

  // Handle no donations found
  // const content = donations.length ? donations : <article><p>No donations found.</p></article>;

  return (
    <main>
      <h1>Details: {member.firstName} {member.lastName}</h1>
      <small className="updatedDate">Last Updated: {lastUpdated}</small>

      <div className="member-details shadow">
        {/* Personal details */}
        <div className="col-1">
          <MemberDetail label="Full Name" detail={`${member.firstName} ${member.lastName}`}/>
          <MemberDetail label="Email" detail={member.email} />
          <MemberDetail label="Phone" detail={member.phone} />
          <MemberDetail label="Gender" detail={member.gender} />
          <MemberDetail label="Date of Birth" detail={`${member.birthMonth}/${member.birthDay}/${member.birthYear}`} />
        </div>

        {/* Location information */}
        <div className="col-1 row-2">
          <MemberDetail label="Address" detail={member.homeAddress} />
          { member.addressLine2 ? <p>{member.addressLine2}</p> : null}
          <p>{member.city}, {member.state} {member.zip}</p>

          <MemberDetail label="Notes" detail={member.memberNotes} />
        </div>

        {/* Membership information */}
        <div className="col-2">
            <MemberDetail label="Member Type" detail={type} />
            <MemberDetail label="Member Status" detail={status} />
            <MemberDetail label="Member Since" detail={createdAt} />
        </div>

        {/* Donations */}
        <div className="col-2 row-2">
          <h3>Donations</h3>

          {/* Lists donations using map on the member.donations object */}
          <p>No donations found.</p>
        </div>
      </div>
    </main>
  )
}

export default Member