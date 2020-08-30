const fetch = require('node-fetch');
const fs = require('fs');

async function createUser () {
    const response = await fetch('https://randomuser.me/api/?results=500')

    if (response.ok) {
        const data = await response.json ();

        fs.writeFile('user.csv', (`primeiro_nome,sobrenome,email,idade,genero,username,password\n`), 'utf8', (err) => {
            if (err) throw err;
          });
         

        for(let i = 1; i<data.results.length;i++){
    
            fs.createWriteStream("user.csv",{flags: 'as'})
            .write (`${data.results[i].name.first}, ${data.results[i].name.last}, ${data.results[i].email}, ${data.results[i].dob.age}, ${data.results[i].gender}, ${data.results[i].login.username}, ${data.results[i].login.password}\n`);

        }
        console.log("...Done.")
    }
}

createUser ();