import React, { useEffect, useState } from 'react'
import { AddBotEmail, DeleteBotEmail, GetBotEmails } from '../apis'
import AwesomeModal from '../components/flows/modal'

const TableComponent = () => {
  const [records, setRecords] = useState([])
  const [newRecord, setNewRecord] = useState({ email: '', password: '' })
  const [isOpen, setOpen] = useState(false)
  const [isDeleted, setDelete] = useState(false)
  const [selectedId, setSelectId] = useState('')

  const handleInputChange = e => {
    const { name, value } = e.target
    setNewRecord(prev => ({ ...prev, [name]: value }))
  }

  const addRecord = async () => {
    if (newRecord.email && newRecord.password) {
      const response = await AddBotEmail(newRecord)
      if (response.response) {
        setRecords(prev => [...prev, { ...newRecord, id: Date.now() }])
      } else {
        alert('Duplicated email!')
      }
      setNewRecord({ email: '', password: '' })
    } else {
      alert('Please fill in all fields!')
    }
  }

  const deleteRecord = async id => {
    setOpen(true)
    setSelectId(id)
  }

  const onDelete = async id => {
    const record = records.filter(record => record.id === id)
    await DeleteBotEmail(record[0].email)
    setRecords(prev => prev.filter(record => record.id !== id))
    setDelete(false)
    setOpen(false)
  }

  const getRecords = async () => {
    const response = await GetBotEmails()
    setRecords(response.emails)
  }

  useEffect(() => {
    getRecords()
  }, [])

  return (
    <div className="h-screen min-h-screen max-h-screen w-screen relative sm:pl-[74px] pt-[74px] flex justify-center">
      <div style={styles.container}>
        <h2 style={styles.title}>📋 Manage Bot Emails</h2>

        {/* Input Form */}
        <div style={styles.form}>
          <input
            type="email"
            name="email"
            value={newRecord.email}
            placeholder="Enter email"
            onChange={handleInputChange}
            style={styles.input}
          />
          <input
            type="password"
            name="password"
            value={newRecord.password}
            placeholder="Enter password"
            onChange={handleInputChange}
            style={styles.input}
          />
          <button onClick={addRecord} style={styles.addButton}>
            ➕ Add Email
          </button>
        </div>

        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>#</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Password</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record, index) => (
                <tr key={record.id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{index + 1}</td>
                  <td style={styles.tableCell}>{record.email}</td>
                  <td style={styles.tableCell}>{record.password}</td>
                  <td style={styles.tableCell}>
                    <button
                      onClick={() => deleteRecord(record.id)}
                      style={styles.deleteButton}
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  style={{ ...styles.tableCell, textAlign: 'center' }}
                >
                  No emails available. Add a email above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <AwesomeModal
        onClose={() => {
          setOpen(!isOpen)
        }}
        isOpen={isOpen}
        title={'Unsaved changes'}
        children={
          <>
            <p>Are you sure you want to delete the selected email?</p>
            <div style={{ float: 'right' }}>
              <button
                className="px-4 mx-2 my-4 bg-[#22272d] text-white rounded-lg"
                onClick={() => {
                  setDelete(false)
                  setOpen(false)
                }}
              >
                No
              </button>
              <button
                className="px-4 my-4 bg-[#22272d] text-white rounded-lg"
                onClick={() => {
                  onDelete(selectedId)
                }}
              >
                Yes
              </button>
            </div>
          </>
        }
      />
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    marginTop: '30px'
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    gap: '10px'
  },
  input: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  addButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  tableHeader: {
    backgroundColor: '#f4f4f4',
    color: '#333',
    textAlign: 'left',
    padding: '10px',
    fontWeight: 'bold'
  },
  tableCell: {
    padding: '10px',
    borderBottom: '1px solid #ddd'
  },
  tableRow: {
    transition: 'background-color 0.3s'
  },
  deleteButton: {
    padding: '5px 10px',
    backgroundColor: '#E74C3C',
    color: 'white',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  tableRowHover: {
    backgroundColor: '#f9f9f9'
  }
}

export default TableComponent
