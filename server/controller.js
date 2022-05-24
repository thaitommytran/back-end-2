const houses = require("./db.json");

let globalId = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).send(houses);
  },
  deleteHouse: (req, res) => {
    let index = houses.findIndex((element) => element.id === +req.params.id);
    houses.splice(index, 1);
    res.status(200).send(houses);
  },
  createHouse: (req, res) => {
    let { address, price, imageURL } = req.body;

    let newHouse = {
      id: globalId,
      address,
      price,
      imageURL
    };

    houses.push(newHouse);
    res.status(200).send(houses);
    globalId++;
  },
  updateHouse: (req, res) => {
    let id = req.params.id;
    let type = req.body.type;
    let index = houses.findIndex((element) => element.id === +id);

    if (type === "minus") {
      houses[index].price -= 10000;
      if (houses[index].price < 0) {
        houses[index].price = 0;
      }
      res.status(200).send(houses);
    } else if (type === "plus") {
      houses[index].price += 10000;
      res.status(200).send(houses);
    }
  }
};
