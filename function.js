//saveTodos in localStorage
const saveTodosToLocalStorage = ()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
}

//get savedTodos from localStorage
const getSavedTodosFromLocalStorage = ()=>{
    const todoJSON = localStorage.getItem('todos')
    if(todoJSON !== null){
        return JSON.parse(todoJSON)
    }else{
        return []
    }
}

//render already saved todos to dom
function renderAlreadySaved(todos){
    todos.forEach(element => {
        const task = element.inside
        addtasktodom(task)
    });
}

//add todos to dom
function addtasktodom(task){
    const list_el = document.querySelector('#tasks')
    //task div
    const task_el = document.createElement('div')
    task_el.classList.add('task')

    //content div
    const task_content_el = document.createElement('div')
    task_content_el.classList.add('content')
    task_el.appendChild(task_content_el)
    //input in content
    const task_input_el = document.createElement('input')
    task_input_el.classList.add('text')
    task_input_el.type = "text"
    task_input_el.value = task
    task_input_el.setAttribute("readonly","readonly")

    // actions div
    const actions_el = document.createElement('div')
    actions_el.classList.add('actions')
    task_el.appendChild(actions_el)
    // edit button
    const action_edit = document.createElement('button')
    action_edit.classList.add('edit')
    action_edit.innerHTML = "Edit"
    actions_el.appendChild(action_edit)
    // delete button
    const action_delete = document.createElement('button')
    action_delete.classList.add('delete')
    action_delete.innerHTML = "Delete"
    actions_el.appendChild(action_delete)

    task_content_el.appendChild(task_input_el)
    list_el.appendChild(task_el)
    
    let unsaveTask
    action_edit.addEventListener('click',()=>{
        if(action_edit.innerHTML.toLowerCase()=="edit"){
            task_input_el.removeAttribute('readonly')
            task_input_el.focus();
            action_edit.innerHTML = "Save"
            unsaveTask = task_input_el.value
        } else {
            task_input_el.setAttribute("readonly","readonly")
            action_edit.innerHTML = "Edit"
            let toodo = getSavedTodosFromLocalStorage()
            objIndex = toodo.findIndex((obj => obj.inside == unsaveTask));
            toodo[objIndex].inside = task_input_el.value
            localStorage.setItem('todos',JSON.stringify(toodo))
            list_el.innerHTML = ""
            todos = getSavedTodosFromLocalStorage()
            renderAlreadySaved(todos)
        }
    })

    action_delete.addEventListener('click',()=>{
        let toodo = getSavedTodosFromLocalStorage()
        toodo.forEach((element,index) => {
            let todo = element.inside
            if(task_input_el.value == todo){
                toodo.splice(index,1)
                localStorage.setItem('todos',JSON.stringify(toodo))
            }
        });
        list_el.innerHTML = ""
        todos = getSavedTodosFromLocalStorage()
        renderAlreadySaved(todos)
    })
}