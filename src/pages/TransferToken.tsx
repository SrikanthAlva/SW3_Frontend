import {
  Flex,
  useColorModeValue,
  Stack,
  Heading,
  FormControl,
  Input,
  Button,
  FormLabel,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Link,
  Image,
  InputGroup,
  InputRightAddon,
} from '@chakra-ui/react'
import { parseEther } from 'ethers/lib/utils.js'
import { useEffect, useState } from 'react'
import {
  useAccount,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi'
import { useDebounce } from '../hooks'
import TransferSvg from '../assets/transfer.svg'
import { shortAddress } from '../utils/minorUtils'

export default function TransferToken() {
  const [to, setTo] = useState('')
  const debouncedTo = useDebounce(to, 500)
  const { address, isConnecting, isDisconnected } = useAccount()

  const [amount, setAmount] = useState('')
  const debouncedAmount = useDebounce(amount, 500)

  const { config } = usePrepareSendTransaction({
    request: {
      to: debouncedTo,
      value: debouncedAmount ? parseEther(debouncedAmount) : undefined,
    },
  })
  const { data, sendTransaction } = useSendTransaction(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    setTo('')
    setAmount('')
  }, [isSuccess])

  return (
    <Flex
      minH={'74vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Image src={TransferSvg} boxSize={{ base: 'sm' }}></Image>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
        my={12}
      >
        <Heading
          lineHeight={1.5}
          fontSize={{ base: '3xl', md: '4xl' }}
          color={'brand.500'}
          alignSelf={'center'}
        >
          Trasfer Tokens
        </Heading>
        <FormControl id="email">
          <FormLabel>Sender Address</FormLabel>
          <Heading>{shortAddress(address)}</Heading>
        </FormControl>
        <FormControl id="email">
          <FormLabel>Recipient Address</FormLabel>
          <Input
            placeholder="0xA0Cf…251e"
            _placeholder={{ color: 'gray.500' }}
            type="text"
            onChange={(e) => setTo(e.target.value)}
            value={to}
          />
        </FormControl>
        <FormControl id="">
          <FormLabel>Amount</FormLabel>
          <InputGroup>
            <Input
              placeholder="0.05"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <InputRightAddon children="MATIC" />
          </InputGroup>
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
              sendTransaction?.()
            }}
            isDisabled={isLoading || !sendTransaction || !to || !amount}
          >
            {isDisconnected ? 'Wallet Not Connected' : isLoading ? 'Sending...' : 'Send MATIC'}
          </Button>
          {isSuccess && (
            <Stat>
              <StatLabel>Transfered To {shortAddress(to)}</StatLabel>
              <StatNumber>{`${amount} MATIC`}</StatNumber>
              <StatHelpText>
                {data && (
                  <Link href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>Explorer</Link>
                )}
              </StatHelpText>
            </Stat>
          )}
        </Stack>
      </Stack>
    </Flex>
  )
}
