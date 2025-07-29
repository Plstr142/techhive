const HistoryCard = () => {
    return (
        <div className="pt-4">
            <h1 className="text-2xl font-bold">Order Archive</h1>

            {/* cover table */}
            <div className="pt-4">
                {/* Card loop order */}
                <div className="bg-gray-100 p-4 rounded-sm shadow-md">
                    {/* header */}
                    <div className="flex justify-between">
                        <div>
                            <p className="text-md">Order date</p>
                            <p className="font-bold">date</p>
                        </div>
                        <div className="text-md">
                            Status
                        </div>
                    </div>

                    {/* table loop product */}
                    <div>
                        <table className="border border-gray-200 w-full">
                            <tr className="bg-gray-200">
                                <th>PRODUCT</th>
                                <th>PRICE</th>
                                <th>QUANTITY</th>
                                <th>TOTAL</th>
                            </tr>
                            <tr>
                                <td>RTX 5090</td>
                                <td>100,990</td>
                                <td>10</td>
                                <td>2000</td>
                            </tr>
                        </table>
                    </div>

                    {/* total */}
                    <div>
                        <div className="text-right">
                            <p>NET TOTAL</p>
                            <p>98000</p>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    )
}
export default HistoryCard