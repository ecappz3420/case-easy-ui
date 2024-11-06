import React from 'react'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { Button } from 'flowbite-react'

const ChatMessage = () => {
  return (
    <div className='border p-2 gap-6 flex flex-col justify-between'>
      <FroalaEditorComponent tag='textarea' config={{
        heightMin: 300,  
      }} />
      <div>
        <Button size='sm' color='blue'>Send</Button>
      </div>
    </div>
  )
}

export default ChatMessage