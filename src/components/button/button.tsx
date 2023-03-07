import React, { FC } from "react"

type Props = {
	title: string
	handleButton?: () => VoidFunction
}

const Button: FC<Props> = ({ title, handleButton }) => {
	return (
		<div
			className={`flex items-center justify-center px-4 py-2 lg:space-x-1 transition-all rounded-full cursor-pointer hover:bg-gray-100 group`}
		>
			<div
				className={` hidden lg:block text-xs lg:text-xl transition-all group-active:opacity-60 items-center justify-center `}
			>
				{title}
			</div>
		</div>
	)
}

export default Button
