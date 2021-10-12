interface TextProps {
  input: any
  isCommand?: any
  isError: any
  hasBuffer?: any
}

export const Text = ({ input, isCommand, isError, hasBuffer }: TextProps) => <>
  <div>
    {isCommand && <div id="query">{`RT C:\Users\Guest>`}</div>}
    <span className={!isCommand && isError ? 'error' : ''}>{input}</span>
  </div>
  {hasBuffer && <div></div>}
</>