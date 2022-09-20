import { useState } from 'react'

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const handleNameChange = (event) => {
      event.preventDefault()
      setNewName(event.target.value)
    }
    
    const handleNumChange = (event) => {
      event.preventDefault()
      setNewNum(event.target.value)
    }
    const addName = (event) => {
      event.preventDefault()
      if(newName === '' || newNum === '') alert("New name or number can not be empty!")
      else if(persons.map(x => x.name).includes(newName) === true){
        alert(`${newName} is already added to phonebook`)
      }
      else{
        setPersons(persons.concat({name: newName, number: newNum}))
        setNewName('')
        setNewNum('')
      }
    }
  return(
      <form onSubmit = {addName}>
      <div>name: 
        <input 
        value = {newName}
        onChange = {handleNameChange}
        />
      <div>number:
        <input
        value = {newNum}
        onChange = {handleNumChange}
        />
      </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default PersonForm