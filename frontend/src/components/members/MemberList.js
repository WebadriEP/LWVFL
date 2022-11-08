// components
import MemberListItem from './MemberListItem';

// css
import './memberStyles.css'

const MemberList = ({ queryResults }) => {
    // Generate a list of MemberListItem components
    const results = queryResults.map(member => <MemberListItem key={member._id} member={member} />); 

    // Handle no results found
    const content = results.length ? results : <article><p>No members found</p></article>;

    return (
        <main className="member-list shadow">{content}</main>
    );

}

export default MemberList
