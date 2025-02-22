import mongoose, {Schema, Document} from "mongoose";

// Create interface for Order

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    items: {product: mongoose.Types.ObjectId, quantity: number}[];
    totalAmount: number;
    status: "pending" | "shipped" | "delivered" | "cancelled";
    paymentStatus: "pending" | "paid" | "failed";
    shippingAddress: string;
    createdAt: Date;
}


    const OrderSchema = new Schema<IOrder>(
        {
          user: { type: Schema.Types.ObjectId, ref: "User", required: true },
          items: [
            {
              product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
              quantity: { type: Number, required: true },
            },
          ],
          totalAmount: { type: Number, required: true },
          status: { type: String, enum: ["pending", "shipped", "delivered", "cancelled"], default: "pending" },
          paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
          shippingAddress: { type: String, required: true },
        },
        { timestamps: true }
      );
      
export default mongoose.model<IOrder>("Order", OrderSchema);