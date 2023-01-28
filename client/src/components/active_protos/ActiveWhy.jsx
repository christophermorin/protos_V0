import { Editor, convertFromRaw, EditorState } from 'draft-js';
// import 'draft-js/dist/Draft.css';

export default function ActiveWhy({ protoDescription }) {
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
    <div style={{ background: 'white', padding: '10px' }}>
      <Editor
        editorState={text}
        readOnly
        blockStyleFn={getBlockStyle}
        customStyleMap={styleMap}
      />
    </div>
  );
}