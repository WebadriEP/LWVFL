
import './engagementStyles.css'

const EngagementListItem = () => {
    return (
        <div className="engagement-list-item">

            {/* Personal Information */}
            <div className="pci">
                <h3>FirstName LastName</h3>
                <p>Donor/Member</p>
            </div>

            {/* Member/Donor Action Buttons */}
            <div className="actions">
                <button>View</button>
                <button>Copy Email</button>
                <button>Mark as Contacted</button>
            </div>
        </div>
    )
}

export default EngagementListItem;
