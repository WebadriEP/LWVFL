// components
import MemberActionBar from "../components/members/MemberActionBar";
import MemberList from "../components/members/MemberList";
import AddMember from "./AddMember"
// css
import '../components/members/memberStyles.css'

const Members = () => {
    return(
        <>
            <h1>Members List</h1>
            <MemberActionBar />
            <div className="member-list-labels">
                <h3>Member Name</h3>
                <h3>Email</h3>
                <h3>Phone Number</h3>
            </div>
            <AddMember />
        </>
    );
}

export default Members;