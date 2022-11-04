"use strict";

let BASE_URL = "http://localhost:8080";
const getAlldata = async () => {
    const response = await fetch(`${BASE_URL}/students`, {
        method: 'GET',
        headers: {
            "Content-Type": "application.json"
        }
    });
    const data = await response.json();
    dataRender(data);
}
getAlldata();
function dataRender(data = []) {
    data.forEach((e) => {
        const tr = createElement('tr', "tr",
            `<tr>
            <td>${e.id}</td>  
            <td>${e.name} ${e.lastname}</td>   
            <td>${e.marked_date}</td>
            <td>${e.mark}</td>
            <td>${e.mark>70 ? "Passed":"Failed"}</td>
            <td> <button class="btn btn-primary edit-btn" data-edit=${e.id}><i class="bi bi-pencil-square" data-edit=${e.id}></i></button></td>
            <td> <button class="btn btn-danger" data-del=${e.id}><i class="bi bi-trash-fill" data-del=${e.id}></i></button></td>
        </tr>
        `);
        $('.wrapper').appendChild(tr);
    })
}
function postData() {
    const isName = $("#name").value.trim();
    const isLastname = $('#lastname').value.trim();
    const isMark = $('#mark').value;
    let datenow = new Date();
    fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: isName,
            lastname: isLastname,
            mark: isMark,
            marked_date: `${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()}`,
        })
    })
}
$("#add-btn").addEventListener('click', (evt) => {
    evt.preventDefault();      
    postData();
})
$(".wrapper").addEventListener("click", (e) => {
    if (
        e.target.classList.contains("btn-danger") ||
        e.target.classList.contains("bi-trash-fill")
    ) {
        const id = e.target.getAttribute("data-del");

        fetch(`${BASE_URL}/students/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
        });

    }
});
const studentsItem = async function (id) {
    const response = await fetch(`${BASE_URL}/students/${id}`);
    const {
        name,
        lastname,
        mark,
    } = await response.json();
    return {
        name,
        lastname,
        mark,
    };
}
$(".wrapper").addEventListener("click", (e) => {
    if (
        e.target.classList.contains("edit-btn") ||
        e.target.classList.contains("bi-pencil-square")
    ) {
        const id = e.target.getAttribute("data-edit");
        localStorage.setItem("editID", id)
        $(".modal-window").classList.remove("d-none");    
        $("#add-btn")?.remove();
        $("#edit-btn").classList.remove("d-none")
        let result = studentsItem(id);
        result.then((data) => {
            $("#name").value = data.name;
            $("#lastname").value = data.lastname;
            $("#mark").value = data.mark;
        });
    }
});
function editData() {
    const id = localStorage.getItem('editID');
    console.log(id);
    const isName = $("#name").value.trim();
    const isLastname = $("#lastname").value.trim();
    const isMark = $("#mark").value;
    let datenow = new Date();

    fetch(`${BASE_URL}/students/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: isName,
            lastname: isLastname,
            mark: isMark,
            marked_date: `${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()}`,
        }),
    });
}
function main() {
    $("#edit-btn").addEventListener('click', () => {
        editData()
    })
    $("#addNew").addEventListener("click", (evt) => {
        localStorage.removeItem("editID")
        $(".modal-window").classList.remove("d-none")
    
    })
    function hideModal() {
        $(".modal-window").classList.add("d-none");
    
    }
    $(".close").addEventListener("click", () => {
        hideModal();
    });
}
main()
// const inputVal = document.getElementById('filter-name')
// const API_URL = "http://localhost:8080/students";
// $('.search-form').addEventListener('submit', (e)=>{
//   e.preventDefault()
//     fetch(API_URL)
//   .then((res) => res.json())
//   .then((data) => {
//      data.forEach( (i) =>{
//         console.log(i.name, 'ulr');
//          if(inputVal.value == i.name){

//          }else{

//          }
//      })
//   });
  

// })



