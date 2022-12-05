import React from 'react'

// css
import './memberStyles.css'

const MemberDetail = (props) => {
  const { label, detail } = props

  return (
    <div className="detail">
      <h3>{label}</h3>
      <p>{detail}</p>
    </div>
  )
}

export default MemberDetail