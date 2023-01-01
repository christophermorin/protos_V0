import { Editor, convertFromRaw, EditorState } from 'draft-js';
// import '../../Draft.css'
import 'draft-js/dist/Draft.css';



export default function ActiveWhy(props) {
  const text = EditorState.createWithContent(convertFromRaw(JSON.parse(props.storedState)));
  return (
    <div style={{ background: 'white', padding: '10px' }}>
      <Editor editorState={text} readOnly={true} blockStyleFn={getBlockStyle}
        customStyleMap={styleMap} />
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

// const style = {
//   background: 'black',
//   border: '1px solid black',
//   color: 'white'
// }