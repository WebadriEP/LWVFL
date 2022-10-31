// css
import './memberStyles.css'

const MemberListItem = () => {

    let memberFirstName = "John";
    let memberLastName = "Doe";
    let memberEmail = "john@gmail.com";
    let memberPhone = "123-456-7890";

    return(
        <div className='member-list-item'>
            {/* Make the name clickable -> Links to that member's detailed page */}
            <h3>{memberFirstName} {memberLastName}</h3>
            <h3>{memberEmail}</h3>
            <h3>{memberPhone}</h3>
        </div>
    );
}

export default MemberListItem;