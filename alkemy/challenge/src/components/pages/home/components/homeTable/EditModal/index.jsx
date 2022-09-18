import { Input, Modal } from 'antd'
import { useEffect, useState } from 'react'

const EditModal = ({
  visible,
  setVisible,
  editingOperation,
  editOperationById,
}) => {
  const [currentOperation, setCurrentOperation] = useState()

  useEffect(() => {
    setCurrentOperation(editingOperation)
  }, [editingOperation])

  const onOk = async () => {
    console.log(currentOperation)
    await editOperationById(currentOperation.id, currentOperation)
    setVisible(false)
  }

  return (
    <Modal
      title="Edit operation"
      visible={visible}
      okText="Save"
      onCancel={() => {
        setVisible(false)
      }}
      onOk={onOk}
    >
      <Input
        addonAfter="$"
        style={{ width: '100%' }}
        value={currentOperation?.amount}
        onChange={(e) => {
          setCurrentOperation((pre) => {
            return { ...pre, amount: e.target.value }
          })
        }}
      />

      <Input
        value={currentOperation?.concept}
        onChange={(e) => {
          setCurrentOperation((pre) => {
            return { ...pre, concept: e.target.value }
          })
        }}
      />
    </Modal>
  )
}

export default EditModal
