import { initMongoose } from "../../lib/mongoose";

export default async function handler(req, res) {

	await initMongoose();



	res.json('ok');

}