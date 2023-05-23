import { ArrowRightIcon } from '@chakra-ui/icons'
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
  HStack,
  Center,
  Stack,
  Button,
  Radio,
  RadioGroup,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import TaskManageABI from '../assets/abi/TaskManage.json'
import { shortAddress } from '../utils/minorUtils'

enum TaskStatus {
  Pending,
  Running,
  Completed,
}

type TaskProps = {
  id: string
  address: string
  description: string
  status: TaskStatus
}

export default function Task(props: TaskProps) {
  const { id, address, description, status } = props

  const [value, setValue] = useState('1')

  const { config } = usePrepareContractWrite({
    address: TaskManageABI.contract as `0x${string}`,
    abi: TaskManageABI.abi,
    functionName: 'updateTaskStatus',
    args: [id, value],
  })

  const { data, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  useEffect(() => {
    setValue('1')
  }, [isSuccess])

  return (
    <Box
      w="24vh"
      rounded={'md'}
      my={6}
      overflow={'hidden'}
      bg="white"
      border={'0px'}
      borderColor="black"
      boxShadow={useColorModeValue('3px 3px 0 teal', '6px 6px 0 cyan')}
    >
      <Box
        h={'60px'}
        // borderBottom={'1px'}
        // borderColor="black"
        roundedTop={'sm'}
        p={'0.5rem'}
        bgColor={'brand.50'}
      >
        <Center>
          <Heading color={'brand.500'}>{id}</Heading>
        </Center>
      </Box>
      <Box p={2}>
        <Box bg="teal" display={'inline-block'} px={2} py={1} color="white" mb={1}>
          <Text fontSize={'xs'}>{TaskStatus[status]}</Text>
        </Box>
        <Heading color={'black'} fontSize={'md'} noOfLines={1} my={'2px'}>
          {shortAddress(address)}
        </Heading>
        <Text color={'gray.500'} noOfLines={2} fontSize={'sm'} minHeight={'40px'}>
          {description}
        </Text>
      </Box>
      <HStack borderTop={'1px'} color="teal" p={'8px'} justifyContent={'space-between'}>
        <RadioGroup onChange={setValue} value={value}>
          <Stack direction="column">
            <Radio size="sm" colorScheme="teal" value="1" p={'0px'}>
              <Text fontSize={'sm'}>Running</Text>
            </Radio>
            <Radio size="sm" colorScheme="teal" value="2" p={'0px'}>
              <Text fontSize={'sm'}>Completed</Text>
            </Radio>
          </Stack>
        </RadioGroup>
        <Button onClick={write} isDisabled={!write || isLoading}>
          <ArrowRightIcon color={'teal'} />
        </Button>
      </HStack>
    </Box>
  )
}
