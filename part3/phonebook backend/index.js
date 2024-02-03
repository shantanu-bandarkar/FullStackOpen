require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
const morgan = require("morgan");
const Person = require("./model/person");

// Define a custom token to display request body
morgan.token("tiny", function (req, res) {
  return JSON.stringify(req.body);
});

// Use the custom token in the morgan middleware
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :tiny")
);

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

app.get("/info", async (request, response) => {
  try {
    const persons = await Person.find({});
    const length = persons.length;

    response.setHeader("Current-Time", new Date());
    const dateHeader = response.getHeader("Current-Time");

    response.send(
      `<p>Phonebook has info for ${length} people</p><p>${dateHeader}</p>`
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const person = {
    name: request.body.name,
    number: request.body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => response.json(updatedPerson))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => response.status(204).json(result))
    .catch((error) => next(error));
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// handler of requests with unknown endpoint
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// this has to be the last loaded middleware.
app.use(errorHandler);
