const Sequelize = require("sequelize");
const { Op, DataTypes } = Sequelize;

const sequelize = new Sequelize("sequelize", "root", "193283yeudo@", {
  dialect: "mysql",
});

const User = sequelize.define(
  "user",
  {
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

const Post = sequelize.define(
  "post",
  {
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

User.hasMany(Post);
Post.belongsTo(User);

let user, posts;

// sequelize
//   .sync({ alter: true })
//   .then(() => {
//     // working with our update table
//     return User.findOne({ where: { username: "WittCode" } });
//   })
//   .then((data) => {
//     user = data;
//     return Post.findAll();
//   })
//   .then((data) => {
//     posts = data;
//     return user.addPosts(posts);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

sequelize
  .sync({ alter: true })
  .then(() => {
    // working with our update table
    return User.findOne({ where: { username: "WittCode" } });
  })
  .then((data) => {
    user = data;
    return user.countPosts();
  })
  .then((data) => console.log("ok"))

  .catch((err) => {
    console.log(err);
  });
