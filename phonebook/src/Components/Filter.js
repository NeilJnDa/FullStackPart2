
const Filter = ({newFilter, setNewFilter}) => {
    const handleFilterChange = (event) => {
        event.preventDefault()
        setNewFilter(event.target.value)
    }
    return(
        <div>
        <p>Filter Shown with</p>
        <input 
            value = {newFilter}
            onChange = {handleFilterChange}
        />
        </div>
    )
}
export default Filter