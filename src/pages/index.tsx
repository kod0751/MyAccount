import { css } from '@emotion/react'
import styled from '@emotion/styled'

export default function Home() {
  return (
    <Container>
      <div css={bold}>Hello</div>
    </Container>
  )
}

const Container = styled.div`
  background-color: lightblue;
`
const bold = css`
  font-weight: bold;
`
