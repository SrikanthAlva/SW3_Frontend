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
  HStack,
  FormLabel,
  InputGroup,
  InputRightAddon,
  Divider,
  VStack,
  Center,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { useDebounce } from '../hooks'
import TaskManageABI from '../assets/abi/TaskManage.json'
import TaskSvg from '../assets/task.svg'
import { GistDisplay, Task } from '../components'
import { BigNumberish, ethers } from 'ethers'
import { ChevronDownIcon } from '@chakra-ui/icons'

type TaskType = [id: BigNumberish, assignee: string, status: number, taskDesc: string]

export default function TaskManage() {
  const [task, setTask] = useState({ assignee: '', description: '' })
  const debouncedTask = useDebounce(task, 500)

  const { data: recentTasks } = useContractRead({
    address: TaskManageABI.contract as `0x${string}`,
    abi: TaskManageABI.abi,
    functionName: 'getRecentTasks',
    select: (data) => data as TaskType[],
    onSuccess(data) {
      console.log('Success', data)
    },
    watch: true,
  })

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: TaskManageABI.contract as `0x${string}`,
    abi: TaskManageABI.abi,
    functionName: 'createTask',
    args: [debouncedTask.assignee, debouncedTask.description],
    enabled: Boolean(debouncedTask.assignee) && Boolean(debouncedTask.description),
    overrides: {
      value: ethers.utils.parseEther('0.001'),
    },
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    setTask({ assignee: '', description: '' })
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
        <Image src={TaskSvg} boxSize={{ base: 'sm', md: 'md' }}></Image>

        <Stack
          spacing={4}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={{ base: '12' }}
          my={{ base: '6', md: '12' }}
        >
          <Heading
            lineHeight={1.5}
            fontSize={{ base: '2xl', md: '4xl' }}
            color={'brand.500'}
            alignSelf={'center'}
          >
            Task Manage
          </Heading>
          <FormControl id="assignee">
            <FormLabel>Task Assignee</FormLabel>
            <Input
              placeholder="0x1234...5678"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              onChange={(e) => setTask({ ...task, assignee: e.target.value })}
              value={task.assignee}
            />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Task Description</FormLabel>
            <Input
              placeholder="Describe the Task"
              _placeholder={{ color: 'gray.500' }}
              type="text"
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              value={task.description}
            />
          </FormControl>
          <FormControl id="fees">
            <FormLabel>Creation Fees</FormLabel>
            <InputGroup>
              <Input
                placeholder="Describe the Task"
                _placeholder={{ color: 'gray.500' }}
                type="text"
                value={'0.001'}
                isDisabled={true}
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
                write?.()
              }}
              isDisabled={!write || isLoading || !task.assignee || !task.description}
            >
              {isLoading ? 'Creating...' : 'Create Task'}
            </Button>
            {isSuccess && (
              <Stat>
                <StatLabel>Task Creation Successfully</StatLabel>
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
      <Stack
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
        wrap={'wrap'}
      >
        <Heading fontSize={{ base: '2xl', md: '4xl' }} color={'second.500'}>
          Recent Tasks
        </Heading>
        {recentTasks && recentTasks.length > 0 ? (
          <HStack
            justifyContent={'space-evenly'}
            spacing={{ base: '10px', md: '24px' }}
            wrap={'wrap'}
          >
            {recentTasks.map((task, idx) => (
              <Task
                key={task[0].toString()}
                id={task[0].toString()}
                description={task[3]}
                status={task[2]}
                address={task[1]}
              />
            ))}
          </HStack>
        ) : (
          <Heading> No Recent Tasks Available</Heading>
        )}
      </Stack>
      <GistDisplay id={'2db5d726bb52ca98737cbfcb93646d2c'} />
    </VStack>
  )
}
