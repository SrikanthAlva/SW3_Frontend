import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Link,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
  Image,
  VStack,
  Center,
  HStack,
  Hide,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useDebounce } from '../hooks'
import SimpleStorageABI from '../assets/abi/SimpleStorage.json'
import MessageSvg from '../assets/message.svg'
import { GistDisplay } from '../components'
import { ChevronDownIcon } from '@chakra-ui/icons'
export default function SimpleStorage() {
  const [text, setText] = useState('')
  const debouncedText = useDebounce(text, 500)
  const { isDisconnected } = useAccount()

  const { data: textData } = useContractRead({
    address: SimpleStorageABI.contract as `0x${string}`,
    abi: SimpleStorageABI.abi,
    functionName: 'getData',
    watch: true,
  })

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: SimpleStorageABI.contract as `0x${string}`,
    abi: SimpleStorageABI.abi,
    functionName: 'setData',
    args: [debouncedText],
    enabled: Boolean(debouncedText),
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    setText('')
  }, [isSuccess])

  return (
    <VStack spacing={{ base: '30px' }}>
      <HStack
        minH={{ base: '80vh', md: '80vh' }}
        wrap={'wrap'}
        align={'center'}
        justify={'center'}
        mb={'10px'}
      >
        <Image src={MessageSvg} boxSize={{ base: 'xs', md: 'md' }}></Image>
        <Stack
          spacing={4}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={{ base: '12', md: '20' }}
          my={{ base: '6', md: '12' }}
        >
          <Heading
            lineHeight={1.5}
            fontSize={{ base: '2xl', md: '4xl' }}
            color={'brand.500'}
            alignSelf={'center'}
          >
            Simple Storage
          </Heading>
          <Text alignSelf={'center'} fontSize="lg">
            Current Message
          </Text>
          <Heading
            lineHeight={1.2}
            fontSize={{ base: '2xl', md: '3xl' }}
            color={'second.500'}
            alignSelf={'center'}
          >
            {`${textData}`}
          </Heading>
          <FormControl id="email">
            <Input
              placeholder="Enter New Message"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'brand.500'}
              color={'white'}
              _disabled={{
                bg: 'gray.600',
                cursor: 'not-allowed',
              }}
              _hover={{
                bg: 'brand.600',
              }}
              onClick={(e) => {
                e.preventDefault()
                write?.()
              }}
              isDisabled={!write || isLoading || !text}
            >
              {isDisconnected
                ? 'Wallet Not Connected'
                : isLoading
                ? 'Updating...'
                : 'Update Message'}
            </Button>
            {isSuccess && (
              <Stat>
                <StatLabel>Message Updated Successfully</StatLabel>
                <StatNumber>
                  {data && (
                    <Link href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>Explorer</Link>
                  )}
                </StatNumber>
                <StatHelpText></StatHelpText>
              </Stat>
            )}
            {(isPrepareError || isError) && <div>Error: {(prepareError || error)?.message}</div>}
          </Stack>
        </Stack>
      </HStack>

      {/* <Center bg={useColorModeValue('gray.50', 'gray.800')} mt={'-1rem'}>
          <ChevronDownIcon boxSize={12} />
        </Center> */}
      <GistDisplay id={'f09f0bff7f354ed8763db296a6912976'} />
    </VStack>
  )
}
