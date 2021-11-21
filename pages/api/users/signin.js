import connectDB from "../../../middleware/mongodb";
import { User } from "../../../models/User";
import bcrypt from "../../../middleware/bcrypt";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    if (email && password) {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "there is no user with same email",
        });
      } else {
        //when there is user.

        const isMatch = await bcrypt.comparePassword(password, user.password);
        if (isMatch) {
          console.log(user);
          return res.status(200).json({
            user,
          });
        } else {
          return res.status(400).json({ success: false, msg: "you put wrong password" });
        }
      }
    } else {
      res.status(400).json({ success: false, msg: "you have to put email and password" });
    }
  } else {
    res.status(400).json({ success: false, msg: "method not supported" });
  }
};
export default connectDB(handler);
