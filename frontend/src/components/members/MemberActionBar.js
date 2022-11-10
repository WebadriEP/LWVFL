// components
import MemberSearch from "../search/MemberSearch";
import PrimaryButton from "../buttons/PrimaryButton"

// css
import './memberStyles.css'
import '../buttons/buttonStyles.css'

const MemberActionBar = ({ members, setQueryResults }) => {
  return (
    <div className="member-action-bar shadow">
      {/* Serach Bar */}
      <MemberSearch members={members} setQueryResults={setQueryResults} />
      
      {/* Add New Member Button */}
      <button className="btn-action">+</button>
    </div>
  )
}

export default MemberActionBar