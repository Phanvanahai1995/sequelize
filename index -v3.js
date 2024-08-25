const Sequelize = require("sequelize");
const { Op, DataTypes } = Sequelize;
const bcrypt = require("bcrypt");
const zlib = require("zlib");

const sequelize = new Sequelize("sequelize", "root", "193283yeudo@", {
  dialect: "mysql",
});

const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 20],
      },
      get() {
        const rawValue = this.getDataValue("name");
        return rawValue.toUpperCase();
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hashPassword = bcrypt.hashSync(value, 12);
        this.setDataValue("password", hashPassword);
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
    description: {
      type: DataTypes.STRING,
      set(value) {
        const compressed = zlib.deflateRawSync(value).toString("base64");
        this.setDataValue("description", compressed);
      },
    },
    aboutUSer: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} ${this.description}`;
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

sequelize
  .sync()
  .then(() => {
    return sequelize.query('UPDATE user SET age = 54 WHERE name="PVH"');

    // return User.create({
    //   name: "phanhai1995",
    //   password: "12345678",
    //   age: 28,
    //   email: "dadsadasd",
    // });
    // return User.findOne();
    // return User.create({
    //   name: "huong",
    //   password: "12345678",
    //   age: 28,
    // });
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
    // return User.update(
    //   { name: "Phan Van Hai" },
    //   {
    //     where: { age: 30 },
    //   }
    // );
    // return User.findAll({
    // tính tổng theo trường age
    //   attributes: [[sequelize.fn("SUM", sequelize.col("age")), "howOld"]],
    // });
  })
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// bulkCreate = tạo nhiều bản ghi
