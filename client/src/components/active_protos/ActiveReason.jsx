import { useState } from 'react';
import Popover from '@mui/material/Popover';
import HelpIcon from '@mui/icons-material/Help';
import { Editor, convertFromRaw, EditorState } from 'draft-js';

export default function ActiveReason({ protoDescription }) {
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

  return (
    <div>
      <HelpIcon aria-describedby={id} onClick={handleClick} />
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
          sx: { width: 310 }
        }}
        scroll='paper'

      >
        <div style={{ background: 'white', padding: '10px' }}>
          <Editor editorState={text} readOnly={true} blockStyleFn={getBlockStyle}
            customStyleMap={styleMap} />
        </div>
      </Popover>
    </div>
  );
}

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