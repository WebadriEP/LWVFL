import React from 'react'

// components
import QuickActionItem from "./QuickActionItem";

// css
import './dashboardStyles.css'

const QuickActions = () => {
  return (
    <div className="quick-actions shadow">
      <QuickActionItem name="Quick Action 1" description="Description" />
      <QuickActionItem name="Quick Action 2" description="Description" />
      <QuickActionItem name="Quick Action 3" description="Description" />
      <QuickActionItem name="Quick Action 4" description="Description" />
    </div>
  )
}

export default QuickActions