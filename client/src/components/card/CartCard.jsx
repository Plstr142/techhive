import { Trash2, Minus, Plus } from 'lucide-react';
import usetechhiveStore from '../../store/techhive-store';
import { Link } from "react-router-dom";

const CartCard = () => {
    // Javascript
    const carts = usetechhiveStore((state) => state.carts);
    const actionUpdateQuantity = usetechhiveStore((state) => state.actionUpdateQuantity);
    const actionRemoveProduct = usetechhiveStore((state) => state.actionRemoveProduct);
    const getTotalPrice = usetechhiveStore((state) => state.getTotalPrice);
    console.log(carts)

    return (
        <div>
            <h1 className="text-2xl font-bold">Cart</h1>
            {/* Border */}

            <div className="p-2">

                {/* Card */}
                {
                    carts.map((item, index) =>
                        <div key={index} className="bg-white p-2 space-y-2 shadow-md rounded-sm mb-2">
                            {/* Row 1 */}
                            <div className="flex justify-between">
                                {/* Left */}
                                <div className="flex gap-2 items-center">
                                    {
                                        item.images && item.images.length > 0
                                            ? <img
                                                className='w-20 h-20 rounded-sm'
                                                src={item.images[0].url} /> : <div className="flex w-20 h-20 bg-gray-200 rounded-sm text-center items-center justify-center">
                                                No image
                                            </div>
                                    }



                                    <div>
                                        <p className="font-bold">{item.title}</p>
                                        <p className="text-sm">{item.description}</p>
                                    </div>
                                </div>
                                {/* Right */}
                                <div
                                    onClick={() => actionRemoveProduct(item.id)}
                                    className='text-red-700 p-2'
                                >
                                    <Trash2 />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex justify-between">

                                <div className="flex flex-row gap-3 p-1 items-center">
                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count - 1)}
                                        className="bg-gray-200 py-2 px-2 text-center rounded-sm hover:bg-gray-300">
                                        <Minus size={14} />
                                    </button>
                                    <span className='py-1 px-1'>
                                        {item.count}
                                    </span>
                                    <button
                                        onClick={() => actionUpdateQuantity(item.id, item.count + 1)}
                                        className="bg-gray-200 py-2 px-2 text-center rounded-sm hover:bg-gray-300">
                                        <Plus size={14} />
                                    </button>
                                </div>

                                <div className="font-bold">
                                    <p className='font-semibold'>{item.price * item.count}</p>
                                </div>
                            </div>
                        </div>
                    )
                }


                {/* Total */}
                <div className="flex justify-between pt-2 px-2">
                    <span className='font-bold'>Total</span>
                    <span className='text-md font-semibold'>{getTotalPrice()}</span>
                </div>

                {/* Button */}
                <Link to="/cart">
                    <button className='mt-4 bg-black text-white w-full py-2 rounded-sm shadow-md hover:duration-100 hover:scale-101'>
                        Checkout
                    </button>
                </Link>
            </div>

        </div>
    )
}
export default CartCard