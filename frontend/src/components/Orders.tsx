import { useQueryClient } from "@tanstack/react-query";
import { useQuery, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { getOrders, editOrder } from "../api/orders";
import { Link } from "react-router-dom";

interface Props {
  results: any;
}

const Orders = ({ results }: Props) => {
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const editOrderMutation = useMutation({
    mutationFn: editOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order delivered!");
    },
    onError: () => {
      toast.error("Error!");
    },
  });

  console.log(results);
  if (isError) return toast.error("Error!");
  if (isLoading) return <Loader />;

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              Order ID
            </th>
            <th scope="col" className="px-6 py-3">
              Created at
            </th>
            <th scope="col" className="px-6 py-3">
              Delivered
            </th>
            <th scope="col" className="px-6 py-3">
              User
            </th>
            <th scope="col" className="px-6 py-3">
              Total price
            </th>
            <th scope="col" className="px-6 py-3">
              Products
            </th>
            <th scope="col" className="px-6 py-3">
              Shipping address
            </th>
          </tr>
        </thead>

        {results && results.orders && results.orders.length > 0 ? (
          <>
            {results &&
              results.orders.map((order: any) => (
                <tbody>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          checked={order.is_delivered}
                          onClick={() => editOrderMutation.mutate(order.id)}
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.id}
                    </th>
                    <td className="px-6 py-4">
                      {order.created_at.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4">
                      {order.delivered_at !== null && (
                        <>{order.delivered_at.slice(0, 10)}</>
                      )}
                    </td>
                    <td className="px-6 py-4">{order.user}</td>
                    <td className="px-6 py-4">{order.total_price}</td>
                    <td className="px-6 py-4">
                      <Link to={`/order/${order.id}`}>SEE</Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/order/${order.id}`}>SEE</Link>
                    </td>
                  </tr>
                </tbody>
              ))}
          </>
        ) : (
          <>
            <tbody>
              {data &&
                data.map((order: any) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input
                          checked={order.is_delivered}
                          onClick={() => editOrderMutation.mutate(order.id)}
                          id="checkbox-table-search-1"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="checkbox-table-search-1"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {order.id}
                    </th>
                    <td className="px-6 py-4">
                      {order.created_at.slice(0, 10)}
                    </td>
                    <td className="px-6 py-4">
                      {order.delivered_at !== null && (
                        <>{order.delivered_at.slice(0, 10)}</>
                      )}
                    </td>
                    <td className="px-6 py-4">{order.user}</td>
                    <td className="px-6 py-4">{order.total_price}</td>
                    <td className="px-6 py-4">
                      <Link to={`/order/${order.id}`}>SEE</Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/order/${order.id}`}>SEE</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </>
        )}
      </table>
    </div>
  );
};

export default Orders;
