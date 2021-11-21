import connectDB from "../../../middleware/mongodb";
import { User } from "../../../models/User";
import bcrypt from "../../../middleware/bcrypt";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    const { name, email, password } = req.body;
    if (name && email && password) {
      const user = await User.findOne({ email: email });
      if (user) {
        return res.status(400).json({
          success: false,
          msg: "there is already user with same email",
        });
      } else {
        try {
          const hashPassword = await bcrypt.hashPassword(password);
          const newUser = new User({
            name,
            email,
            password: hashPassword,
          });
          const userCreated = await newUser.save();
          return res.status(200).json({
            success: true,
            msg: "new user successfully created",
            data: userCreated,
          });
        } catch (error) {
          return res.status(500).json({ success: false, msg: error });
        }
      }
    } else {
      res.status(400).json({ success: false, msg: "you have to complete all information" });
    }
  } else {
    res.status(400).json({ success: false, msg: "method not supported" });
  }
};
export default connectDB(handler);
