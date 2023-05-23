import {
  Flex,
  Container,
  Heading,
  Stack,
  Text,
  Button,
  Image,
  Center,
  HStack,
  background,
} from '@chakra-ui/react'
import HeroSvg from '../assets/hero.svg'
import { BuiltWith } from '../components'

export default function Home() {
  return (
    <Container maxW={'5xl'} bg={'gray.50'}>
      <Stack textAlign={'center'} align={'center'} spacing={{ base: 8, xl: 10 }} py={{ base: 20 }}>
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', xl: '5xl' }}
          lineHeight={'110%'}
          color={'second.500'}
        >
          Web3 Dapps{' '}
          <Text as={'span'} color={'brand.500'}>
            made easy
          </Text>
        </Heading>
        <Text color={'gray.500'} w={{ base: 'sm', md: 'md' }}>
          Tons of Dapps crafted with passion. Visualize the Smart Contracts you build and learn to
          be part of the revolution.
        </Text>
        <Heading color={'second.500'} fontSize={{ base: 'xl' }}>
          Application is Under Development
        </Heading>
        {/* <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'brand'}
            bg={'brand.500'}
            _hover={{ bg: 'brand.600' }}
          >
            Get started
          </Button>
          <Button rounded={'full'} px={6}>
            Learn more
          </Button>
        </Stack> */}
        <Flex alignItems={'center'} justifyContent={'center'}>
          <Image src={HeroSvg} boxSize={{ base: 'sm', xl: 'sm' }} />
        </Flex>
      </Stack>
      <BuiltWith />
      {/* <Flex justifyContent={'center'}>
        <iframe
          src="https://subtlecrypto.substack.com/embed"
          style={{
            border: '1px solid #EEE',
            background: 'white',
            width: '100%',
            height: '320px',
            backgroundColor: 'transparent !important',
          }}
        ></iframe>
      </Flex> */}
    </Container>
  )
}
