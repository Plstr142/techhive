import ProductCard from "../components/card/ProductCard"

const Shop = () => {
    // const token = ;

    return (
        <div className="flex">
            {/* Search Bar */}
            <div className="w-1/4 p-4 bg-gray-100 h-screen">
                Searchbar
            </div>

            {/* Product */}
            <div className="w-1/2 p-4 h-screen overflow-y-auto">
                <p className="text-2xl font-bold mb-4">All Product</p>
                <div className="flex flex-row flex-wrap gap-4 justify-center">
                    {/* Product Card */}
                    <ProductCard />
                    {/* Product Card */}
                </div>
                <div className="flex flex-row flex-wrap gap-1 justify-center">
                    {/* Product Card */}
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    {/* Product Card */}
                </div>
            </div>

            {/* Cart */}
            <div className="w-1/4 bg-gray-100 p-4 overflow-y-auto">
                Cart
            </div>
        </div>
    )
}
export default Shop