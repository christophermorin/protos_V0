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
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <HelpIcon aria-describedby={id} onClick={handleClick} fontSize="small" />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'bottom',
        }}
        PaperProps={{
          sx: { width: { xs: '325px', md: '600px', background: '#1f2937' } },
        }}
        scroll="paper"

      >
        <div style={{ padding: '10px' }}>
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
