import React, { useState, useRef } from "react";
import {
  Button,
  Paper,
  Grow,
  Popper,
  ButtonGroup,
  MenuItem,
  MenuList,
  ClickAwayListener,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Flag from "react-world-flags";
import { changeLanguage } from "../../i18n";

const options = ["AR", "US"];

export const Selector = () => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const anchorRef = useRef(null);

  const handleClick = () => {};

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
    changeLanguage(options[index]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <ButtonGroup
        variant='contained'
        color='primary'
        ref={anchorRef}
        aria-label='split button'>
        <Button onClick={handleClick}>
          <Flag code={options[selectedIndex]} style={{ height: 17 }} />
        </Button>
        <Button
          color='primary'
          size='small'
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label='select merge strategy'
          aria-haspopup='menu'
          onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id='split-button-menu'>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}>
                      <Flag code={option} style={{ height: 17 }} />
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};
