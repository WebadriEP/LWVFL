import { Link } from "react-router-dom";

// css
import './memberStyles.css'

const MemberListItem = ({ member }) => {
    let { firstName, lastName, email, city } = member;

    return (
        <div className='member-list-item'>
            {/* Make the name clickable -> Links to that member's detailed page */}
            <Link to={`/member/${member._id}`} state={member}>
                <h3>{firstName} {lastName}</h3>
            </Link>
            <h3>{email}</h3>
            <h3>{city}</h3>

            <div className="actions">
                <button className="edit"><i className="fa fa-pencil"></i></button>
                <button className="delete"><i className="fa fa-remove"></i></button>
            </div>
        </div>
    );
}

export default MemberListItem;