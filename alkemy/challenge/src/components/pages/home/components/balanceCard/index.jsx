import { Statistic } from 'antd'
import styled from 'styled-components'

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`

const BalanceCard = ({ balance }) => {
  return (
    <CardWrapper>
      <Statistic
        title="Account Balance (ARG)"
        value={balance}
        precision={2}
        style={{
          marginBottom: '15px',
        }}
      />
    </CardWrapper>
  )
}

export default BalanceCard
