import React from 'react'
import ReportListItem from './ReportListItem'

// css

const ReportList = () => {
  // Generate a list of MemberListItem components
  const results = queryResults.map(report => 
    <ReportListItem key={report._id} report={report} 
  />); 

  // Handle no results found
  const content = results.length ? results : <article><p>No reports found</p></article>;

  return (
    <main className='member-list shadow'>
      {content}
    </main>
  )
}

export default ReportList