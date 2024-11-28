import React from 'react'

const ListIcon = ({ width = 24, height = 25, color = '#64748B' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={width}
    height={height}
    fill="currentColor"
    aria-label="List Icon"
  >
    <rect x="3" y="5" width="3" height="3" rx="0.5" />
    <rect x="3" y="10.5" width="3" height="3" rx="0.5" />
    <rect x="3" y="16" width="3" height="3" rx="0.5" />
    <rect x="8" y="5" width="13" height="3" rx="0.5" />
    <rect x="8" y="10.5" width="13" height="3" rx="0.5" />
    <rect x="8" y="16" width="13" height="3" rx="0.5" />
  </svg>
)

export default ListIcon
