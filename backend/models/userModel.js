import mongoose from "mongoose"

const User = new mongoose.Schema({
    username: { type:String, required:true, unique:true, trim: true, minlength:3}
})

const userSchema = mongoose.model('User', User)

export default userSchema;