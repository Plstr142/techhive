import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ item }) => {
    console.log(item)
    return (
        <div className="border-transparent rounded-sm shadow-md p-2 w-60">
            <div>
                {/* ternary */}
                {
                    item.images && item.images.length > 0
                        ? <img src={item.images[0].url} className='rounded-sm w-full h-50 object-cover hover:scale-101 hover:duration-100' />
                        : <div className="w-full h-50 bg-gray-100 rounded-sm
                text-center flex items-center justify-center shadow-sm"
                        >
                            No Image
                        </div>
                }
            </div>

            <div className="py-2">
                <p className="text-xl">{item.title}</p>
                <p className="text-md text-gray-500">{item.description}</p>
            </div>

            <div className="flex justify-between items-center">
                <span className='text-md font-bold'>{item.price}</span>
                <button className='bg-gray-100 p-2 rounded-sm hover:bg-gray-300 shadow-sm hover:duration-200'><ShoppingCart /></button>
            </div>
        </div>
    )
}
export default ProductCard