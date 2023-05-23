import {
  useRadioGroup,
  VStack,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftAddon,
  Input,
  Progress,
  HStack,
  Heading,
} from '@chakra-ui/react'
import { useState } from 'react'
import { useAccount } from 'wagmi'
import RadioCard from '../RadioCard'

const RevealSecret = () => {
  const { address, isConnecting, isDisconnected } = useAccount()
  const [gameData, setGameData] = useState({ initiator: '', responder: '', initiatorHash: '' })
  const options = ['Rock', 'Paper', 'Scissors']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'RockPaperScissors',
    defaultValue: 'Rock',
    onChange: console.log,
  })
  const group = getRootProps()
  return (
    <VStack>
      <Heading>Reveal Secret</Heading>
      <FormControl id="createHash">
        <FormLabel>Selected Option</FormLabel>
        <HStack {...group} mb={'1rem'}>
          {options.map((value) => {
            const radio = getRadioProps({ value })
            return (
              <RadioCard key={value} {...radio}>
                {value}
              </RadioCard>
            )
          })}
        </HStack>
      </FormControl>
      <FormControl id="createHash">
        <FormLabel>
          Secret Word <span style={{ color: 'brown' }}>[Case Sensitive]</span>
        </FormLabel>
        <Input placeholder="Secret Word" _placeholder={{ color: 'gray.500' }} type="text" />
      </FormControl>
    </VStack>
  )
}
export default RevealSecret
