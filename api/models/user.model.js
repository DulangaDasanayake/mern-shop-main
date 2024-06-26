import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    //user account data at below
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar:{
      type: String,
      //at the begining user don't have a profile picture the link will be the default dp
      default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
