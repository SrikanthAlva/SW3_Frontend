import { Heading, Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

const GameResult = () => {
  const { address } = useAccount()
  let result = 3
  const winner = '0x91C2352245065B9e5d2514a313b60c1f01BfF60E'
  return (
    <>
      <div>GameResult</div>
      {result === 2 && winner === address && (
        <>
          <Heading>Congratuations!!!</Heading>
          <Text>You are the Winner 🎉🎉🎉</Text>
          <Text>You won against: 0x1234...1234</Text>
          <Text>Rock Crush Scissors</Text>
        </>
      )}
      {result === 2 && winner !== address && (
        <>
          <Heading>Oh No!</Heading>
          <Text>You have lost this Game</Text>
          <Text>You lost against: 0x3234...1234</Text>
          <Text>Rock Crush Scissors</Text>
        </>
      )}
      {result === 3 && (
        <>
          <Heading>Its a DRAWWWW</Heading>
          <Text>No Winners and No Losers</Text>
          <Text>You drawed against: 0x3234...1234</Text>
          <Text>Rock Draws Rock</Text>
        </>
      )}
    </>
  )
}
export default GameResult
