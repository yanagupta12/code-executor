import Footer from './Footer'

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
