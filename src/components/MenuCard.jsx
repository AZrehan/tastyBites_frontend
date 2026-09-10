import { Link } from "react-router-dom";


function MenuCard({ item }) {

    return (
        <div className="bg-white rounded-lg shadow p-4">

            {item.image && (
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded"
                />
            )}


            <h2 className="text-xl font-bold mt-4">
                {item.name}
            </h2>


            <p className="text-gray-600 mt-2">
                {item.description}
            </p>


            <p className="text-orange-600 font-bold mt-3">
                ₹{item.price}
            </p>


            <p className="text-sm mt-2">
                {item.availability
                    ? "In Stock"
                    : "Out of Stock"}
            </p>


            <Link
                to={`/menu/${item._id}`}
                className="inline-block mt-4 bg-orange-500 text-white px-4 py-2 rounded"
            >
                View
            </Link>

        </div>
    );
}


export default MenuCard;