import { useState } from 'react'
import personService from '../services/Person'

const PersonForm = ({persons, setPersons, setErrorMessage}) => {
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
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`))
        {
          const id = persons.find(x => x.name === newName).id
          console.log('update id', id)

          const newObject = {name: newName, number: newNum}
          personService
            .update(id, newObject)
            .then(() =>{
              personService.getAll().then(persons => setPersons(persons))
              setErrorMessage(
                `Changed '${newName}'`
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              setNewName('')
              setNewNum('')
            })
            .catch((error)=>{
              setErrorMessage(
                error.response.status === 404 ? `Information of ${newName} has already been removed from the server`: error.response.data.error
              )
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
              personService.getAll().then(persons => setPersons(persons))
            })
        }
      }
      else{
        personService
          .addNew({name: newName, number: newNum})       
          .then(returnedNote => {
            setPersons(persons.concat(returnedNote))

            setErrorMessage(
              `Added '${newName}'`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNum('')
            }
          )
          .catch(error => {
            setErrorMessage(
              error.response.data.error
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            console.log(error.response.data.error)
          })
      }
    }
  return(
      <form onSubmit = {addName}>
      <div>Name: 
        <input 
        value = {newName}
        onChange = {handleNameChange}
        />
      <div>Number:
        <input
        value = {newNum}
        onChange = {handleNumChange}
        />
      </div>
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}
export default PersonForm