const endpoint = new URL('http://localhost:3000/person');
const fullName = document.querySelector('#fullName');
const salaryTB = document.querySelector('#salary');
const status = document.querySelector('#status');
const btnCadastro = document.querySelector('#btn');


const fetchUsers = async () => {
    const res = await fetch(endpoint);
    const users = await res.json()
    console.log(users);
    return users;
};



const addUser = async (event) => {
    event.preventDefault();
    const persona = {
        name: fullName.value,
        salary: salaryTB.value,
    };
    console.log(persona);
    const addedUser = await fetch('http://localhost:3000/person', {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(persona),
    });

    /* fullName.value = '';
    salaryTB.value = '';
    status.value = false; */
};

fetchUsers();
btnCadastro.addEventListener('onclick', addUser);