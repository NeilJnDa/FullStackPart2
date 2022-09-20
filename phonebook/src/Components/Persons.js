const Persons= ({persons, filter}) => {
  function NameFilter(person){
    if(filter === '') return true
    console.log(filter.toLowerCase())
     return person.name.toLowerCase().includes(filter.toLowerCase())
  }   
  return(
    //persons.map(x => <p key = {x.name}>{x.name} {x.number}</p>)
    persons.filter(NameFilter).map(x => <p key = {x.name}>{x.name} {x.number}</p>)

  )
}
export default Persons