import { List, ListCheck, Trash2 } from 'lucide-react';
import usetechhiveStore from '../../store/techhive-store';
import { Link } from 'react-router-dom';

const ListCart = () => {
    const carts = usetechhiveStore((state) => state.carts);
    const getTotalPrice = usetechhiveStore((state) => state.getTotalPrice);

    return (
        <div className="bg-gray-100 rounded-sm p-4">
            {/* Header */}
            <div className='flex gap-4 mb-4'>
                <ListCheck size={36} />
                <p className='text-2xl font-bold'>{carts.length} Product</p>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left */}
                <div className='col-span-2'>
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
                                            <p className="text-sm">{item.price} x {item.count}</p>
                                        </div>
                                    </div>
                                    {/* Right */}
                                    <div>
                                        <div className="font-semibold">{item.price}</div>
                                    </div>

                                </div>

                            </div>
                        )
                    }
                </div>

                {/* Right */}
                <div className='bg-black p-4 rounded-sm shadow-md flex flex-col justify-center items-center gap-4'>
                    <div className='flex flex-row justify-between gap-10'>
                        <p className='text-2xl font-bold text-white'>Total</p>

                        <Link to={"/shop"}>
                            <button className='bg-white shadow-md hover:duration-100 hover:bg-black hover:text-white text-black w-35 rounded-sm p-1'>Change Order</button>
                        </Link>
                    </div>
                    <div className='flex flex-row justify-between gap-6'>
                        <span className='text-lg flex text-white'>Net Total : {getTotalPrice()}</span>

                        <Link to={""}>
                            <button className='bg-white shadow-md hover:duration-100 hover:scale-101 text-black w-24 rounded-sm p-1'>purchase</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div >
    )
}
export default ListCart