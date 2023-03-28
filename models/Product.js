import { model, models, Schema } from "mongoose";

const ProductSchema = new Schema({
	name: String,
	description: String,
	price: String,
	category: String,
	pictures: String,
})

const Product = models?.Produc || model('Produc', ProductSchema);

export default Product;