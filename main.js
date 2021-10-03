var btn = document.querySelector('.add-btn');
var input = document.querySelector('.input-job');
var list = document.querySelector('.job-list');
var saveBtn = document.querySelector('.save-btn');

var pos;
var doneTask = [];
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
    job = input.value;
    if(job === ''){

    } else{
        todoList.push(job);
        render();
        input.value = '';
        localStorage.setItem(storageKey, JSON.stringify(todoList));
    }
    // addClose();
}
document.addEventListener('keypress', function(e){
    switch(e.key){
        case 'Enter':
            addJob();
            update();
            break;
    }
})
btn.addEventListener('click', addJob);

function render(){
    // list.innerHTML += `<li>${job}</li>`;
    var content = todoList.map(function(job, index){
        return `<li class="job-item" contenteditable="true"><span>${job}</span>`+`<i class ="ti-close close-btn" onclick="deleteJob(${index})"></i>`+`</li>`;
    })
    list.innerHTML = content.join('');
}
render();
function update(){
    var jobItemList = document.querySelectorAll('.job-item');
    for(i = 0; i < jobItemList.length; i++){
        todoList[i] = jobItemList[i].innerText;
    }
    localStorage.setItem(storageKey, JSON.stringify(todoList));
}
function deleteJob(pos){
    job = todoList[pos];
    // e.target.parentNode.remove();
    pos = todoList.indexOf(job);
    todoList.splice(pos,1);
    localStorage.setItem(storageKey, JSON.stringify(todoList));
    todoList = JSON.parse(localStorage.getItem(storageKey));
    render();
    // addClose();
}
saveBtn.addEventListener('click', update);