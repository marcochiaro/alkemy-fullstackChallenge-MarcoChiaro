/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from 'react'

import {
  createOperation,
  deleteOperation,
  editOperation,
  getOperations,
} from '../services/services'

const useOperations = () => {
  const [operations, setOperations] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const balance = useMemo(() => {
    let totalBalance = 0
    operations.map((op) => {
      if (op.type === 'ENTRY') {
        totalBalance += op.amount
      } else {
        totalBalance -= op.amount
      }
    })
    return totalBalance
  }, [operations])

  const getAllOperations = async () => {
    try {
      setIsLoading(true)
      const response = await getOperations()
      if (response) {
        setOperations(response.data.data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const deleteOperationById = async (id) => {
    try {
      setIsLoading(true)
      const response = await deleteOperation(id)
      if (response) {
        setOperations(operations.filter((op) => op.id !== id))
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const createNewOperation = async (operation) => {
    try {
      const response = await createOperation(operation)
      if (response) {
        setOperations([...operations, response.data.data])
      }
    } catch (error) {
      console.error(error)
    }
  }

  const editOperationById = async (id, newOperation) => {
    try {
      const response = await editOperation(id, newOperation)
      console.log(response)
      if (response) {
        const newOperations = operations.map((op) => {
          return op.id === response.data.data.id ? response.data.data : op
        })
        setOperations(newOperations)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    operations,
    isLoading,
    balance,
    getAllOperations,
    deleteOperationById,
    createNewOperation,
    editOperationById,
  }
}

export default useOperations
