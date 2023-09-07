import Footer from "./Footer/Index"


export default function Layout({ children }: { children: any }) {
    return (
        <div>
            {children}
            <Footer />
        </div>
    )
}