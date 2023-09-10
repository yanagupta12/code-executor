import Navbar from '../Navbar'

const LayoutWithNav = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}

export default LayoutWithNav
