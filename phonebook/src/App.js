import { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Jinda Li', number: '045-123456'}
  ]) 
  const [newFilter, setNewFilter] = useState('123')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter = {newFilter} setNewFilter = {setNewFilter} />
      <h2>Add a bew</h2>
      <PersonForm 
      persons = {persons} 
      setPersons = {setPersons} 
      />     
      <h2>Numbers</h2>
      <Persons
      persons = {persons}
      filter = {newFilter}
      />
    </div>
  )
}
export default App