// css
import './memberStyles.css'

const MemberListItem = ({ member }) => {
    let { firstName, lastName, email } = member;

    return (
        <div className='member-list-item'>
            {/* Make the name clickable -> Links to that member's detailed page */}
            <h3>{firstName} {lastName}</h3>
            <h3>{email}</h3>
        </div>
    );
}

export default MemberListItem;