import React, { useRef } from "react"
import ReactToPrint from "react-to-print"
import { Container, GridItem, VStack, Icon, Heading } from "@chakra-ui/react"
import { FiPrinter } from "react-icons/fi"
import { Report } from "./Report"
import QuickActionItem from "./QuickActionItem"

export default function PrintItem() {
  let componentRef = useRef()

  return (
    <>
      {/* Uses the ReactToPrint component to determine what button to use as the trigger */}
      <ReactToPrint
        // Uses the griditem as the trigger
        // Can't abstract into a single component because the trigger can only take a single primative component, so it makes it easier.
        trigger={() => (
          <div>
            <GridItem
              py={6}
              px={8}
              transition="all 200ms ease-in-out"
              borderRadius={10}
              _hover={{
                backgroundColor: "gray.50",
                cursor: "pointer",
              }}
            >
              <VStack alignItems="center" justifyContent="space-around">
                {/* Icon */}
                <Icon as={FiPrinter} boxSize={8} />

                {/* Header */}
                <Heading size="md" marginBottom={0} color="gray.700">
                  Health Report
                </Heading>
              </VStack>
            </GridItem>
          </div>
        )}
        //  Uses the componentRef as the content
        content={() => componentRef.current}
      />

      {/* The component to be printed when called */}

      <Container display="none">
        <Report ref={componentRef} />
      </Container>
    </>
  )
}
