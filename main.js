var btn = document.querySelector('.add-btn');
var input = document.querySelector('.input-job');
var list = document.querySelector('.job-list');
var saveBtn = document.querySelector('.save-btn');

var pos;
var doneTask = [];
var doneJS = localStorage.getItem('doneTask');
if (doneJS){
    doneTask = JSON.parse(doneJS);
} else {
    doneTask = [];
}
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
        if(doneTask.includes(job)){
            return `<li class="job-item" contenteditable="false"><span class="job-name job-done">${job}</span>`+`<i class ="ti-check check-btn" onclick="doneJob(${index})"></i>`+`<i class ="ti-close close-btn" onclick="deleteJob(${index})"></i>`+`</li>`
        } else {
            return `<li class="job-item" contenteditable="true"><span class="job-name">${job}</span>`+`<i class ="ti-check check-btn" onclick="doneJob(${index})"></i>`+`<i class ="ti-close close-btn" onclick="deleteJob(${index})"></i>`+`</li>`;
        }
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
    if(doneTask.includes(job)){
        pos = doneTask.indexOf(job);
        doneTask.splice(pos,1);
        localStorage.setItem('doneTask',JSON.stringify(doneTask));
    }
    localStorage.setItem(storageKey, JSON.stringify(todoList));
    todoList = JSON.parse(localStorage.getItem(storageKey));
    render();
    // addClose();
}
saveBtn.addEventListener('click', update);

function doneJob(pos){
    job = todoList[pos];
    if(doneTask.includes(job)){
    } else {
        doneTask.push(job);
        localStorage.setItem('doneTask', JSON.stringify(doneTask));
        render();
    }
}