import userSevices from "../services/userServices";

let handleLogin = async (req, res) => {
  let taikhoan = req.body.taikhoan;
  let password = req.body.password;
  //check taikhoan exist
  if (!taikhoan || !password) {
    return res.status(500).json({
      errcode: 1,
      message: "vui lòng điền đầy đủ thông tin",
    });
  }

  //compare password

  // return userInfor
  //access_token:jWT JSON web token
  let userData = await userSevices.handleUserLogin(taikhoan, password);
  console.log(userData);
  return res.status(200).json({
    errcode: userData.errcode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {}, // check trên api in ra
  });
};
let handleGetAllUser = async (req, res) => {
  let id = req.query.id; //all, id
  if (!id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing require parameters",
      users: [],
    });
  }
  let users = await userSevices.getAllUsers(id);
  console.log(users);
  return res.status(200).json({
    errcode: 0,
    errMessage: "OK",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userSevices.CreateNewUser(req.body);
  console.log(message);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errcode: 1,
      errMessage: "Missing required parameters !",
    });
  }
  let message = await userSevices.deleteUser(req.body.id);
  console.log(message);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userSevices.updateUserData(data);
  return res.status(200).json(message);
};

let getAllCode = async (req, res) => {
  try {
    let data = await userSevices.getAllCodeService(req.query.type);
    return res.status(200).json(data);
  } catch (e) {
    console.log("get allcode error", e);
    return res.status(200).json({
      errcode: -1,
      errMessage: "Error from sever",
    });
  }
};

let forgotPassword = async (req, res) => {
  const gmailInput = req.body.gmail;
  console.log(gmailInput);
  Users.findOne({ gmail: gmailInput })
    .then((user) => {
      if (!user) {
        return res.status(403).json("Not find User");
      }
      const secret = process.env.JWT_ACCESS_TOKEN + user.password;
      const token = JwtFactory.createToken(
        { gmailInput: user.gmailInput, id: user._id },
        secret,
        "5m"
      );
      const link = process.env.linkResetPasswordAPI + `/${user._id}/${token}`;
      console.log(link);
      transporter.sendMail({
        to: gmailInput, //! gmailInput
        from: "hoangtan10103@gmail.com",
        subject: "Link To Reset Password",
        html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h1 style="color: #5a5a5a;">Password Reset Request</h1>
      <p>Hi there,</p>
      <p>You requested a password reset. Please click on the link below to set a new password:</p>
      <a href="${link}" style="background-color: #f05b4d; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; margin-top: 10px;">Reset Password</a>
      <p>If you did not request a password reset, please ignore this email.</p>
    </div>
  `,
      });
      return res.status(200).json("success");
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
let resetPassword = async (req, res) => {
  const { id, token } = req.params;
  Users.findOne({ _id: id }).then((user) => {
    if (!user) {
      return res.json("User not found");
    }
    const secret = process.env.JWT_ACCESS_TOKEN + user.password;
    try {
      const verify = jwt.verify(token, secret);
      // res.render('change-password', {
      //   gmail: user.gmail,
      //   id: user.id,
      //   token: req.params.token,
      // });6
      res
        .status(200)
        .json({ gmail: user.gmail, id: user.id, token: req.params.token });
    } catch (err) {
      res.send("not verified");
    }
  });
};

 let postResetPassword = async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    try {
      const user = await Users.findOne({ _id: id });
      if (!user) {
        return res.json('User not found');
      }
      const secret = process.env.JWT_ACCESS_TOKEN + user.password;
      const verify = jwt.verify(token, secret);
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      // Update the user's password with the hashed password
      await Users.updateOne(
        { _id: id },
        {
          $set: {
            password: hash,
          },
        },
      );
      res.redirect('/');
    } catch (err) {
      console.error(err);
      res.send('Not verified');
    }
  }

module.exports = {
  handleLogin: handleLogin,
  handleGetAllUser: handleGetAllUser,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
};
