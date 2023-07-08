import Alert from './alert'
import Footer from './footer'
import Meta from './meta'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        {/* will remove alert because it will no longer be applicable */}
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      {/* will probably remove footer as well */}
      <Footer />
    </>
  )
}

export default Layout
