const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const id = Math.floor(Math.random() * 10000);

const name = process.argv[3];

const number = process.argv[4];

const url = `mongodb+srv://lucifermichael0902:${password}@cluster0.dn1igpv.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});
const Person = mongoose.model("Person", personSchema);

if (name && number) {
  const person = new Person({
    id: id,
    name: name,
    number: number,
  });

  person.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  console.log("phonebook: \n");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}
