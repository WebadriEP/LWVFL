import { Button, Heading, Flex, Spacer, Box } from '@chakra-ui/react'
import Report from '../components/reports/Report'
import { PDFViewer } from '@react-pdf/renderer'

// css
import '../components/reports/reportsStyles.css'

const Reports = () => {
  const generateReport = () => {
    console.log('Generating report...')
  }

  return (
    <>
      <div className="reports-heading">
        <Flex direction='row' w='100%' align='center'>
          <Heading size='2xl'>Reports</Heading>
          <Spacer />
          <Button 
            colorScheme='blue' 
            onClick={() => generateReport()}
            loadingText='Generating'
          >
            Generate Report
          </Button>
        </Flex>
      </div>

      <Report />

      <PDFViewer>
        <Report />
      </PDFViewer>
      
      {/* <ReportList /> */}
    </>
  )
}

export default Reports