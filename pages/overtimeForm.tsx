import { useState } from "react"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import axios from "axios"
import { format } from "date-fns"

import { Radiologists, Modalities } from "../src/data"

export type FormValues = {
	radiologist: string
	date: string
	modality: string
	start: string
	end: string
	description: string
}

const OvertimeForm = () => {
	const [isSubmit, setIsSubmit] = useState<boolean>(false)

	const router = useRouter()

	const today = new Date()
	const str_today = format(today, "yyyy-MM-dd")
	const str_now = format(today, "HH:mm")

	// フォームの初期値
	const defaultFormValues = {
		radiologist: "小山内",
		date: str_today,
		modality: "AG",
		start: "17:30",
		end: str_now,
		description: "血栓回収",
	}

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting, isSubmitted, isSubmitSuccessful },
		reset,
	} = useForm<FormValues>({ defaultValues: defaultFormValues })

	const onSubmit = (postData: FormValues) => {
		// 確認を表示 → OKなら処理続行．NOならキャンセル.
		if (window.confirm("この内容で送信してよろしいですか？")) {
			setIsSubmit(true)
			console.log(postData)

			// POST to '/api/add_overtime
			axios.post("/api/add_overtime", { data: postData }).then((res) => {
				console.log(res.status)
				console.log(res.statusText)
				if (res.statusText == "ok") {
					setIsSubmit(true)
					router.push("/overtimeForm")
					reset(defaultFormValues)
				} else {
					setIsSubmit(false)
				}
			})
		} else {
			console.log("送信をキャンセルしました")
			console.log(isSubmit)
		}
	}

	const onReset = () => {
		reset(defaultFormValues)
		console.log("resetしたよ")
	}

	// 送信完了後に表示するコンポーネント
	const submittedComponent: JSX.Element = (
		<div className={"flex flex-col justify-center items-center space-y-6 p-10 min-h-screen"}>
			<p className={"text-3xl text-gray-900 font-semibold"}>送信しました．</p>
			<button
				className={
					"text-base px-4 py-2 rounded-md border-2 outline-none hover:indigo-blue-700 text-gray-700 hover:text-indigo-700"
				}
				onClick={() => {
					setIsSubmit(false)
					router.push("/overtimeForm")
					reset(defaultFormValues)
				}}
			>
				戻る
			</button>
		</div>
	)

	return (
		<>
			{isSubmit ? (
				submittedComponent
			) : (
				<form
					className="flex flex-col h-full w-[500px]  my-8 mx-auto border rounded border-gray-800"
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className="flex flex-col w-full h-full">
						<h2 className="w-full my-4 text-2xl font-semibold text-center">時間外登録フォーム</h2>
					</div>
				</form>
			)}
		</>
	)
}

export default OvertimeForm
