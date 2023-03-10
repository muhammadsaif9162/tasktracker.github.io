let todos = getSavedTodosFromLocalStorage()
const form = document.querySelector('#add-new-form')
const input = document.querySelector('#new-task-input')
const all_tasks = document.querySelectorAll('.task')

renderAlreadySaved(todos)

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const task = input.value
    if(!task){
        alert("please fill out the task")
    } else {
        let taskToBeAdded = {inside : task}
        let resultOfSearching = todos.some(obj => obj.inside.toLowerCase() == taskToBeAdded.inside.toLowerCase())
        if(resultOfSearching){
            alert('You have already decided to do this task, move forward instead of repeating things!!')
        } else {
            todos.push({
                inside : task
            })
            saveTodosToLocalStorage()
            addtasktodom(task)
        }
        input.value = ''
    }
})

