import {
  Box,
  Center,
  chakra,
  Container,
  Flex,
  Link,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react'
import { FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { SiSubstack } from 'react-icons/si'
import { ReactNode } from 'react'
import Logo from '../assets/logo.svg'

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
      target={'_blank'}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export default function Footer() {
  return (
    <Box minH={'20'} bg={useColorModeValue('white', 'gray.800')} className={'footer'}>
      <Container as={Stack} maxW={'6xl'} py={4} spacing={4} justify={'center'} align={'center'}>
        <Stack direction={'row'} spacing={6}>
          <Link href={'#'}>Home</Link>
          <Link href={'#'}>Dapps</Link>
          <Link href={'#'}>About</Link>
          <Link href={'#'}>Contact</Link>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={'solid'}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text noOfLines={2}> © 2023 Subtle Web3.</Text>
          <Center>
            <img src={Logo} />
          </Center>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Substack'} href={'https://subtlecrypto.substack.com/'}>
              <SiSubstack />
            </SocialButton>
            <SocialButton label={'Twitter'} href={'https://twitter.com/subtle_crypto'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'LinkedIn'} href={'https://www.linkedin.com/in/srikanthalva/'}>
              <FaLinkedin />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  )
}
