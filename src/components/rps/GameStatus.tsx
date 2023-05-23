import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react'
import { useContractRead} from 'wagmi'
import RPS_ABI from '../../assets/constants/RockPaperScissors.json'
import networkMapping from '../../assets/constants/network-mapping.json'
import { useState } from 'react'
import { shortAddress } from '../../utils/minorUtils'

interface GameData {
  initiator: string
  initiator_state: number
  initiator_hash: string
  responder: string
  responder_state: number
  responder_hash: string
  state: number
  winner: string
  comment: string
}

enum GameState {
  INITIATED,
  RESPONDED,
  WIN,
  DRAW,
}
enum PlayerState {
  PENDING,
  PLAYED,
  CHOICE_STORED,
}

const GameStatus = () => {
  const [gameData, setGameData] = useState<GameData>()
  const { data } = useContractRead({
    address: networkMapping['80001']['RockPaperScissors'] as `0x${string}`,
    abi: RPS_ABI,
    functionName: 'getGameDetails',
    args: [
      '0x91C2352245065B9e5d2514a313b60c1f01BfF60F',
      '0x9519Aea08453696F983b01266d57B8D62c70Ec2f',
    ],
    onSuccess(data: any) {
      setGameData({
        initiator: data.initiator,
        initiator_state: data.initiator_state,
        initiator_hash: data.initiator_hash,
        responder: data.responder,
        responder_state: data.responder_state,
        responder_hash: data.responder_hash,
        state: data.state,
        winner: data.winner,
        comment: data.comment,
      })
    },
  })
  return (
    <>
      <VStack>
        <HStack justifyContent={'center'} my={'2rem'}>
          <Heading fontSize={'lg'}>{shortAddress(gameData?.initiator)}</Heading>
          <Heading fontSize={'md'}>vs</Heading>
          <Heading fontSize={'lg'}>{shortAddress(gameData?.responder)}</Heading>
        </HStack>
        <VStack>
          <Box bgColor={'teal.50'} p={'2rem'} mb={'1rem'}>
            <Text>Game Status: {GameState[gameData?.state || 0]}</Text>
            <Text>Winner Address: {gameData?.winner}</Text>
            <Text>Game Comment: {gameData?.comment}</Text>
          </Box>

          <HStack>
            <VStack bgColor={'second.500'} p={'2rem'} color={'white'}>
              <Text>Initaitor State: {PlayerState[gameData?.initiator_state || 0]}</Text>
              <Text>Initaitor Hash: {shortAddress(gameData?.initiator_hash)}</Text>
            </VStack>
            <VStack bgColor={'brand.500'} p={'2rem'} color={'white'}>
              <Text>Responder State: {PlayerState[gameData?.responder_state || 0]}</Text>
              <Text>Responder Hash: {shortAddress(gameData?.responder_hash)}</Text>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
    </>
  )
}
export default GameStatus
