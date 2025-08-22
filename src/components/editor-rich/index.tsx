import { useState } from 'react';
import dynamic from 'next/dynamic';
import { EditorProps, EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'; // You might need to install this package

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