import Footer from "./Footer/Index"
import Navbar from "./Navbar/Index"



export default function Layout({ children }: { children: any }) {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    )
}