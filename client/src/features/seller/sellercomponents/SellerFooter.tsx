function SellerFooter() {
    const year = new Date().getFullYear();
    return (
        <footer>
            {/* Footer Bottom */}
            <div className="bg-black text-white text-center text-xs sm:text-sm py-4">
                <p>Copyright © {year} The BlueSky Online - All Rights Reserved.</p>
            </div>
        </footer>
    )
}
export default SellerFooter