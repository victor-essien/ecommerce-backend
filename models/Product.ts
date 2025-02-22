import mongoose, {Schema, Document} from "mongoose";

export interface IProduct extends Document {
    name:string,
    description:string,
    price:number,
    images:string[],
    category:string,
    stock:number,
    ratings: number;
    seller: mongoose.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>({
    name: {types: String, required: true},
    description: {types: String, required: true},
    price: {types: Number, required: true},
    images: [{types: String, required: true}],
    category: {types: String, required: true},
    stock: {types: Number, required: true},
    ratings: {types: Number, default: 0},
    seller: {types: mongoose.Types.ObjectId, ref: "User", required: true}
}, {
    timestamps: true
})


export default mongoose.model<IProduct>("Product", ProductSchema);