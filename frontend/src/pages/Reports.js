import React from 'react'
import { Link } from 'react-router-dom'
import ReportList from '../components/reports/ReportList'

// css
import '../components/reports/reportsStyles.css'

const Reports = () => {
  return (
    <>
      <div className="reports-heading">
        <h1>Reports</h1>
        <Link to='/reports/new'>New Report +</Link>
      </div>
      
      {/* <ReportList /> */}
    </>
  )
}

export default Reports