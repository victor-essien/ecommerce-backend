import mongoose, {Schema, Document} from "mongoose";

export interface IVerification extends Document {
    user: mongoose.Types.ObjectId;
    token:string
    verificationStatus: "success" | "failed";
    createdAt: Date;
    expiresAt:Date
}

const VerificationSchema = new Schema<IVerification> (
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        token: {type: String, required:true},
        verificationStatus: {type:String, enum: ["success", "failed"],required:true},
        // createdAt: { type: Date, default: Date.now, required: true },
        expiresAt: { type: Date, required: true }
    },
    { timestamps: true }
)

export default mongoose.model <IVerification>("Verification", VerificationSchema);