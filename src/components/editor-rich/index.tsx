import dynamic from 'next/dynamic';
import { EditorProps} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
interface TPropCustomEditorRich extends EditorProps {
  onEditorStateChange: () => void
}
const CustomEditorRich = (props:TPropCustomEditorRich) => {
  const {editorState,onEditorStateChange} = props

  return(
    <>
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="editorClassName"
      onEditorStateChange={onEditorStateChange}
    />
    </>
  )
}

export default CustomEditorRich;