import type { AppProps } from "next/app"
import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth"
import Layout from "../src/components/layout"
import "../src/styles/global.css"

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
	return (
		<SessionProvider session={session}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</SessionProvider>
	)
}
export default MyApp
