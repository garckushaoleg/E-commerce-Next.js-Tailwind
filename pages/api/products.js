import { initMongoose } from '../../lib/mongoose';
import Product from "../../models/Product";

export async function findAllProducts() {
	return await Product.find().exec();
}

export default async function handler(req, res) {
	await initMongoose();

	const { ids } = req.query;
	console.log(ids)
	if (ids) {
		res.json( await Product.find({
			'_id': {
				$in: ids.split(','),
			}
		}).exec() );
	} else {
		res.json( await findAllProducts() );
	}
}