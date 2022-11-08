import { Link } from "react-router-dom";

// css
import './dashboardStyles.css'

const QuickActionItem = (props) => {
  return (
    <Link to={props.page} className="quick-action">
      <h2>{props.name}</h2>
      <p className="text-description">{props.description}</p>
    </Link>
  )
}

export default QuickActionItem