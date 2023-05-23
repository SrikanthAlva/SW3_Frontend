import { Box, Button, Collapse, Heading, useDisclosure, VStack } from '@chakra-ui/react'
import Gist from 'react-gist'
import { FaCode } from 'react-icons/fa'

type GistDisplayProps = {
  id: string
}

const GistDisplay = (props: GistDisplayProps) => {
  return (
    <VStack my={{ base: '18px' }} spacing={'2rem'}>
      <Heading fontSize={{ base: '2xl', md: '4xl' }} color={'second.500'}>
        Smart Contract Code
      </Heading>
      <Box w={{ base: '360px', md: '800px' }}>
        <Gist id={props.id} />
      </Box>
    </VStack>
  )
}
export default GistDisplay
