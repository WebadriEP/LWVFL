import { useMembersContext } from '../../hooks/useMembersContext'
import React from 'react';

// date fns
//import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const MemberDetails = ({ member }) => {
  const { dispatch } = useMembersContext()

  const handleClick = async () => {
    const response = await fetch('/api/members/' + member._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_MEMBER', payload: json})
    }
  }

  return (
    <div className="member-details">
      <p><strong>First Name: </strong>{member.firstName}</p>
      <p><strong>Last Name: </strong>{member.lastName}</p>
      <p><strong>Email: </strong>{member.email}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  )
}

export default MemberDetails