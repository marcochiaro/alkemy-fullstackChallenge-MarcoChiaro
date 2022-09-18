import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Modal, Table } from 'antd'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import EditModal from './EditModal/index'

const Wrapper = styled.div`
  overflow: auto;
`

const HomeTable = ({
  operations,
  getAllOperations,
  isLoading,
  deleteOperationById,
  editOperationById,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingOperation, setEditingOperation] = useState(null)
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id ',
    },
    {
      title: 'Concept',
      dataIndex: 'concept',
      key: 'concept',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'date',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      filters: [
        {
          text: 'Entry',
          value: 'ENTRY',
        },
        {
          text: 'Outflow',
          value: 'OUTFLOW',
        },
      ],
      key: 'type',
      onFilter: (value, record) => record.type.indexOf(value) === 0,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (operation) => {
        async function onDelete() {
          return handleDelete(operation)
        }
        async function onEdit() {
          return handleEdit(operation)
        }

        return (
          <>
            <EditOutlined onClick={onEdit} />
            <DeleteOutlined
              onClick={onDelete}
              style={{ color: 'red', marginLeft: 12 }}
            />
          </>
        )
      },
    },
  ]

  useEffect(() => {
    getAllOperations()
  }, [])

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra)
  }

  const handleDelete = (operation) => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this operation?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {
        deleteOperationById(operation.id)
      },
    })
  }

  const handleEdit = (operation) => {
    setIsEditing(true)
    setEditingOperation(operation)
  }

  return (
    <Wrapper>
      <Table
        dataSource={operations}
        columns={columns}
        pagination={false}
        onChange={onChange}
        loading={isLoading}
        renderEmpty={'No Operations'}
      />
      <EditModal
        visible={isEditing}
        setVisible={setIsEditing}
        editOperationById={editOperationById}
        editingOperation={editingOperation}
      />
    </Wrapper>
  )
}

export default HomeTable
