import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faThumbtack,faTrash,faPen}  from '@fortawesome/free-solid-svg-icons'


const NoteCard = ({title,content,tags,isPinned,onPinNote,onEdit,onDelete,}) => {
  return (
   //i gave styles for NoteCrd in div containing it in  the Home component also check it 
    <div className="w-[370px] h-[140px] m-3 border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div className='m-3'>
          <h6 className="text-sm font-medium">{title}</h6>
          
        </div>

        <FontAwesomeIcon icon={faThumbtack}   className={`icon-btn ${ isPinned ? "text-[#2B85FF] " : "text-slate-300"
          }`} //please:take care when using condition in tailwind class of  (`) is back quotation not normal single quotation) 
                                              onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item} `)}{/*this line to display all tags stored in tags,if we wrote {tags} only 1 will be displayed*/}

        </div>

        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faPen}  className="icon-btn hover:text-green-600" 
                                         onClick={onEdit}
          />

          <FontAwesomeIcon icon={faTrash}   className="icon-btn hover:text-red-500" 
                                            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  )
}

export default NoteCard

