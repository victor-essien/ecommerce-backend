
import Product from "../models/Product";
import { Request, Response } from "express";
import User from "../models/User";
import mongoose from "mongoose";

// Product Management

//Access for admin or seller

export const addProduct= async(req:Request, res:Response) => {
    try {
    const {id} = req.body.user
    const {
        name,
        description,
        price,
        images,
        category,
        stock,
        ratings,
        
 }:{
    name:string,
    description:string,
    price:number,
    images:string[],
    category:string,
    stock:number,
    ratings:number,
 } = req.body
    const product = await Product.create({
        name, description, price, images, category,stock, ratings, sellerId:id
    });
    res.status(200).json({
        success:true,
        message:"Product Added Successfully",
        data:product,
    })

    } catch (error) {
        console.log(error)
        res.status(404).json({ message: 'Something went wrong',error });
    }
}


export const  updateProduct = async(req:Request, res:Response) => {

    try {
        const {id } = req.params;
        const {
            name,
            description,
            price,
            images,
            category,
            stock,
            ratings,
        }:{
            name:string,
            description:string,
            price:number,
            images:string[],
            category:string,
            stock:number,
            ratings:number,
        } = req.body
        const product = await Product.findByIdAndUpdate(
            id,
            {
                name,
                description,
                price,
                images,
                category,
                stock,
                ratings,
            },
            {new:true}
        );
    if(!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
        data: product,
      });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "Something went wrong", error });
    }
}

export const deleteProduct = async(req:Request, res:Response) => {
    try {
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
          }
      
          res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: product,
          });
    } catch (error) {
        console.log(error);
    res.status(500).json({ message: "Something went wrong", error });
    }
}

