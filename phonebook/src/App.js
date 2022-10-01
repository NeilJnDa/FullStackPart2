import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/Person'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
    setErrorMessage(null)
  }
  useEffect(hook, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter newFilter = {newFilter} setNewFilter = {setNewFilter} />
      <h2>Add a new</h2>
      <PersonForm 
      persons = {persons} 
      setPersons = {setPersons} 
      setErrorMessage = {setErrorMessage}
      />     
      <h2>Numbers</h2>
      <Persons
      persons = {persons}
      setPersons = {setPersons} 
      filter = {newFilter}
      setErrorMessage = {setErrorMessage}
      />
    </div>
  )
}
export default App