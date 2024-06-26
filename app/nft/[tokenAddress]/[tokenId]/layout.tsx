export default function NftDetailLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <section>
            <nav></nav>
            {children}
        </section>
    )
}