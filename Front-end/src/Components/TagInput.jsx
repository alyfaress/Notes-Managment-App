

//{tags.map((foreverytagintags,index) => { //here we are presenting newItem variable,however we descructured it to text and completed,so that the browser knows what to dislpay exactly from object para and not to display an error
  //return (                    //(.map)will give for each item in tag list:text,completed and index,so that we can reach item through its unique index
 /* const handleAddTag=()=>{
    const text=value.current.value; 
    const newtag=[text];//so very imp: Objects are not valid as a React child (ex:const newtag=[text]). however, you meant to render a collection of children, use an array instead(ex:const newtag=[text];,as we want by this code to add several elements(text) so list is best container to append them to while object isnt).
    settags([...tags,newtag]); //(...)called spread it mantain old existing items ,so(...list) will maintainold items and new ones wont override them,
    value.current.value=""; //this will erase typed words presented currently in the <input>
  };*/
  import React, { useState } from "react"
import { MdAdd, MdClose } from "react-icons/md"

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("")

  //   console.log(inputValue)

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()])
      setInputValue("")
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag()
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }
  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
            >
              # {tag}
              <button
                onClick={() => {
                  handleRemoveTag(tag)
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add Tags"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={() => {
            addNewTag()
          }}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  )
}

export default TagInput
