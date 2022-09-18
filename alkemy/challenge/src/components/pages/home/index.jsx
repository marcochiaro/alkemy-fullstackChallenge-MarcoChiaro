import styled from 'styled-components'

import useOperations from '../../../hook/useOperations'
import BalanceCard from './components/balanceCard'
import FormOperation from './components/formOperation'
import HomeTable from './components/homeTable/index'
// import UserLogin from './components/userLogin'

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`

const Home = () => {
  const {
    operations,
    isLoading,
    balance,
    getAllOperations,
    deleteOperationById,
    createNewOperation,
    editOperationById,
  } = useOperations()

  return (
    <Wrapper>
      <BalanceCard balance={balance} />
      <FormWrapper>
        <FormOperation createNewOperation={createNewOperation} />
      </FormWrapper>
      <HomeTable
        operations={operations}
        isLoading={isLoading}
        getAllOperations={getAllOperations}
        deleteOperationById={deleteOperationById}
        editOperationById={editOperationById}
      />
      {/* <UserLogin /> */}
    </Wrapper>
  )
}

export default Home
