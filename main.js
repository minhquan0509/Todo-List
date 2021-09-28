var btn = document.querySelector('.add-btn');
var input = document.querySelector('.input-job');
var list = document.querySelector('.job-list');
var pos;
var storageKey = 'todoList';
var data = localStorage.getItem(storageKey);
var todoList;
if (data){
    todoList = JSON.parse(data);
} else {
    todoList = [];
}
var job = '';

function addJob(){
    job = input.value
    todoList.push(job);
    render();
    input.value = '';
    localStorage.setItem(storageKey, JSON.stringify(todoList));
    addClose();
}

btn.addEventListener('click', addJob);

function render(){
    // list.innerHTML += `<li>${job}</li>`;
    var content = todoList.map(function(job, index){
        return `<li class="job-item"><span>${job}</span>`+`<i class ="ti-close close-btn onclick="deleteJob(${index})""></i>`+`</li>`;
    })
    list.innerHTML = content.join('');
}
render();
addClose();
function addClose(){
    var closeList = document.querySelectorAll('.close-btn');
    for(i = 0; i < closeList.length; i++){
        closeList[i].addEventListener('click', deleteJob);
    }
}
function deleteJob(pos){
    // job = e.target.parentElement.innerText;
    // pos = todoList.indexOf(job);
    todoList.splice(pos,1);
    localStorage.setItem(storageKey, JSON.stringify(todoList));
    todoList = JSON.parse(localStorage.getItem(storageKey));
    render();
    addClose();
}

