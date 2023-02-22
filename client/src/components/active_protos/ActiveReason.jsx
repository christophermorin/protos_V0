import { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import HelpIcon from '@mui/icons-material/Help';
import { Editor, convertFromRaw, EditorState } from 'draft-js';

function ActiveReason({ protoDescription }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const text = EditorState.createWithContent(convertFromRaw(JSON.parse(protoDescription)));

  function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      case 'code-block': return 'RichEditor-codeblock';
      default: return null;
    }
  }

  const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    },
  };

  return (
    <div>
      <HelpIcon aria-describedby={id} onClick={handleClick} sx={{ '&:hover': { background: 'rgba(255,0,0,0.3)' }, borderRadius: '50%' }} />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: { width: { xs: '325px', md: '600px' } },
        }}
        scroll="paper"

      >
        <div style={{ background: 'white', padding: '10px' }}>
          <Editor
            editorState={text}
            readOnly
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
          />
        </div>
      </Popover>
    </div>
  );
}

ActiveReason.defaultProps = {
  protoDescription: null,
};

ActiveReason.propTypes = {
  protoDescription: PropTypes.string,
};

export default ActiveReason;
