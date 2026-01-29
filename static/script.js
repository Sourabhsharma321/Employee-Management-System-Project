// const API = "/employees";

// const table = document.getElementById("empTable");

// const empId = document.getElementById("empId");
// const nameInput = document.getElementById("name");
// const emailInput = document.getElementById("email");
// const phoneInput = document.getElementById("phone");

// const addBtn = document.getElementById("Save Employee");
// const updateBtn = document.getElementById("updateBtn");
// const cancelBtn = document.getElementById("cancelBtn");


// // ================= LOAD =================
// async function loadEmployees() {
//     const res = await fetch(API);
//     const employees = await res.json();

//     table.innerHTML = "";

//     employees.forEach(emp => {
//         table.innerHTML += `
//             <tr>
//                 <td>${emp.id}</td>
//                 <td>${emp.name}</td>
//                 <td>${emp.email}</td>
//                 <td>${emp.phone}</td>

//                 <td>
//                     <button class="edit"
//                         onclick="editEmp(${emp.id}, '${emp.name}', '${emp.email}', '${emp.phone}')">
//                         Edit
//                     </button>
//                 </td>

//                 <td>
//                     <button class="delete"
//                         onclick="deleteEmp(${emp.id})">
//                         Delete
//                     </button>
//                 </td>
//             </tr>
//         `;
//     });
// }


// // ================= ADD =================
// addBtn.addEventListener("click", async () => {

//     const employee = {
//         name: nameInput.value,
//         email: emailInput.value,
//         phone: phoneInput.value
//     };

//     await fetch(API, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(employee)
//     });

//     resetForm();
//     loadEmployees();
// });


// // ================= UPDATE =================
// updateBtn.addEventListener("click", async () => {

//     if (!empId.value) {
//         alert("Select employee to update");
//         return;
//     }

//     const employee = {
//         name: nameInput.value,
//         email: emailInput.value,
//         phone: phoneInput.value
//     };

//     await fetch(`${API}/${empId.value}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(employee)
//     });

//     resetForm();
//     loadEmployees();
// });


// // ================= EDIT =================
// function editEmp(id, name, email, phone) {
//     empId.value = id;

//     nameInput.value = name;
//     emailInput.value = email;
//     phoneInput.value = phone;
// }


// // ================= DELETE =================
// async function deleteEmp(id) {
//     if (!confirm("Delete this employee?")) return;

//     await fetch(`${API}/${id}`, { method: "DELETE" });
//     loadEmployees();
// }


// // ================= CANCEL =================
// cancelBtn.addEventListener("click", resetForm);

// function resetForm() {
//     empId.value = "";
//     nameInput.value = "";
//     emailInput.value = "";
//     phoneInput.value = "";
// }


// // ================= INIT =================
// loadEmployees();
const API = "http://localhost:8080/employees";


/* Load employees when page opens */
window.onload = loadEmployees;


/* ================= LOAD ================= */
function loadEmployees() {
    fetch(API)
        .then(res => res.json())
        .then(data => {

            let rows = "";

            data.forEach(emp => {
                rows += `
                <tr>
                    <td>${emp.id}</td>
                    <td>${emp.name}</td>
                    <td>${emp.phone}</td>
                    <td>${emp.email}</td>
                    <td>
                        <button class="edit" onclick="editEmployee(${emp.id}, '${emp.name}', '${emp.phone}', '${emp.email}')">Edit</button>
                        <button class="delete" onclick="deleteEmployee(${emp.id})">Delete</button>
                    </td>
                </tr>
                `;
            });

            document.getElementById("empTable").innerHTML = rows;
        });
}


/* ================= SAVE (POST/PUT) ================= */
function saveEmployee() {

    const id = document.getElementById("empId").value;
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    const employee = { name, phone, email };

    if (id === "") {
        // CREATE
        fetch(API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        })
        .then(() => {
            loadEmployees();
            clearForm();
        });

    } else {
        // UPDATE
        fetch(API + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        })
        .then(() => {
            loadEmployees();
            clearForm();
        });
    }
}


/* ================= EDIT ================= */
function editEmployee(id, name, phone, email) {
    document.getElementById("empId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("phone").value = phone;
    document.getElementById("email").value = email;
}


/* ================= DELETE ================= */
function deleteEmployee(id) {

    if (!confirm("Delete this employee?")) return;

    fetch(API + "/" + id, {
        method: "DELETE"
    })
    .then(() => loadEmployees());
}


/* ================= CLEAR ================= */
function clearForm() {
    document.getElementById("empId").value = "";
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}