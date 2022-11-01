// components
import Search from "../search/Search";
import PrimaryButton from "../buttons/PrimaryButton"

// css
import './memberStyles.css'
import '../buttons/buttonStyles.css'

const MemberActionBar = () => {
  return (
    <div className="member-action-bar shadow">
      <button className="btn-flex btn-action">Create Member +</button>
      <Search searchType='members' />
    </div>
  )
}

export default MemberActionBar