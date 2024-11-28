import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges
} from '@xyflow/react'
import 'react-notifications/lib/notifications.css'
import { NotificationContainer, NotificationManager } from 'react-notifications'

import '@xyflow/react/dist/style.css'
import RightSidePanel from './RightSidePanel'
import AwesomeModal from './modal'
import {
  AddTriggerEmail,
  GetBotEmails,
  GetComponents,
  getTriggerEmails,
  getTriggers,
  saveComponents
} from '../../apis'
import {
  ContactNode,
  FallbackNode,
  FaqNode,
  StartNode,
  WelcomeNode
} from './NodeItems'
import { useFlow } from '@contexts/FlowContext'

export default function Flow() {
  const {
    nodes,
    setNodes,
    edges,
    setEdges,
    trigger,
    setTrigger,
    menuOpen,
    type,
    setType,
    contents,
    setContents
  } = useFlow()
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  })
  const [records, setRecords] = useState([])
  const minor = 120
  const start = size.height / 2.2

  const nodeTypes = {
    start: StartNode,
    contact_us: ContactNode,
    faq: FaqNode,
    welcome: WelcomeNode,
    fallback: FallbackNode
  }

  const formatTriggers = useMemo(() => {
    return [
      {
        id: 'start',
        type: 'start',
        position: { x: 100, y: start },
        data: {}
      },
      {
        id: 'welcome',
        type: 'welcome',
        position: { x: 350, y: start - 2 * minor },
        data: {}
      },
      {
        id: 'contact_us',
        type: 'contact_us',
        position: { x: 350, y: start - minor },
        data: {}
      },
      {
        id: 'faq',
        type: 'faq',
        position: { x: 350, y: start },
        data: {}
      },
      {
        id: 'fallback',
        type: 'fallback',
        position: { x: 350, y: start + minor },
        data: {}
      }
    ]
  }, [start])

  const onNodesChange = useCallback(
    changes => setNodes(nds => applyNodeChanges(changes, nds)),
    [setNodes]
  )
  const onEdgesChange = useCallback(
    changes => setEdges(eds => applyEdgeChanges(changes, eds)),
    [setEdges]
  )

  const onConnect = useCallback(
    params => setEdges(eds => addEdge(params, eds)),
    [setEdges]
  )

  const selectEmail = async (email, emailStr) => {
    await AddTriggerEmail(type, email)
    setTrigger({ ...trigger, [type]: emailStr })
    setType(null)
  }

  const getRecords = async () => {
    const response = await GetBotEmails()
    const trigger_response = await getTriggerEmails()
    setRecords(response.emails)
    const trigger_list = trigger_response.email_triggers
    setTrigger(trigger_list)
    // setNodes(formatTriggers)
  }

  const getContents = async () => {
    const response = await getTriggers()
    const triggers = response.triggers

    let contents = {}
    triggers.forEach(trigger => {
      contents[trigger['trigger_type']] = {
        title: trigger['title'],
        content: trigger['response'],
        file: trigger['file']
      }
    })
    setContents(contents)
  }

  const getComponents = async () => {
    let newNodes = []
    const response = await GetComponents()
    response.nodes.forEach(node => {
      newNodes.push({
        id: node['id'],
        type: node['type'],
        position: {
          x: parseInt(node['x']),
          y: parseInt(node['y'])
        }
      })
    })
    setNodes(newNodes)
    setEdges(response.edges)
  }

  const saveStatus = async () => {
    await saveComponents(nodes, edges)
    NotificationManager.success('Success message', 'Saved successfully!')
  }

  useEffect(() => {
    getRecords()
    getContents()
    getComponents()
  }, [])

  return (
    <div className="h-screen min-h-screen max-h-screen w-screen sm:pl-[74px] pt-[74px]">
      <div style={{ width: '100%', height: '100vh' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          style={{ backgroundColor: '#F6F6F6' }}
          // fitView
          nodesConnectable={false}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </div>
      {menuOpen && <RightSidePanel open={menuOpen} />}
      <button className="floating-save-btn" onClick={() => saveStatus()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="20px"
          height="20px"
        >
          <path d="M17 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-3 16H7v-2h7v2zm3-9H5V5h10v5z" />
        </svg>
        Save
      </button>
      <NotificationContainer />
      <AwesomeModal
        isOpen={type}
        title={'Email List'}
        onClose={() => setType(null)}
        children={
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>#</th>
                <th style={styles.tableHeader}>Email</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map((record, index) => (
                  <tr key={record.id} style={styles.tableRow}>
                    <td style={styles.tableCell}>{index + 1}</td>
                    <td style={styles.tableCell}>{record.email}</td>
                    <td style={styles.tableCell}>
                      <button
                        onClick={() => {
                          selectEmail(record.id, record.email)
                        }}
                      >
                        Select
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
        }
      />
    </div>
  )
}

const styles = {
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
