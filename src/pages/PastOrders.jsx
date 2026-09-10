import Navbar from "../components/Navbar";

function PastOrders() {

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />

            <div className="max-w-6xl mx-auto px-6 py-10">

                <h1 className="text-3xl font-bold text-center mb-8">
                    Past Orders
                </h1>

                <div className="bg-white shadow rounded p-6 text-center">

                    <p className="text-gray-600">
                        You have no past orders yet.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default PastOrders;