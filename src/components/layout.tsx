import { FC } from "react"
import Header from "./header"

const Layout: FC = ({ children }) => {
	return (
		<>
			<Header />
			<div className="min-h-screen bg-blue mx-auto pt-4 container md:mt-[80px] overflow-hidden">
				<main>{children}</main>
			</div>
		</>
	)
}

export default Layout
