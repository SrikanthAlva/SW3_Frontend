import {
  useRadioGroup,
  HStack,
  VStack,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Progress,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react'
import { useState } from 'react'
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa'
import { useAccount } from 'wagmi'
import { shortAddress } from '../../utils/minorUtils'
import RadioCard from '../RadioCard'

const Form2 = () => {
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
      <FormControl id="secretHash">
        <FormLabel>Secret Hash</FormLabel>
        <InputGroup>
          <InputLeftAddon children="0x" />
          <Input placeholder="Secret Hash" _placeholder={{ color: 'gray.500' }} type="text" />
        </InputGroup>
      </FormControl>
      <FormControl>
        <Progress
          value={100}
          my="5%"
          mx="35%"
          borderRadius={'1rem'}
          colorScheme={'teal'}
        ></Progress>
      </FormControl>
      <FormControl id="createHash">
        <FormLabel>Choose</FormLabel>
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
          Secret <span style={{ color: 'brown' }}>[Case Sensitive]</span>
        </FormLabel>
        <Input placeholder="Secret Word" _placeholder={{ color: 'gray.500' }} type="password" />
      </FormControl>
      {/* <Stack spacing={6}>
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
            }}
          >
            {false ? 'Creating...' : 'Create Task'}
          </Button>
        </Stack> */}
    </VStack>
  )
}
export default Form2
