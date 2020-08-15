import { useState, useEffect } from 'react'

export const useAnchorEl = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return [anchorEl, handleClick, handleClose]
}