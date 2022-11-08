import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSingleMember } from "../api/axios";

// css
import '../components/members/memberStyles.css'

// components
import MemberDetail from "../components/members/MemberDetail";

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

  return (
    <main>
      <h1>Viewing Member: {member.firstName} {member.lastName}</h1>

      <div className="member-details shadow">
        <div className="details-section">
          <MemberDetail label="Full Name" detail={`${member.firstName} ${member.lastName}`}/>
          <MemberDetail label="Gender" detail={`Not specified`}/>
          <MemberDetail label="Household" detail={`None`}/>
          <MemberDetail label="Membership Type" detail={`Student`}/>
        </div>
      </div>
    </main>
  )
}

export default Member