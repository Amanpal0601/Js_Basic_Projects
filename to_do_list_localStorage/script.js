
// jaise hi dom content relaod hoga vaise hi voh function run karna satart karega 

document.addEventListener("DOMContentLoaded",()=>{
// first of all we grab all the important elements
const todoinput = document.getElementById("todo-input")
const addTaskButton = document.getElementById("add-task-btn")
const todoList = document.getElementById("todo-list")


// we need to store this task 
let tasks = JSON.parse(localStorage.getItem('tasks') )|| [];
// empty array when nothimg is in task otherwise it has data from localstorage 
tasks.forEach(task => renderTask(task)) // this will render all the task which are in local storage
addTaskButton.addEventListener('click', () => {

    const tasktext = todoinput.value.trim(); 

    if (tasktext === "") return;

    const newTask = {
        id: Date.now(),
        text: tasktext,
        completed: false,
    };
    tasks.push(newTask)
    saveTask();
    todoinput.value = "" 
    renderTask(newTask)
    console.log(tasks)
})

function saveTask(){
    //push that task content in our local storage 
    //localStorage Api is invocked using this localStorage keyword
    //.setItem(tasks) se karke ham add kar denge
    //we need to maintain the format of the arry so we JSON.stringify kar denge isse ho jaayega saare array ka data into JSON fromat of string 
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

// local storage se data leke hamm usko render in the DOM
function renderTask(task){
    // first of all we need to create an element to render it we need to create an li 
    const li = document.createElement('li');
    // need to add some of the attributes to ot 
    li.setAttribute('data-id',task.id); // data-id is special id it is can be repeated used in dynamic apps and doest afffect styling or uniquessnnes rules
    if(task.completed) li.classList.add('completed') // another way of adding class to an element 
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    // we need to add and event lisntner to the our page 
    li.addEventListener('click',(e)=>{
        if(e.target.tagName==='BUTTON') return  // this will tell ki evnet kaha se hau hai agar voh button hai so return 
        task.completed=!task.completed
        li.classList.toggle('completed') // yeh property pe click pe usko hata aur add dono kar deta hai
        saveTask(); // we need to save it to local storage again 
    });

    // if we wnat to add event listenr to button 
    li.querySelector('button').addEventListener('click',(e)=>{
        e.stopPropagation(); // this will stop the propogataion of event like if you trigger any event in child and if same event is in parent then parent will also get triggerd so to prevent from that we do that 
        // study about the filter in an array method 
        tasks = tasks.filter(t=>t.id !== task.id) // this will create am new array in that task which doesnt have task id (“Keep all tasks whose id is NOT equal to the clicked task id.”)
        li.remove();
        saveTask();
    })
    todoList.appendChild(li) 
}
// here we want to do that when our page loads until the DOM loaded we want to take all the task from local storage store it again in task [] array jaha se local storage meh daala tha then run a loop to get all the task and render the dom 
})

