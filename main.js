let fakeDataBase;

if(localStorage.getItem("todo2019")){

    fakeDataBase = JSON.parse(localStorage.getItem("todo2019"));
}
else{

    fakeDataBase = [];
}

let order = true;
_id("orderBtn").addEventListener("click", changeOrder);

function changeOrder(){
 
    order = !order;
    renderFakeData();
}

renderFakeData();

function renderFakeData(){
    
    // skapa html från vår fakeDataBase
    let htmlOutput = fakeDataBase.map(function(taskObject,index){

        return `
            <div> 
                <h1 id="${index}"><sup>${taskObject.id}</sup>${taskObject.task}<sub>${taskObject.ready}</sub></h1>
                
                <button onclick="deleteTask(${index})">Delete</button>
                <button onclick="doneTask(${index})">Done</button>
            </div>
        `;
    }); //End map

    if(order){
    _id("taskList").innerHTML = htmlOutput.join("");        
    }
    else{
    _id("taskList").innerHTML = htmlOutput.reverse().join("");
    }
    
}


//Lyssna efter form-submit
_id("taskForm").addEventListener("submit", addTask);

function addTask(event){
    
    //Hindra form från att skickas till servern
    event.preventDefault();


    //Hämta input-data
    let inputTask = _id("taskId").value;

    //skapa ett task-objekt
    if(inputTask.trim() != ""){
    
        let taskObject = {id:Date.now(), task: inputTask, ready:false};

    //spara i fakeDataBase
    fakeDataBase.push(taskObject);

    //rendera på nytt
    renderFakeData();

    // spara 
    saveLocal();

    }

    _id("taskId").value = "";
    _id("taskId").focus();

}

function deleteTask(index){
    fakeDataBase.splice(index,1);
    renderFakeData();
    saveLocal();
}

function doneTask(index){
    
    // fakeDataBase[index].ready = !fakeDataBase[index].ready;
    let taskObject = fakeDataBase[index];
    taskObject.ready = !taskObject.ready;
    renderFakeData();
    saveLocal();
}

function saveLocal(){

    localStorage.setItem("todo2019", JSON.stringify(fakeDataBase));
}

//helpers
function _id(id){
    return document.getElementById(id);
}