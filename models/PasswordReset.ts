import mongoose, {Schema, Document} from "mongoose";
//Create an interface for our PasswordReset

export interface IPasswordReset extends Document {
    user:mongoose.Types.ObjectId; 
    email: string;
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

const PasswordResetSchema = new Schema <IPasswordReset>({

    user: {type:Schema.Types.ObjectId, ref:"User", required:true},
    email: {type:String, required:true, unique:true},
    token: {type:String},

},
{ timestamps: true }
)   

export default mongoose.model<IPasswordReset>("PasswordReset", PasswordResetSchema )