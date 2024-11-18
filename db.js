// // Treinando Usando Dadoss em Memória Com "mysql2/promise";
const mysql = require("mysql2/promise"); // Temos que usar o "mysql2/promise" para específica vamos usar "promise", o "mysql2" padrão usa "callback";

// OBS: Vamos usar o ".createPool" (que é mais profissional ) em vez do ".createConnection", pois com o ".createConnection" se cria 1 conexão só, e tem que abrir e fechar ela depois de usar, ou seja, abre, usar, depois tem que fechar; Quando trabalha com "pool" de conexões toda vez que eu for usar um comando SQL não preciso abrir e não preciso fechar tbm, porque o próprio  "pool" faz essa gestão pra vc; geralmente ele mantém uma conexão ativa, se tem uma conexão sendo muito utilizada ele cria mais 1, ele cuida disso para vc, usar o "pool" e mais profissional e traz mais performance para a aplicação;
const client = mysql.createPool(process.env.CONNECTION_STRING);


// Treinando Usando Dadoss em Memória Com "Array";


async function selectCustomers() { // A regra é para usar "await" dentro função tem que usar "async" na assinatura dela;
  const results = await client.query("SELECT * FROM clientes;"); // OBS: Sempre que fizer uma chamada ao banco de dados, o retorno não é instantâneo, e sempre que o retorno não for instantâneo temos que usar o "await" entre a variável e a minha consulta. O "await" quer dizer só vá para linha de baixo quando receber o retorno do "banco", o "client.query()" (É uma "promise"), e como se fizesse um pedido dados ao "banco" é o "banco" dá uma "promessa"(promise) de que ele vai retornar, então se não esperar e for pra linha de baixo não vai ter os "dados" ainda, então preciso do "await" para que ele só vá para linha de baixo quando receber os "dados" do "banco";
  // OBS: O "results" vai trazer varias coisas, como "metadados", queremos só os clientes que estão na posição [0], por isso "results[0]";
  return results[0];
}

async function selectCustomer(id) {
    const results = await client.query("SELECT * FROM clientes WHERE id=?;", [id])
    
    return results[0];
}


async function insertCustomer(customer) {
    const values = [customer.nome, customer.idade, customer.uf];
    await client.query("INSERT INTO clientes(nome, idade, uf) VALUES (?,?,?)",values);
}

async function updateCustomer(id, customerData) {
    const values = [customerData.nome, customerData.idade, customerData.uf, id];
    await client.query("UPDATE clientes SET nome=?, idade=?, uf=? WHERE id=?", values);
    
}

async function deleteCustomer(id) {
    const values = [id];
    await client.query("DELETE FROM clientes WHERE id=?", values);
}




module.exports={
    selectCustomers,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}





// // Treinando Usando Dadoss em Memória Com "Array";

// const customers = [
//   {
//     id: 1,
//     nome: "Fulano",
//     idade: 35,
//     uf: "RS",
//   },
//   {
//     id: 2,
//     nome: "Ciclano",
//     idade: 35,
//     uf: "RS",
//   },
// ];

// function selectCustomers() {
//     return customers;
// }

// function selectCustomer(id) {
//     return customers.find((c) => c.id === id);
// }

// let ids = 3;
// function insertCustomer(customer) {
//     customer.id = ids;
//     ids++;
//     customers.push(customer);
// }

// function updateCustomer(id, customerData) {
//     const customer = customers.find((c) => c.id === id);
//     if(!customer) return;

//     customer.nome = customerData.nome;
//     customer.idade = customerData.idade;
//     customer.uf = customerData.uf;
// }

// function deleteCustomer(id) {
//     const index = customers.findIndex((c) => c.id === id);
//     customers.splice(index, 1);
// }




// module.exports={
//     selectCustomers,
//     selectCustomer,
//     insertCustomer,
//     updateCustomer,
//     deleteCustomer
// }

