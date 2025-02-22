import mongoose, {Schema, Document} from "mongoose";
import bcrypt from 'bcryptjs';

// Create an interface representing a document in MongoDB
export interface IUser extends Document {
    name:string,
    email:string,
    password:string,
    role: "customer" | "admin" | "seller",
    address?:string,
    verified?:boolean,
    createdAt:Date,
    comparePassword: (password:string) => Promise<boolean>

}

const UserSchema = new Schema<IUser>({
name: {type: String, required: true},
email: {type: String, required: true, unique: true},
password: {type: String, required: true},
role: {type: String, enum: ["customer", "admin", "seller"], default: "customer"},
verified: {type:Boolean, default:false},
address: {type: String},
}
, {timestamps: true})

// Hash password before saving
UserSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        return next();
    }
this.password = await bcrypt.hash(this.password, 10);
next();
})


// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);