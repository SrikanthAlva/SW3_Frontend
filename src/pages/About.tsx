import { Container, Flex, Stack, Image, Heading, Text, Link, HStack } from '@chakra-ui/react'
import ProfileSvg from '../assets/profile.svg'
const About = () => {
  return (
    <Container maxW={'5xl'} bg={'gray.50'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Flex w={'full'} alignItems={'center'} justifyContent={'center'}>
          <Image src={ProfileSvg} boxSize={'sm'} />
        </Flex>
        <Heading>Srikanth Alva</Heading>
        <Text>Full Stack Web3 Developer</Text>
        <HStack>
          <Link href={'https://linkedin.com/in/srikanthalva'}>LinkedIn</Link>
          <Link href={'https://twitter.com/SrikanthAlva'}>Twitter</Link>
        </HStack>
        {/* <Text>
          NFT Contract 1. Skullios 2. Skhulls 3. AI Centurain 4. Seeds of Knowledge Soul Bound
          Tokens 1. Souls of Knowledge Web3 Integration for Games 1. Tavern by EgoVerse Upcoming
          Projects 1. Academia
        </Text> */}
      </Stack>
    </Container>
  )
}
export default About
