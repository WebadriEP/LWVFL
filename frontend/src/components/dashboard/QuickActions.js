import React from 'react'

// components
import QuickActionItem from "./QuickActionItem";

// css
import './dashboardStyles.css'

const QuickActions = () => {
  return (
    <div className="quick-actions shadow">
      <QuickActionItem page="members" name="All Members" description="View and search a list of all members" />
      <QuickActionItem page="donors" name="All Donors" description="View and search a list of all donors" />
      <QuickActionItem page="engagement" name="Engagement" description="View a list of those marked for engagement" />
      <QuickActionItem page="reports/new" name="Generate Report" description="Instantly generate a new report from existing data" />
    </div>
  )
}

export default QuickActions