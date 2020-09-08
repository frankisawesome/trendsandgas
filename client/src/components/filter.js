import React from 'react'

const Filter = ({ setFilter }) => {
  const [anchorEl, handleClick, handleClose] = useAnchorEl();

  handleFilterChange = (filter) => {
    setFilter(filter)
    handleClose()
  }

  return (
        <Menu
           id='simple-menu'
           anchorEl={anchorEl}
           keepMounted
           open={Boolean(anchorEl)}
           onClose={handleClose}
         >
           <MenuItem style={{ color: '#FB8180' }} onClick={() => handleFilterChange('day')}>
             day
           </MenuItem>
           <MenuItem style={{ color: '#FB8180' }} onClick={() => handleFilterChange('week')}>
             week
           </MenuItem>
           <MenuItem
             style={{ color: '#FB8180' }}
             onClick={() => handleFilterChange('month')}
           >
             month
           </MenuItem>
         </Menu>
  )
}

export default Filter