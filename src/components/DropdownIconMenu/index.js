import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './index.css';
import PropTypes from 'prop-types';

function DropdownIconMenu({ properties }) {
  const [anchorElement, setAnchorElement] = useState(null);
  const { name, fields } = properties;

  const handlePopoverOpen = (event) => {
    setAnchorElement(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorElement(null);
  };

  return (
    <div className="popoverMenu">
      <Typography className="userName">
        {name}
      </Typography>
      <Button
        className="iconButton"
        onMouseOver={handlePopoverOpen}
      >
        <KeyboardArrowDownIcon />
      </Button>
      <Menu
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handlePopoverClose}
      >
        {
          Object.entries(fields).map(([field, value]) => {
            const { text, handle } = value;
            return (
              <MenuItem
                key={`menuItem-${field}`}
                onClick={() => {
                  handle();
                  handlePopoverClose();
                }}
              >
                {text}
              </MenuItem>
            );
          })
        }
      </Menu>
    </div>
  );
}

DropdownIconMenu.propTypes = {
  properties: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
      handle: PropTypes.func,
    })).isRequired,
  }),
};

DropdownIconMenu.defaultProps = {
  properties: {},
};

export default DropdownIconMenu;
