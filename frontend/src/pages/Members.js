
import React from 'react';
import { Heading } from '@chakra-ui/react';


// components
import MemberActionBar from "../components/members/MemberActionBar";
import MemberDatatable from "../components/members/MemberDatatable";
import AddMemberPop from '../components/members/AddMemberPop';
function Members() {

    return(
        <>
            <Heading mb={5}>Members</Heading>
            {/* <MemberActionBar /> */}
            <div> <AddMemberPop /></div>
            <MemberDatatable />
        </>
    );
}

export default Members;