const Sequelize = require("sequelize");
const { Op, DataTypes } = Sequelize;

const sequelize = new Sequelize("sequelize", "root", "193283yeudo@", {
  dialect: "mysql",
});

const Country = sequelize.define(
  "country",
  {
    countryName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

const Capital = sequelize.define(
  "capital",
  {
    capitalName: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: false,
  }
);

// onDelete: 'CASCADE' => Xóa ỏ cả 2 table
Country.hasOne(Capital, { onDelete: "CASCADE" });
Capital.belongsTo(Country, { onDelete: "CASCADE" });

let capital, country;

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     // working with our update table
//     return Country.destroy({ where: { countryName: "Spain" } });
//   })
//   .then((data) => {
//     console.log(data);
//   })

//   .catch((err) => {
//     console.log(err);
//   });

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     // working with our update table
//     return Country.findOne({ where: { countryName: "France" } });
//   })
//   .then((data) => {
//     country = data;
//     return Capital.findOne({ where: { capitalName: "Paris" } });
//   })
//   .then((data) => {
//     capital = data;
//     capital.setCountry(country);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     // working with our update table
//     return Capital.findOne({ where: { capitalName: "Madrid" } });
//   })
//   .then((data) => {
//     capital = data;
//     return Country.findOne({ where: { countryName: "Spain" } });
//   })
//   .then((data) => {
//     country = data;
//     country.setCapital(capital);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     // working with our update table
//     // return Country.create({ countryName: "USA" });
//   })
//   .then((data) => {
//     // country = data;
//     // return country.createCapital({
//     //   capitalName: "Washington, D.C",
//     // });
//   })
//   // .then((data) => console.log(JSON.stringify(data)))

//   .catch((err) => {
//     console.log(err);
//   });
