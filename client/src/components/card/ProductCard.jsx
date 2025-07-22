import { ShoppingCart } from 'lucide-react';

const ProductCard = () => {
    return (
        <div className="border-transparent rounded-sm shadow-md p-2 w-40 h-auto">
            <div className="">
                <div className="w-full h-24 bg-gray-100 rounded-sm
                text-center flex items-center justify-center shadow-sm"
                >
                    No Image
                </div>
            </div>

            <div className="py-2">
                <p className="text-xl">Title</p>
                <p className="text-md text-gray-500">Description....</p>
            </div>

            <div className="flex justify-between items-center">
                <span className='text-md font-bold'>24000</span>
                <button className='bg-gray-100 p-2 rounded-sm hover:bg-gray-300 shadow-sm hover:duration-200'><ShoppingCart /></button>
            </div>
        </div>
    )
}
export default ProductCard