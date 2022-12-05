import React from 'react'

// css
import './memberStyles.css'

const MemberDetailEmail = (props) => {
  const { label, email } = props

  return (
    <div className="detail">

      {/* Detail label */}
      <h3>{label}</h3>

      {/* Email address container */}
      <span className="detailEmail">

        <a href={`mailto:${email}`}>{email}</a>

        {/* Copy email address button */}
        {/* Uses navigator.clipboard to write the email text to user's clipboard */}
        <button onClick={() => navigator.clipboard.writeText(detail)} className="btn-copy">
          {/* Icon */}
          <i className="fa fa-copy"></i> 
        </button>
      </span>
    </div>
  )
}

export default MemberDetailEmail