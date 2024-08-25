const Sequelize = require("sequelize");
const { Op, DataTypes } = Sequelize;

const sequelize = new Sequelize("sequelize", "root", "193283yeudo@", {
  dialect: "mysql",
});

const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);

sequelize
  .sync()
  .then(() => {
    // Chỉ lấy trường name và password
    // return User.findAll({ attributes: ["name", "password"] });
    // lấy tất cả trừ trường password ra
    // return User.findAll({ attributes: {exclude: ['password']} });
    // return User.findAll({ where: { age: 30 } });
    // return User.findAll({ attributes: ["name"], where: { age: 30 } });
    // Bỏ quả 2 => dùng để phân trang
    // return User.findAll({ skip: 2 });
    // Limit
    // return User.findAll({ limit: 2 });
    // Sắp xếp theo
    // return User.findAll({ order: [["age", "DESC"]] });
    // Nhóm
    // return User.findAll({
    //   attributes: [
    //     "name",
    //     [sequelize.fn("SUM", sequelize.col("age")), "sum_age"],
    //   ],
    //   group: "name",
    // });
    // Operator
    // return User.findAll({
    //   where: {
    //     [Op.and]: { name: "PVH", age: 30 },
    //   },
    // });

    // Hàm fn =>
    // return User.findAll({
    //   where: sequelize.where(
    //     sequelize.fn("char_length", sequelize.col("name")),
    //     4
    //   ),
    // });

    // update(data, option) or save()
    return User.update(
      { name: "Phan Van Hai" },
      {
        where: { age: 30 },
      }
    );

    // return User.findAll({
    // tính tổng theo trường age
    //   attributes: [[sequelize.fn("SUM", sequelize.col("age")), "howOld"]],
    // });
  })
  .then((data) => {
    console.log(JSON.stringify(data));
  })
  .catch((err) => {
    console.log(err);
  });

// bulkCreate = tạo nhiều bản ghi
