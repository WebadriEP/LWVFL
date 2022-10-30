// components
import QuickActions from "../components/dashboard/QuickActions";
import MembersGraph from "../components/dashboard/MembersGraph";


// css
import '../components/dashboard/dashboardStyles.css'

const Dashboard = () => {
  return (
    <>
      {/* Page heading */}
      <h1>Dashboard</h1>

      {/* Quick Actions */}
      <QuickActions />

      {/* Graphs Section */}
      <section className='graphs'>

        {/* New Members */}
        <div className='graph shadow'>
          <h2>New Members by Month</h2>
          <MembersGraph />
        </div>
        
        {/* Another Statistic */}
        <div className='graph shadow'>
          <h2>Another Statistic</h2>
          <MembersGraph />
        </div>
      </section>
    </>
  )
}

export default Dashboard