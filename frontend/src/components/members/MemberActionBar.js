// components
import React from 'react';
import { Button, Flex } from '@chakra-ui/react';

const MemberActionBar = () => {
  return (
    <Flex direction='row' bg='white' shadow='lg' mb={5} borderRadius={10}>
      <Button colorScheme='gray'>
        <i className="fa fa-plus"></i>
      </Button>
    </Flex>
  )
}

export default MemberActionBar