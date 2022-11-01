// components
import MemberListItem from './MemberListItem';

// css
import './memberStyles.css'

const MemberList = (props) => {

    return (
        <div className="member-list shadow">
            <MemberListItem />
            <MemberListItem />
            <MemberListItem />
            <MemberListItem />
        </div>
    );

}

export default MemberList
