import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import { FaReact, FaHardHat, FaGithub } from 'react-icons/fa'
import { SiTypescript, SiSolidity, SiNetlify } from 'react-icons/si'

interface CardProps {
  heading: string
  icon: ReactElement
  href: string
}

const Card = ({ heading, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: '150px', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={'center'} spacing={2}>
        <Flex
          w={{ base: 8, md: 16 }}
          h={{ base: 8, md: 16 }}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size={{ base: 'sm', md: 'md' }}>{heading}</Heading>
          {/* <Text mt={1} fontSize={'sm'}>
            {description}
          </Text> */}
        </Box>
        <Link isExternal color={'brand.500'} size={'sm'} href={href}>
          Learn more
        </Link>
      </Stack>
    </Box>
  )
}

export default function BuiltWith() {
  return (
    <Box p={4} mb={8}>
      <Stack spacing={4} as={Container} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', md: '4xl' }} color={'second.500'}>
          Built With
        </Heading>
      </Stack>
      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={{ base: 2, md: 6 }} justify="center">
          <Card
            heading={'React'}
            icon={
              <Icon
                as={FaReact}
                w={{ base: 5, md: 10 }}
                h={{ base: 5, md: 10 }}
                color={'#087EA4'}
              />
            }
            href={'https://react.dev/'}
          />
          <Card
            heading={'Typescript'}
            icon={
              <Icon
                as={SiTypescript}
                w={{ base: 5, md: 10 }}
                h={{ base: 5, md: 10 }}
                color={'#3178C6'}
              />
            }
            href={'https://www.typescriptlang.org/'}
          />
          <Card
            heading={'GitHub'}
            icon={
              <Icon as={FaGithub} w={{ base: 5, md: 10 }} h={{ base: 5, md: 10 }} color={'black'} />
            }
            href={'https://github.com/'}
          />
          <Card
            heading={'Solidity'}
            icon={
              <Icon
                as={SiSolidity}
                w={{ base: 5, md: 10 }}
                h={{ base: 5, md: 10 }}
                color={'black'}
              />
            }
            href={'https://docs.soliditylang.org/'}
          />
          <Card
            heading={'Hardhat'}
            icon={
              <Icon
                as={FaHardHat}
                w={{ base: 5, md: 10 }}
                h={{ base: 5, md: 10 }}
                color={'#FFF100'}
              />
            }
            href={'https://hardhat.org/'}
          />
        </Flex>
      </Container>
    </Box>
  )
}
