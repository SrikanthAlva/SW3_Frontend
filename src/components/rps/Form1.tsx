import {
  Heading,
  Flex,
  FormControl,
  RadioGroup,
  Stack,
  Radio,
  Text,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react'
import { useState } from 'react'

const Form1 = () => {
  const [gameType, setGameType] = useState('NewGame')
  const [playerRole, setPlayerRole] = useState('Initiator')
  const [opponent, setOpponent] = useState('')
  return (
    <VStack>
      <FormControl>
        <RadioGroup onChange={setGameType} value={gameType}>
          <Stack direction="column">
            <Radio size="lg" colorScheme="teal" value="NewGame" pt={'1rem'}>
              <Text fontSize={'2xl'}>Start New Game</Text>
            </Radio>
            <Radio size="lg" colorScheme="teal" value="JoinGame" py={'1rem'}>
              <Text fontSize={'2xl'}>Join/Continue Game</Text>
            </Radio>
          </Stack>
        </RadioGroup>
      </FormControl>
      {gameType == 'JoinGame' && (
        <FormControl mr="10%">
          <FormLabel>Join As</FormLabel>
          <RadioGroup onChange={setPlayerRole} value={playerRole}>
            <Stack direction="column">
              <Radio size="md" colorScheme="teal" value="Initiator" pt={'0.5rem'}>
                <Text fontSize={'xl'}>Initiator</Text>
              </Radio>
              <Radio size="md" colorScheme="teal" value="Responder" py={'0.5rem'}>
                <Text fontSize={'xl'}>Responder</Text>
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
      )}
      <FormControl id="opponent">
        <FormLabel>{`${
          gameType === 'NewGame'
            ? 'Responder'
            : playerRole === 'Initiator'
            ? 'Responder'
            : 'Initiator'
        } Address`}</FormLabel>
        <Input
          placeholder="0x1234...5678"
          _placeholder={{ color: 'gray.500' }}
          type="text"
          onChange={(e) => setOpponent(e.target.value)}
          value={opponent}
        />
      </FormControl>
    </VStack>
  )
}
export default Form1
