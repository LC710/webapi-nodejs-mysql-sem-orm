require("dotenv").config();
const db = require("./db.js")

const express = require("express");

const app = express();

app.use(express.json());


console.log(db)


app.delete("/clientes/:id", async (request, response) => {
  const id = parseInt(request.params.id); // Por "Route Params" na URL: "/1", exemplo: "http://localhost:3000/clientes/1"
  const customer = request.body; 
  await db.deleteCustomer(id);
  response.sendStatus(204);
});

app.patch("/clientes/:id", async (request, response) => {
  const id = parseInt(request.params.id); // Por "Route Params" na URL: "/1", exemplo: "http://localhost:3000/clientes/1"
  const customer = request.body;
  await db.updateCustomer(id, customer);
  response.sendStatus(200);
});

app.post("/clientes", async (request, response) => {
  const customer = request.body;
  await db.insertCustomer(customer);
  response.sendStatus(201);
});

app.get("/clientes/:id", async (request, response) => { // A regra é para usar "await" dentro função tem que usar "async" na assinatura dela;
  const id = parseInt(request.params.id); // Por "Route Params" na URL: "/1", exemplo: "http://localhost:3000/clientes/1"
  // const id = parseInt(request.params.id); // Por "Query Params" na URL: "?id=1", exemplo: "http://localhost:3000/clientes?id=1"
  const results = await db.selectCustomer(id); // OBS: Sempre que fizer uma chamada ao banco de dados, o retorno não é instantâneo, e sempre que o retorno não for instantâneo temos que usar o "await" entre a variável e a minha consulta. O "await" quer dizer só vá para linha de baixo quando receber o retorno do "banco", o "client.query()" (É uma "promise"), e como se fizesse um pedido dados ao "banco" é o "banco" dá uma "promessa"(promise) de que ele vai retornar, então se não esperar e for pra linha de baixo não vai ter os "dados" ainda, então preciso do "await" para que ele só vá para linha de baixo quando receber os "dados" do "banco";
  response.json(results);
});

app.get("/clientes", async (request, response) => {
  // A regra é para usar "await" dentro função tem que usar "async" na assinatura dela;
  const results = await db.selectCustomers(); // OBS: Sempre que fizer uma chamada ao banco de dados, o retorno não é instantâneo, e sempre que o retorno não for instantâneo temos que usar o "await" entre a variável e a minha consulta. O "await" quer dizer só vá para linha de baixo quando receber o retorno do "banco", o "client.query()" (É uma "promise"), e como se fizesse um pedido dados ao "banco" é o "banco" dá uma "promessa"(promise) de que ele vai retornar, então se não esperar e for pra linha de baixo não vai ter os "dados" ainda, então preciso do "await" para que ele só vá para linha de baixo quando receber os "dados" do "banco";
  response.json(results);
});

app.get("/", (request, response, next) => {
  response.json({
    message: "It's alive !"
  })
});

app.listen(process.env.PORT, () => {
    console.log("App is Running, Port: " + process.env.PORT);
});



// Treinando Usando Dados em Memória Com "Array";

// app.delete("/clientes/:id", (request, response) => {
//   const id = parseInt(request.params.id); // Por "Route Params" na URL: "/1", exemplo: "http://localhost:3000/clientes/1"
//   const customer = request.body;
//   db.deleteCustomer(id);
//   response.sendStatus(204);
// });

// app.patch("/clientes/:id", (request, response) => {
//   const id = parseInt(request.params.id); // Por "Route Params" na URL: "/1", exemplo: "http://localhost:3000/clientes/1"
//   const customer = request.body;
//   db.updateCustomer(id, customer);
//   response.sendStatus(200);
// });

// app.post("/clientes", (request, response) => {
//   const customer = request.body;
//   db.insertCustomer(customer);
//   response.sendStatus(201);
// });

// app.get("/clientes/:id", (request, response) => {
//   const id = parseInt(request.params.id); // Por "Route Params" na URL: "/1", exemplo: "http://localhost:3000/clientes/1"
//   // const id = parseInt(request.params.id); // Por "Query Params" na URL: "?id=1", exemplo: "http://localhost:3000/clientes?id=1"
//   console.log(id);
//   response.json(db.selectCustomer(id));
// });

// app.get("/clientes", (request, response) => {
//   response.json(db.selectCustomers());
// });

// app.get("/", (request, response, next) => {
//   response.json({
//     message: "It's alive !",
//   });
// });

// app.listen(process.env.PORT, () => {
//   console.log("App is Running, Port: " + process.env.PORT);
// });