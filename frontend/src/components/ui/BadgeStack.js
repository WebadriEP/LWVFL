import React from 'react'
import { HStack, Tag, TagLabel } from '@chakra-ui/react'

const BadgeStack = ({ member, status }) => {
  let formattedMemberType, formattedStatus, formattedActiveStatus;
  let colorBadgeType, colorBadgeStatus, colorBadgeActiveStatus;

  // Format memberType
  switch (member.memberType) {
    case 'member':
      formattedMemberType = 'Member'
      colorBadgeType = 'blue.400'
      break
    case 'donor':
      formattedMemberType = 'Donor'
      colorBadgeType = 'yellow.400'
      break
    case 'memberdonor':
      formattedMemberType = 'Member & Donor'
      colorBadgeType = 'yellow.500'
      break
    default:
      colorBadgeType = 'blue.400'
      formattedMemberType = 'Member'
  }

  // Format memberActiveStatus
  switch (member.memberActiveStatus) {
    case 'active':
      colorBadgeActiveStatus = 'green.400'
      formattedActiveStatus = 'Active'
      break
    case 'inactive':
      colorBadgeActiveStatus = 'gray.400'
      formattedActiveStatus = 'Inactive'
      break
    default:
      colorBadgeActiveStatus = 'green.400'
      formattedActiveStatus = 'Active'
  }

  // Format memberStatus
  switch (status) {
    case 'engage':
      colorBadgeStatus = 'red'
      formattedStatus = 'Engage'
      break
    case 'contacted':
      colorBadgeStatus = 'purple'
      formattedStatus = 'Contacted'
      break
    case 'other':
      colorBadgeStatus = 'gray'
      formattedStatus = 'Other'
      break;
    default:
      formattedStatus = 'Open'
  }

  return (
    <HStack spacing={2} mb={4}>
      {/* Active Status */}
      <Tag bg={colorBadgeActiveStatus}>
        <TagLabel color='white'>{formattedActiveStatus}</TagLabel>
      </Tag>

      {/* Member Type */}
      <Tag bg={colorBadgeType}>
        <TagLabel color='white'>{formattedMemberType}</TagLabel>
      </Tag>

      {/* Member Status */}
      <Tag colorScheme={colorBadgeStatus} variant='outline'>
        <TagLabel color={colorBadgeStatus}>{formattedStatus}</TagLabel>
      </Tag>
    </HStack>
  )
}

export default BadgeStack