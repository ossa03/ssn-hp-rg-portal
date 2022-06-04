import { FC } from "react"
import Header from "./header"

const Layout: FC = ({ children }) => {
	return (
		<>
			<Header />
			<div className="min-h-screen bg-blue mx-auto py-4 container mt-[80px] overflow-hidden">
				<main>{children}</main>
			</div>
		</>
	)
}

export default Layout
