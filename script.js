const API = "http://localhost:5000/students";

const form = document.getElementById("studentForm");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const student = {
name: document.getElementById("name").value,
email: document.getElementById("email").value,
course: document.getElementById("course").value,
age: document.getElementById("age").value
};

await fetch(API,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(student)
});

loadStudents();

});

async function loadStudents(){

const res = await fetch(API);
const data = await res.json();

let html="";

data.forEach(s=>{

html+=`
<tr>
<td>${s.name}</td>
<td>${s.email}</td>
<td>${s.course}</td>
<td>${s.age}</td>
<td>
<button onclick="deleteStudent('${s._id}')">Delete</button>
</td>
</tr>
`;

});

document.getElementById("studentList").innerHTML=html;

}

async function deleteStudent(id){

await fetch(API+"/"+id,{
method:"DELETE"
});

loadStudents();

}

loadStudents();