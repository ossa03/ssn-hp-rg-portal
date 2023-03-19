import React, { FC } from "react"

type Props = {
	title: string
}

const Title: FC<Props> = ({ title }) => {
	return (
		<h2 className="justify-center flex-1 p-5 text-2xl font-bold tracking-wide text-center text-neutral-800">{title}</h2>
	)
}

export default Title
