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
  Radio,
  RadioGroup,
  Progress,
  VStack,
  Center,
  HStack,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import PollABI from '../assets/abi/Poll.json'
import VotingSvg from '../assets/voting.svg'
import { ethers } from 'ethers'
import { GistDisplay } from '../components'
import { ChevronDownIcon } from '@chakra-ui/icons'

export default function Poll() {
  const pollId = '0'
  const [value, setValue] = useState('')
  const [votes, setVotes] = useState({ yesVotes: 0, noVotes: 0, totalVotes: 0 })
  const { address, isDisconnected } = useAccount()
  const abi = [
    {
      inputs: [
        {
          internalType: 'string',
          name: '_question',
          type: 'string',
        },
      ],
      name: 'createPoll',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'pollID',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'question',
          type: 'string',
        },
      ],
      name: 'NewPoll',
      type: 'event',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_pollID',
          type: 'uint256',
        },
        {
          internalType: 'bool',
          name: '_vote',
          type: 'bool',
        },
      ],
      name: 'vote',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '_pollID',
          type: 'uint256',
        },
      ],
      name: 'getResults',
      outputs: [
        {
          internalType: 'string',
          name: 'question',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'yesVotes',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'noVotes',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      name: 'hasVoted',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ] as const
  const { data: voted } = useContractRead({
    address: PollABI.contract as `0x${string}`,
    abi: abi,
    functionName: 'hasVoted',
    args: [ethers.BigNumber.from(pollId), address as `0x${string}`],
    watch: true,
    enabled: !!address,
  })

  const { data: pollResult } = useContractRead({
    address: PollABI.contract as `0x${string}`,
    abi: abi,
    functionName: 'getResults',
    args: [ethers.BigNumber.from(pollId)],
    watch: true,
  })

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: PollABI.contract as `0x${string}`,
    abi: abi,
    functionName: 'vote',
    args: [ethers.BigNumber.from(pollId), value === '1' ? true : false],
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    {
      const yesVotes = pollResult && ethers.utils.formatUnits(pollResult.yesVotes, 0)
      const noVotes = pollResult && ethers.utils.formatUnits(pollResult.noVotes, 0)
      const totalVotes = Number(yesVotes?.toString()) + Number(noVotes?.toString())
      setVotes({
        yesVotes: Number(yesVotes),
        noVotes: Number(noVotes),
        totalVotes: Number(totalVotes),
      })
    }
  }, [pollResult])

  useEffect(() => {
    setValue('')
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
       <Image src={VotingSvg} boxSize={{ base: 'xs', md: 'md' }}></Image>

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
            Web3 Poll
          </Heading>
          <Heading
            lineHeight={1.4}
            fontSize={{ base: '2xl' }}
            color={'second.500'}
            alignSelf={'center'}
            textAlign={'center'}
          >
            {`Are you eager to learn Web3?`}
          </Heading>
          <RadioGroup onChange={setValue} value={value} isDisabled={voted as boolean}>
            <Stack direction="row" justifyContent={'space-around'}>
              <Radio size="lg" colorScheme="teal" value={'1'} p={'0px'}>
                <Text fontSize={'lg'}>Yes! Cant Wait.</Text>
              </Radio>
              <Radio size="lg" colorScheme="red" value={'0'} p={'0px'}>
                <Text fontSize={'lg'}>Nah! Moving to AI</Text>
              </Radio>
            </Stack>
          </RadioGroup>
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
              isDisabled={!write || isLoading}
            >
              {isDisconnected
                ? 'Wallet Not Connected'
                : isLoading
                ? 'Getting Result...'
                : (voted as boolean)
                ? 'Already Voted'
                : 'Submit Poll'}
            </Button>
            {(isSuccess || (voted as boolean)) && (
              <Stat>
                <StatLabel mb={'5px'}>Total Votes: {votes.totalVotes}</StatLabel>
                <StatNumber mb={'5px'}>
                  <StatLabel>{`${((votes.yesVotes * 100) / votes.totalVotes).toFixed(
                    2
                  )}%`}</StatLabel>
                  <Progress
                    value={(votes.yesVotes * 100) / votes.totalVotes}
                    size="lg"
                    colorScheme="teal"
                    borderRadius={'10px'}
                  />
                </StatNumber>
                <StatNumber mb={'5px'}>
                  <StatLabel>{`${((votes.noVotes * 100) / votes.totalVotes).toFixed(
                    2
                  )}%`}</StatLabel>
                  <Progress
                    value={(votes.noVotes * 100) / votes.totalVotes}
                    size="lg"
                    colorScheme="red"
                    borderRadius={'10px'}
                  />
                </StatNumber>
                <StatHelpText mb={'5px'}>
                  {data && (
                    <Link href={`https://mumbai.polygonscan.com/tx/${data?.hash}`}>Explorer</Link>
                  )}
                </StatHelpText>
              </Stat>
            )}
            {(isPrepareError || isError) && (voted as boolean) === false && (
              <div>Error: {(prepareError || error)?.message}</div>
            )}
          </Stack>
        </Stack>
      </HStack>
      <GistDisplay id={'40671a7e33573ea9144e7ff3cc13b422'} />
    </VStack>
  )
}
