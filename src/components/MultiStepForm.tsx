import React, { useState } from 'react'
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react'

import { useToast } from '@chakra-ui/react'
import { shortAddress } from '../utils/minorUtils'
import { useAccount } from 'wagmi'
import RadioCard from './RadioCard'
import { ethers } from 'ethers'
import { FaHandRock, FaHandPaper, FaHandScissors } from 'react-icons/fa'
import RPS_ABI from '../assets/constants/RockPaperScissors.json'
import networkMapping from '../assets/constants/network-mapping.json'
import { useContractRead } from 'wagmi'
import { Form1, Form2, NoAction } from './rps'

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

export default function MultiStepForm() {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(20)
  const [gameData, setGameData] = useState<GameData>()
  const { address } = useAccount()

  const [gameDetails, setGameDetails] = useState({
    initiator: address,
    initiator_state: 0,
    initiator_hash: '',
    responder: '',
    responder_state: 0,
    responder_hash: '',
    state: 0,
    winner: '',
    comment: '',
  })

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
    enabled: false,
  })

  return (
    <Box
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 3px rgba(0,0,0,0.3)"
      minWidth={'30vw'}
      p={6}
      m="10px auto"
      as="form"
    >
      <Progress value={progress} mb="5%" mx="5%"></Progress>
      {step === 1 ? <Form1 /> : step === 2 ? <Form2 /> : <NoAction />}
      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              onClick={() => {
                setStep(step - 1)
                setProgress(progress - 20)
              }}
              isDisabled={step === 1}
              colorScheme="teal"
              variant="solid"
              w="7rem"
              mr="5%"
            >
              Back
            </Button>
            <Button
              w="7rem"
              isDisabled={step === 3}
              onClick={() => {
                setStep(step + 1)
                if (step === 5) {
                  setProgress(100)
                } else {
                  setProgress(progress + 20)
                }
              }}
              colorScheme="teal"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
          {step === 3 ? (
            <Button w="7rem" colorScheme="red" variant="solid">
              Submit
            </Button>
          ) : null}
        </Flex>
      </ButtonGroup>
    </Box>
  )
}
