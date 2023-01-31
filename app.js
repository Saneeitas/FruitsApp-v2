/** @format */

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/fruitsDB");

//Fruit collection blueprint
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  review: String,
});

//creating collection
const Fruit = mongoose.model("Fruit", fruitSchema);

//creating document
const fruit = new Fruit({
  name: "Apple",
  rating: 5,
  review: "Pretty solid as a fruit.",
});
//save document
//fruit.save();

//People collection blueprint
const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema,
});

const pineapple = new Fruit({
  name: "Pineapple",
  rating: 9,
  review: "Best Pineapple Alive!",
});
//pineapple.save();

const yalo = new Fruit({
  name: "Yalo da Goba",
  rating: 7,
  review: "Akwai dadi",
});

yalo.save();

//creating collection
const People = mongoose.model("People", peopleSchema);

//creating document
const people = new People({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple,
});

//people.save();

// const orange = new Fruit({
// name: "Orange",
// rating: 5,
// review: "Pretty solid .",
// });
// const banana = new Fruit({
// name: "Banana",
// rating: 9,
// review: "Sweet banana.",
// });
// const kiwi = new Fruit({
// name: "Kiwi",
// rating: 7,
// review: "Pretty ",
// });
//
// Fruit.insertMany([orange, banana, kiwi], function (err) {
// if (err) {
// console.log(err);
// } else {
// console.log("Successfully added to FruitsDB");
// }
// })
//

Fruit.find(function (err, fruits) {
  if (err) {
    console.log(err);
  } else {
    //console.log(fruits);
    mongoose.connection.close();
    fruits.forEach(function (fruit) {
      console.log(fruit.name);
    });
  }
});

//Update
// Fruit.updateOne({_id: "639ad3a7f26270bdf9189f62" }, { name: "Peach" }, function (err) {
// if (err) {
// console.log(err);
// } else {
// console.log("Successfully updated");
// }
// })

//Delete
// Fruit.deleteOne({ name: "Apple" }, function (err) {
// if (err) {
// console.log(err);
// } else {
// console.log("Deleted successsfully");
// }
// })

// People.deleteMany({name: "Sanee Itas"}, function (err){
// if (err) {
// console.log(err);
// } else {
// console.log("Deleted All record");
// }
// })

People.updateOne(
  { name: "Sanee Itas" },
  { favouriteFruit: yalo },
  function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("updated successfully");
    }
  }
);
