const Sequelize = require("sequelize");
const { Op, DataTypes } = Sequelize;

const sequelize = new Sequelize("sequelize", "root", "193283yeudo@", {
  dialect: "mysql",
});

const Student = sequelize.define(
  "student",
  {
    student_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
      },
    },
    favorite_class: {
      type: DataTypes.STRING,
      defaultValue: "Computer Science",
    },
    school_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subscribe_to_wittCode: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    freezeTableName: true,
  }
);

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Connect");
//     return Student.findAll({
//       attributes: ["name"],
//       where: {
//         [Op.or]: {
//           favorite_class: "Computer Science",
//           subscribe_to_wittCode: true,
//         },
//       },
//     });
//   })
//   .then((data) => console.log(JSON.stringify(data)))
//   .catch((err) => {
//     console.log(err);
//   });

// sequelize
//   .sync()
//   .then(() => {
//     console.log("Connect");
//     return Student.findAll({
//       attributes: [
//         "school_year",
//         [sequelize.fn("COUNT", sequelize.col("school_year")), "num_students"],
//       ],
//       group: "school_year",
//     });
//   })
//   .then((data) => console.log(data))
//   .catch((err) => {
//     console.log(err);
//   });
