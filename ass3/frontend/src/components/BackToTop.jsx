// import PropTypes from 'prop-types';
import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

/**
 * TODO test this out once page can start scrolling
 * NOTE if it doesn't work, just delete file
 * usage:
 * import Fab from '@mui/material/Fab';
 * import KeyboardArrowUpIcon from '@mui/material/KeyboardArrowUp';
 * ...
 * fucntion something() {
 *  return {
 *    ...
 *    <BackToTop {...props}>
 *      <Fab size="small" aria-label="scroll back to top">
 *        KeyboardArrowUpIcon />
 *      </Fab>
 *    </BackToTop>
 *  }
 * }
 */

export const BackToTop = (props) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (
      (event.target).ownerDocument || document
    ).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
};

BackToTop.propTypes = {
  children: React.ReactElement,
  window: Window
};
