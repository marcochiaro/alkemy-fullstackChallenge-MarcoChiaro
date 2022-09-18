import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px;
  width: 100%;
`
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
}

const FormOperation = ({ createNewOperation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onFinish = (data) => {
    createNewOperation(data)
    setIsModalVisible(false)
  }

  return (
    <ButtonWrapper>
      <Button type="secondary" onClick={showModal}>
        Add a new operation
      </Button>
      <Modal
        title="Add a new operation"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        maskClosable={false}
      >
        <Form onFinish={onFinish} {...layout}>
          <Form.Item
            name="concept"
            label="Concept"
            rules={[{ required: true, message: 'Please enter the concept!' }]}
          >
            <Input placeholder="Type the concept" />
          </Form.Item>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: 'Please enter the amount!' }]}
          >
            <InputNumber addonAfter="$" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please specify the type!' }]}
          >
            <Select placeholde="Select the concept">
              <Select.Option value="ENTRY">Entry</Select.Option>
              <Select.Option value="OUTFLOW">Outflow</Select.Option>
            </Select>
          </Form.Item>
          <ButtonWrapper>
            <Button type="primary" htmlType="submit">
              OK
            </Button>
          </ButtonWrapper>
        </Form>
      </Modal>
    </ButtonWrapper>
  )
}

export default FormOperation
