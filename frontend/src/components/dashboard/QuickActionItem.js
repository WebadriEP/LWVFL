// css
import './dashboardStyles.css'

const QuickActionItem = (props) => {
  return (
    <div className="quick-action">
      <h2>{props.name}</h2>
      <p className="text-description">{props.description}</p>
    </div>
  )
}

export default QuickActionItem