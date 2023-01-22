import { Link } from "react-router-dom";

// css
import './memberStyles.css'

const MemberListItem = ({ member }) => {
    let { firstName, lastName, email, city } = member;

    return (
        <div className='member-list-item'>
            <Link to={`/member/${member._id}`} state={member}>
                <p>{firstName} {lastName}</p>
            </Link>
            <p>{email}</p>
            <p>{city}</p>
            <div className="actions">
                {/* TODO: Add functionality to these action buttons */}
                <button className="edit"><Link to='/AddMember'><i className="fa fa-pencil"></i></Link></button>
                <button className="delete"><i className="fa fa-remove"></i></button>
            </div>
        
        </div>
    );
}

export default MemberListItem