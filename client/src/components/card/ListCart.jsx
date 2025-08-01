import { List, ListCheck, Trash2 } from 'lucide-react';
import usetechhiveStore from '../../store/techhive-store';
import { Link, useNavigate } from 'react-router-dom';
import { createUserCart } from '../../api/user';
import { toast } from "react-toastify"
import { numberFormat } from "../../utils/Number";

const ListCart = () => {
    const cart = usetechhiveStore((state) => state.carts);
    const user = usetechhiveStore((state) => state.user);
    const token = usetechhiveStore((state) => state.token);
    const getTotalPrice = usetechhiveStore((state) => state.getTotalPrice);

    const navigate = useNavigate()

    const handleSaveCart = async () => {
        await createUserCart(token, { cart })
            .then((res) => {
                console.log(res)
                toast.success("Add to cart successfully!", {
                    position: "top-center",
                });
                navigate("/checkout")
            })
            .catch((error) => {
                console.log("error", error)
                toast.warning(error.response.data.message)
            })
    }

    return (
        <div className="bg-gray-100 rounded-sm p-4">
            {/* Header */}
            <div className='flex gap-4 mb-4'>
                <ListCheck size={36} />
                <p className='text-2xl font-bold'>{cart.length} Product</p>
            </div>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Left */}
                <div className='col-span-2'>
                    {
                        cart.map((item, index) =>
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
                                            <p className="text-sm">{numberFormat(item.price)} x {item.count}</p>
                                        </div>
                                    </div>
                                    {/* Right */}
                                    <div>
                                        <div className="font-semibold">
                                            {numberFormat(item.price * item.count)}
                                        </div>
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
                    </div>
                    <div className='flex flex-row justify-between gap-6 items-center'>
                        <span className='text-xl flex text-white font-bold'>Net Total : {numberFormat(getTotalPrice())}</span>

                        <div className='flex gap-2 text-white bg-transparent w-52 h-10 items-center justify-center rounded-sm'>
                            {
                                user ? <Link to={""}>
                                    <button
                                        disabled={cart.length < 1}
                                        onClick={handleSaveCart}
                                        className='bg-white text-black hover:text-white hover:bg-gray-600 shadow-md hover:duration-100 hover:scale-102 w-24 rounded-sm p-1'>purchase</button>
                                </Link> : (<Link to={"/login"}>
                                    <button className='bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700 shadow-md hover:duration-100 hover:scale-101 w-24 rounded-sm p-1'>Login</button>
                                </Link>
                                )}
                            <Link to={"/shop"}>

                                <button
                                    className="bg-white text-black hover:text-white hover:bg-black shadow-md hover:duration-100 hover:scale-102 w-24 rounded-sm p-1"
                                >
                                    change
                                </button>

                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default ListCart