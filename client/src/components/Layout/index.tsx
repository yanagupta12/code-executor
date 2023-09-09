import Footer from './Footer'

export default function Layout({ children }: { children: any }) {
  return (
    <div>
      {children}
      <Footer />
    </div>
  )
}
