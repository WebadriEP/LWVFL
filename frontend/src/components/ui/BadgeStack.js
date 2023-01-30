import React from 'react'
import { HStack, Tag, TagLabel } from '@chakra-ui/react'

const BadgeStack = ({ member }) => {
  let formattedMemberType;
  let formattedStatus;
  let formattedActiveStatus;

  // Format memberType
  switch (member.memberType) {
    case 'member':
      formattedMemberType = 'Member'
      break
    case 'donor':
      formattedMemberType = 'Donor'
      break
    case 'memberdonor':
      formattedMemberType = 'Member & Donor'
      break
    default:
      formattedMemberType = 'Member'
  }

  // Format memberActiveStatus
  switch (member.memberActiveStatus) {
    case 'active':
      formattedActiveStatus = 'Active'
      break
    case 'inactive':
      formattedActiveStatus = 'Inactive'
      break
    default:
      formattedActiveStatus = 'Active'
  }

  // Format memberStatus
  switch (member.memberStatus) {
    case 'engage':
      formattedStatus = 'Engage'
      break
    case 'contacted':
      formattedStatus = 'Contacted'
      break
    case 'other':
      formattedStatus = 'Other'
      break;
    default:
      formattedStatus = 'No status'
  }

  return (
    <HStack spacing={2} mb={4}>\
      <Tag>
        <TagLabel>{formattedActiveStatus}</TagLabel>
      </Tag>
      <Tag>
        <TagLabel>{formattedMemberType}</TagLabel>
      </Tag>
      <Tag>
        <TagLabel>{formattedStatus}</TagLabel>
      </Tag>
      
    </HStack>
  )
}

export default BadgeStack