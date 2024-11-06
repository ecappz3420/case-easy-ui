import { Button, Label, TextInput } from 'flowbite-react'
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import React from 'react'
import Select from 'react-select'

const Email = () => {
  return (
    <div className='p-2 border rounded'>
        <form action="">
          <div className='h-[80vh] overflow-y-auto'>
          <div className='flex flex-col gap-2 mb-4'>
                <Label>From</Label>
                <Select isClearable options={[{value: "test@gmail.com",label: "test@gmail.com"}]} className='w-[300px]' />
            </div>
            <div className='flex flex-col gap-2 mb-4'>
                <Label>To</Label>
                <Select isClearable isMulti options={[{value: "test@gmail.com",label: "test@gmail.com"}]} className='w-[300px]' />
            </div>
            <div className='flex flex-col gap-2 mb-4'>
                <Label>Send a copy to team member</Label>
                <Select isClearable isMulti options={[{value: "test@gmail.com",label: "test@gmail.com"}]} className='w-[300px]' />
            </div>
            <div className='flex flex-col gap-2 mb-4'>
                <Label>Subject</Label>
                <TextInput className='w-[300px] rounded' color='blue'/>
            </div>
            <div className='flex flex-col gap-2 mb-4'>
            <FroalaEditorComponent tag='textarea' config={{
        heightMin: 300,  
      }} />
            </div>
          </div>
          <div className='flex gap-5 p-3'>
            <Button color='blue'>Send</Button>
          </div>
            

        </form>
    </div>
  )
}

export default Email