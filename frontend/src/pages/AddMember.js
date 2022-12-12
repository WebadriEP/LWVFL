import { useEffect } from "react"
import { useMembersContext } from "../hooks/useMembersContext"
import React from 'react';



// components
import MemberDetails from "../components/members/MemberDetails"
import AddMemberForm from '../components/members/AddMemberForm'

const AddMember = () => {
  const { members, dispatch } = useMembersContext()

  useEffect(() => {
    const fetchMembers = async () => {
      const response = await fetch('/api/members')
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_MEMBERS', payload: json})
      }
    }

    fetchMembers()
  }, [dispatch])

  return (
    
    <div className="addmember">
      
      <div className="members">
      <h1>Edit Member List</h1>
        {members && members.map(member => (
          <MemberDetails member={member} key={member._id} />
        ))}
      </div>
      <AddMemberForm />
    </div>
  )
}

export default AddMember