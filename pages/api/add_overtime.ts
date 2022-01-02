import type { NextApiRequest, NextApiResponse } from "next"
import NextCors from "nextjs-cors"
import axios from "axios"

import { FormValues } from "../overtimeForm"

type ErrorMessage = { error: string } | any

type ResponseData = FormValues | ErrorMessage

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	try {
		// Run the cors middleware
		// nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
		await NextCors(req, res, {
			// Options
			methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
			origin: "*",
			optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
		})

		const postedData: FormValues = req.body

		console.log("postedData", postedData)

		// Rest of the API logic
		const GAS_OVERTIME_API_URL =
			"https://script.google.com/macros/s/AKfycbxkJURlMhwaNmmXedv2LD2qR---fDKYxH-VBOmKaUk6mWY-3FncnT6wrrT2UucFeBATRg/exec"

		//! add to spreadsheet
		await axios.post(GAS_OVERTIME_API_URL, {
			...postedData,
		})

		console.log("posted !!")

		// Rest of the API logic
		res.status(200).json(req.body)
	} catch (error) {
		res.status(400).json({ error })
		console.log("osaError: ", error)
	}
}
