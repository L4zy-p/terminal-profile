interface UserTextProps {
  input: any
  theme: any
}

export const UserText = ({ input, theme }: UserTextProps) => <div>
  <div id="query">{`C:\\Users\\Guest>`}</div>
  <span>{input}</span>
  <div id="cursor" style={theme}></div>
</div>