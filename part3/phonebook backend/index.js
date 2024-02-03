require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
const morgan = require("morgan");
const Person = require("./model/person");
const { log } = require("console");

// Define a custom token to display request body
morgan.token("tiny", function (req, res) {
  return JSON.stringify(req.body);
});

// Use the custom token in the morgan middleware
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :tiny")
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id)
    .then((result) => {
      response.json(result);
    })
    .catch((e) => response.status(404).json({ error: "not found" }));
});

app.get("/info", (request, response) => {
  const length = notes.length;
  response.setHeader("Current-Time", new Date());
  const dateHeader = response.getHeader("Current-Time");
  response.send(
    `<p>Phonebook has info for ${length} people</p><p>${dateHeader}</p>`
  );
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  if (notes.find((n) => n.id === id)) {
    notes = notes.filter((n) => n.id !== id);
    return response.status(204).end();
  } else {
    response
      .status(404)
      .end("<p>Delete Operation failed: Person doesn't exists.");
  }
});
morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms",
  ].join(" ");
});

app.post("/api/persons", (request, response) => {
  const ipName = request.body.name;
  const ipNumber = request.body.number;
  if (!ipName || !ipNumber) {
    return response.status(206).json({ error: "name or number missing" });
  }
  const person = new Person({
    name: ipName,
    number: ipNumber,
  });
  person
    .save()
    .then((result) => response.json(result))
    .catch((e) => console.log(e));
});
const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
