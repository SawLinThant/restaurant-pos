import { useParams } from "react-router-dom";


const OrderDetail = () => {
    const {orderId} = useParams();
    console.log(orderId)
    // useEffect(() => {
    //     const fetchData = async() => {
    //     const responses = await axios.get(`${baseUrl}/Product/get`, {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //           },
    //           params: {
    //            id: orderId
    //           },
    //     })
    //     if (responses.status === 200) {
    //         console.log(responses.data);
    //         setOrderDetail({
    //             name: responses.data?.data.name,
    //             price: responses.data?.data.price,
    //             category: responses.data?.data.category,
    //             description: responses.data?.data.description
    //         });
    //       }
    //     }
    //     fetchData();
    // },[orderId])
    return(
        <div className="flex flex-col gap-4">
           order detail
        </div>
    )
}
export default OrderDetail;