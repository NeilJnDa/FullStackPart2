import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Jinda Li', number: '045-123456'}
  ]) 
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
    console.log(persons.map(x => x.name).includes(newName))
    if(newName === '' ) alert("New name can not be empty!")
    else if(persons.map(x => x.name).includes(newName) === true){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat({name: newName, number: newNum}))
      setNewName('')
      setNewNum('')
    }

  }
  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
      <Content persons = {persons}/>
    </div>
  )
}
const Content = ({persons}) => {
  console.log()
  return(
    persons.map(x => <p key = {x.name}>{x.name} {x.number}</p>)
  )
}

export default App