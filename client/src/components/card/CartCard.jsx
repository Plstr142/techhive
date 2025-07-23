import { Trash2 } from 'lucide-react';

const CartCard = () => {
    return (
        <div>
            <h1 className="text-2xl font-bold">Cart</h1>
            {/* Border */}

            <div className="p-2">
                {/* Card */}
                <div className="bg-white p-2 space-y-2 shadow-md rounded-sm">
                    {/* Row 1 */}
                    <div className="flex justify-between">
                        {/* Left */}
                        <div className="flex gap-2 items-center">
                            <div className="flex py-10 px-4 bg-gray-200 rounded-sm text-center items-center">
                                No image
                            </div>
                            <div>
                                <p className="text-sm">Description</p>
                            </div>
                        </div>
                        {/* Right */}
                        <div className='text-red-700 p-2'>
                            <Trash2 />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex justify-between">

                        <div className="flex flex-row gap-3 p-1">
                            <button className="bg-gray-200 w-6 h-full text-center rounded-sm hover:bg-gray-300">
                                -
                            </button>
                            <span>
                                {"0"}
                            </span>
                            <button className="bg-gray-200 w-6 h-full text-center rounded-sm hover:bg-gray-300">
                                +
                            </button>
                        </div>

                        <div className="font-bold">
                            <p className='font-semibold'>Price: {"40000"}</p>
                        </div>
                    </div>
                </div>

                {/* Total */}
                <div className="flex justify-between pt-2 px-2">
                    <span className='font-bold'>Total</span>
                    <span className='text-md font-semibold'>6100000</span>
                </div>

                {/* Button */}
                <button className='mt-4 bg-black text-white w-full py-2 rounded-sm shadow-md hover:duration-100 hover:scale-101'>
                    Checkout
                </button>
            </div>

        </div>
    )
}
export default CartCard