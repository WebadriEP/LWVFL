import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

// components
import MemberActionBar from "../components/members/MemberActionBar";
import MemberList from "../components/members/MemberList";
import MemberListItem from "../components/members/MemberListItem";

// css
import '../components/members/memberStyles.css'

const Members = () => {
    const [members, setMembers] = useState([]); // State for members
    const [query, setQuery] = useState(''); // State for search query

    // Fetches members when the component is loaded
    useEffect(() => {
        const fetchMembers = async () => {

            // GET request
            await axios.get('/api/members')

                // Set member state 
                .then(response => {
                    setMembers(response.data)
                })

                // Handle errors
                .catch(error => {
                    console.log(error)
                })
        }

        fetchMembers(); // Run the function
    }, []) // Dependency array

    // Filter members based on search query
    const filteredMembers = useMemo(() => { // useMemo is used to prevent the function from running on every render
        return members.filter(member => {
            // TODO: Allow search by first/last name as well as email or phone numbers
            return member.firstName.toLowerCase().includes(query.toLowerCase()); // Filter based on first name only at this time
    })}, [members, query]);

    return(
        <>
            <h1>Members List</h1>

            {/* Placeholder search field */}
            <input type='search' value={query} onChange={e => setQuery(e.target.value)} placeholder='Search Members' />

            <MemberActionBar />
            <div className="member-list-labels">
                <h3>Member Name</h3>
                <h3>Email</h3>
                <h3>Phone Number</h3>
            </div>

            {filteredMembers && filteredMembers.map((member) => (
                <MemberListItem key={member._id} firstName={member.firstName} lastName={member.lastName} email={member.email} phone={member.phone} />
            ))}

            {/* <MemberList /> */}
        </>
    );
}

export default Members;