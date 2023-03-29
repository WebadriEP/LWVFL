import { Link } from "react-router-dom"
import React from "react"
import { GridItem, Heading, VStack, Icon } from "@chakra-ui/react"

// css
import "./dashboardStyles.css"

const QuickActionItem = (props) => {
  return (
    <GridItem
      as={Link}
      to={props.page}
      py={6}
      px={8}
      transition="all 200ms ease-in-out"
      borderRadius={10}
      _hover={{
        backgroundColor: "gray.50",
      }}
    >
      <VStack
        alignItems="center"
        justifyContent="space-around"
      >
        {/* Icon */}
        <Icon
          as={props.icon}
          boxSize={8}
        />

        {/* Header */}
        <Heading
          size="md"
          marginBottom={0}
          color="gray.700"
        >
          {props.name}
        </Heading>
      </VStack>
    </GridItem>
  )
}

export default QuickActionItem
