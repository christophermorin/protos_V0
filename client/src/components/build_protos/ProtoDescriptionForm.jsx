import { useRef } from 'react';
import PropTypes from 'prop-types';
import { Editor, RichUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';

function ProtoDescriptionForm({ editorState, setEditorState }) {
  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const editor = useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  const className = 'RichEditor-editor';
  return (
    <div className="RichEditor-root" style={{ marginTop: '20px' }}>
      <div style={{ borderBottom: '1px solid #999', marginBottom: '5px' }}>
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
      </div>
      {/* wordBreak: "break-all" */}
      <div
        onClick={focusEditor}
        style={{
          padding: '0 10px', minHeight: '100px', cursor: 'text',
        }}
      >
        <Editor
          ref={editor}
          className={className}
          editorState={editorState}
          onChange={setEditorState}
          placeholder="Proto Description..."
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
        />
      </div>
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

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  // { label: 'Block', style: 'blockquote' },
  // { label: 'Code', style: 'code-block' },
];

function BlockStyleControls(props) {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

function StyleButton(props) {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };
  let className = 'RichEditor-styleButton';
  if (props.active) {
    className += ' RichEditor-activeButton';
  }
  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
}

const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

function InlineStyleControls(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();
  return (
    <div className="RichEditor-controls" style={{ marginBottom: 10 }}>
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

export default ProtoDescriptionForm;
