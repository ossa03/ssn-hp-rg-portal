import { FC, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
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
		description: "",
	}

	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitted, isSubmitSuccessful },
	} = useForm<FormValues>({
		defaultValues: defaultFormValues,
	})

	const onSubmit = (postData: FormValues) => {
		// TODO 確認を表示 → OKなら処理続行．NOならキャンセル.としたいが、キャンセルを押してもconfirmが作動してOK押したら送信されてしまう．
		if (window.confirm("この内容で送信してよろしいですか？")) {
			//TODO 送信キャンセルしてもデータが送信される件 一旦コメントアウト
			//// setIsSubmit(true)
			console.log(postData)

			// POST to '/api/add_overtime
			axios.post("/api/add_overtime", { data: postData })
			//TODO 送信キャンセルしてもデータが送信される件 一旦コメントアウト
			//// .then((res) => {
			//// console.log(res.status)
			//// console.log(res.statusText)
			//// if (res.statusText == "ok") {
			//// 	setIsSubmit(true)
			//// 	router.push("/overtimeForm")
			//// 	reset(defaultFormValues)
			//// } else {
			//// 	setIsSubmit(false)
			//// }
			//// })

			setIsSubmit(true)

			console.log("送信したよ")
			console.log(isSubmitted)
		} else {
			console.log("送信をキャンセルしました")
			console.log(isSubmitted)
			setIsSubmit(false)
		}
	}

	const onReset = () => {
		reset(defaultFormValues)
		console.log("resetしたよ")
	}

	// 送信完了後に表示するコンポーネント
	const SubmittedComponent: JSX.Element = (
		<div className={"flex flex-col justify-center items-center space-y-6 p-10 min-h-screen"}>
			<p className={"text-3xl text-gray-900 font-semibold"}>送信しました．</p>
			<button
				className={
					"text-base px-4 py-2 rounded-md border-2 outline-none hover:indigo-blue-700 text-gray-700 hover:text-indigo-700"
				}
				onClick={() => {
					//TODO 送信キャンセルしてもデータが送信される件 一旦コメントアウト
					//// setIsSubmit(false)
					router.push("/overtimeForm")
					reset(defaultFormValues)
				}}
			>
				戻る
			</button>
		</div>
	)

	// フォームコンポーネント
	const FormComponent: JSX.Element = (
		<form
			className="flex flex-col h-max  w-[560px]  my-8 mx-auto border rounded-sm shadow-sm"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="flex flex-col w-full ">
				<h2 className="w-full my-4 text-2xl font-semibold text-center">時間外登録フォーム</h2>
				<div className="flex flex-col w-full px-12 py-6">
					<div className="space-y-6 text-lg ">
						<div>
							<label className="block w-full">
								名前
								<select
									className="w-full px-4 py-2 border rounded"
									{...register("radiologist", { required: "名前を選択してください" })}
								>
									{Radiologists.map((radiologist) => (
										<option key={radiologist.value} value={radiologist.value}>
											{radiologist.label}
										</option>
									))}
								</select>
							</label>
						</div>
						<div>
							<label className="block w-full">
								モダリティ
								<select
									className="w-full px-4 py-2 border rounded"
									{...register("modality", { required: "モダリティを選択してください" })}
								>
									{Modalities.map((modality) => (
										<option key={modality.value} value={modality.value}>
											{modality.label}
										</option>
									))}
								</select>
							</label>
						</div>
						<div>
							<label className="block w-full">
								実施日
								<input
									className="block w-full px-4 py-2 border rounded "
									type="date"
									{...register("date", { required: "実施日を入力してください" })}
								/>
							</label>
						</div>
						<div>
							<label className="block w-full">
								開始時間
								<input
									className="block w-full px-4 py-2 border rounded "
									type="time"
									{...register("start", { required: "開始時間を入力してください" })}
								/>
							</label>
						</div>
						<div>
							<label className="block w-full">
								終了時間
								<input
									className="block w-full px-4 py-2 border rounded "
									type="time"
									{...register("end", { required: "終了時間を入力してください" })}
								/>
							</label>
						</div>
						<div>
							<label className="block w-full">
								内容
								<textarea
									className="block w-full px-4 py-2 border rounded "
									{...register("description", { required: "業務内容を入力してください" })}
								/>
							</label>
						</div>
						<div className="flex w-full px-12 space-x-6 text-slate-50">
							<button className="w-full p-2 rounded-full bg-sky-500 hover:bg-sky-600 active:bg-sky-400" type="submit">
								送 信
							</button>
							<button
								className="w-full p-2 bg-pink-500 rounded-full hover:bg-pink-600 active:bg-pink-400"
								onClick={onReset}
							>
								リセット
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	)

	return (
		<>
			<Head>
				<title>時間外登録フォーム</title>
			</Head>

			{isSubmitted && isSubmit ? SubmittedComponent : FormComponent}
		</>
	)
}

export default OvertimeForm
