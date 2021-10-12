import { Text } from './text'

interface MultiTextProps {
  input: any[]
  isError: any
  hasBuffer: any
}

export const MultiText = ({ input, isError, hasBuffer }: MultiTextProps) => <>
  {input.map((s, i) => <Text key={i} input={s} isError={isError} />)}
  {hasBuffer && <div></div>}
</>