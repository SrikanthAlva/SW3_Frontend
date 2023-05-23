import { Box, Image, Heading, Text, Button, Link, Flex, useColorModeValue } from '@chakra-ui/react'
import ErrorSvg from '../assets/error.svg'
export default function ErrorPage() {
  return (
    <Flex
      minH={'70vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
      wrap={'wrap'}
      direction={'column'}
    >
      <Image src={ErrorSvg} boxSize={{ base: 'sm' }}></Image>
      <Heading size="xl" bgGradient="linear(to-r, brand.400, brand.600)" backgroundClip="text">
        Page Not Found
      </Heading>
      <Text color={'gray.500'} mb={6}>
        The page you're looking for does not seem to exist
      </Text>
      <Button
        colorScheme="teal"
        bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
        color="white"
        variant={'solid'}
      >
        <Link href="/">Go to Home</Link>
      </Button>
    </Flex>
  )
}
