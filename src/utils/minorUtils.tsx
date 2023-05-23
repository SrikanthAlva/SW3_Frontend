export function shortAddress(address: string | `0x${string}` | undefined): string {
  if (address) {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`
  } else {
    return '0x0000...0000'
  }
}
