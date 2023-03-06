import React from "react"
import { Box, SimpleGrid, Text } from "@chakra-ui/react"

export const ImportPlatforms = ({ updateParent, selected }) => {
  return (
    <SimpleGrid templateColumns="1fr 1fr" gap={5} marginY={8}>
      <Box
        onClick={updateParent("salesforce")}
        bg="gray.100"
        borderRadius={8}
        p={8}
        textAlign="center"
        cursor="pointer"
      >
        <Text>Salesforce</Text>
      </Box>
      <Box
        onClick={updateParent("neon")}
        bg="gray.100"
        borderRadius={8}
        p={8}
        textAlign="center"
        cursor="pointer"
      >
        <Text>Neon</Text>
      </Box>
    </SimpleGrid>
  )
}
