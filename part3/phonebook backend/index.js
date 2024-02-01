const express = require("express");
const app = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());
app.use(express.static('dist'))
const morgan = require("morgan");

// Define a custom token to display request body
morgan.token('tiny', function (req, res) {
  return JSON.stringify(req.body);
});

// Use the custom token in the morgan middleware
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :tiny'));

let notes = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
// console.log("hey dude");
// const app = http.createServer((request, response) => {
//   if (request.url === "/api/persons") {
//     response.writeHead(200, { "Content-type": "application/json" });
//     response.end(JSON.stringify(notes));
//   } else {
//     response.writeHead(404, { "Content-type": "text/plain" });
//     response.end("Not Found");
//   }
// });
app.get("/api/persons", (request, response) => {
  response.json(notes);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((n) => n.id === id);
  note ? response.json(note) : response.status(404).end();
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
  } else if (notes.find((n) => n.name === ipName)) {
    return response.status(409).json({ error: "name must be unique" });
  }
  const note = {
    id: Math.floor(Math.random() * 10000),
    name: ipName,
    number: ipNumber,
  };
  notes = notes.concat(note);
  response.json(note);
});
const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
