
import personService from '../services/Person'

const Persons= ({persons, filter, setPersons, setErrorMessage}) => {
  function NameFilter(person){
    if(filter === '') return true
    console.log(filter.toLowerCase())
     return person.name.toLowerCase().includes(filter.toLowerCase())
  }   
  function onDeleteClickEvent(name){
    if(window.confirm(`Delete ${name} ?`)){
      console.log('delete id', persons.find(x => x.name === name).id)
      personService.deleteOne(persons.find(x => x.name === name).id)
      .then(personService.getAll().then(values => setPersons(values)))
      .then(()=>{
        setErrorMessage(
          `Deleted ${name}`
          )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
    }
  }
  return(
    //persons.map(x => <p key = {x.name}>{x.name} {x.number}</p>)
    persons.filter(NameFilter).map(x =>
      <div key = {x.name}>
      {x.name} {x.number}
      <button onClick={() => onDeleteClickEvent(x.name)}>Delete</button>
      </div>
    )
  )
}
export default Persons