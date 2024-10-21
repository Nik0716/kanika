const todoList = [{
    name : 'make dishes',
    duedate: '11-12-2004',
    time : '09.45pm'    
    },{name : 'do javascript',
        duedate: '22-12-2004',
        time : '10.12pm'
    }];

displayResult();
function displayResult(){
let htmltodolist = '';

for(i= 0 ;i < todoList.length; i++){
    const todoobject = todoList[i];
    //const name = todoobject.name;
    //const duedate = todoobject.duedate;
    const {name,duedate,time} = todoobject;
    const html = `<div>${name} </div><div>${duedate}</div> <div>${time}</div><div><button onclick = " 
    todoList.splice(${i},1);
    displayResult();
    " class="Delete-button">Delete</button></div>`;
    htmltodolist += html;
    
}
console.log(htmltodolist);
const display = document.querySelector('.div-element-js')
 .innerHTML = htmltodolist; 
}
 


function Add(){
   const store = document.querySelector('.input-box-js');
   const name = store.value;
   const duedateInput = document.querySelector('.date-due-js');
   const duedate = duedateInput.value;
   const time = document.querySelector('.time-input-js').value;
   
   const elements = todoList.push({name,duedate,time});
   store.value = '';
   duedateInput.vaue = '';
   displayResult();
}
