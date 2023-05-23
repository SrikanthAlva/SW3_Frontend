import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Stack,
  VStack,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { write } from 'fs'
import { useState } from 'react'
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa'
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi'
import { MultiStepForm } from '../components'
import { Form1, Form2, GameResult, GameStatus, NoAction, RevealSecret } from '../components/rps'
import { shortAddress } from '../utils/minorUtils'

const RockPaperScissors = () => {
  const [gameType, setGameType] = useState('')
  const [gameData, setGameData] = useState({ initiator: '', responder: '', initiatorHash: '' })
  const { address, isConnecting, isDisconnected } = useAccount()

  //   const {
  //     config,
  //     error: prepareError,
  //     isError: isPrepareError,
  //   } = usePrepareContractWrite({
  //     address: TaskManageABI.contract as `0x${string}`,
  //     abi: TaskManageABI.abi,
  //     functionName: 'createTask',
  //     args: [debouncedTask.assignee, debouncedTask.description],
  //     enabled: Boolean(debouncedTask.assignee) && Boolean(debouncedTask.description),
  //     overrides: {
  //       value: ethers.utils.parseEther('0.001'),
  //     },
  //   })

  //   const { data, error, isError, write } = useContractWrite(config)

  // return (
  //   <VStack>
  //     {!gameType && (
  //       <HStack>
  //         <Box>
  //           <Button onClick={() => setGameType('NewGame')}>Create New Game</Button>
  //         </Box>
  //         <Box>
  //           <Button onClick={() => setGameType('JoinGame')}>Join Game</Button>
  //         </Box>
  //       </HStack>
  //     )}
  //     {gameType === 'NewGame' && (
  //       <VStack>
  //         <FormControl id="initiator">
  //           <FormLabel>Initiator</FormLabel>
  //           <Heading>{shortAddress(address)}</Heading>
  //         </FormControl>
  //         <FormControl id="responder">
  //           <FormLabel>Responder</FormLabel>
  //           <Input
  //             placeholder="0x1234...5678"
  //             _placeholder={{ color: 'gray.500' }}
  //             type="text"
  //             onChange={(e) => setGameData({ ...gameData, responder: e.target.value })}
  //             value={gameData.responder}
  //           />
  //         </FormControl>
  //         <FormControl id="fees">
  //           <FormLabel>Secret Hash</FormLabel>
  //           <InputGroup>
  //             <InputLeftAddon children="0x" />
  //             <Input
  //               placeholder="Secret Hash"
  //               _placeholder={{ color: 'gray.500' }}
  //               type="text"
  //               onChange={(e) => setGameData({ ...gameData, initiatorHash: e.target.value })}
  //               value={gameData.initiatorHash}
  //             />
  //           </InputGroup>
  //         </FormControl>
  //         <Stack spacing={6}>
  //           <Button
  //             bg={'brand.500'}
  //             color={'white'}
  //             _disabled={{
  //               bg: 'gray.600',
  //               cursor: 'not-allowed',
  //             }}
  //             _hover={{
  //               bg: 'brand.600',
  //             }}
  //             onClick={(e) => {
  //               e.preventDefault()
  //             }}
  //           >
  //             {false ? 'Creating...' : 'Create Task'}
  //           </Button>
  //         </Stack>
  //       </VStack>
  //     )}
  //   </VStack>
  // )

  // return <MultiStepForm />
  return (
    <VStack spacing={{ base: '30px' }}>
      <HStack
        minH={{ base: '80vh', md: '80vh' }}
        wrap={'wrap'}
        align={'center'}
        justify={'center'}
        mb={'10px'}
      >
        <HStack w="100%" justifyContent={'center'} fontWeight="normal" my="10%">
          <FaHandRock size={'30px'} color={'brand.50'} />
          <FaHandPaper size={'30px'} color={'brand.500'} />
          <FaHandScissors size={'30px'} color={'brand.600'} />
        </HStack>
        {/* <Form1 />
      <Form2 />
      <GameStatus />
      <NoAction />
      <RevealSecret />
      <GameResult /> */}
        <MultiStepForm />
        {/* <Button my={'2rem'} colorScheme="teal">
        Continue
      </Button> */}
      </HStack>
    </VStack>
  )
}
export default RockPaperScissors
