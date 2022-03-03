import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

const Request = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        return () => {};
    }, []);

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">First Name</th>
                                        <th scope="col">Last Name</th>
                                        <th scope="col">Email Address</th>
                                        <th scope="col">Mobile Number</th>
                                        <th scope="col">DOB</th>
                                        <th scope="col">Aadhar Id</th>
                                        <th scope="col">Rooms</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {hotels.map((item, index) => (
                                        <tr
                                            key={item.id}
                                            className="text-capitalize text-nowrap"
                                        >
                                            <th scope="row">{item.id}</th>
                                            <td>{item.hotel_initial}</td>
                                            <td>{item.hotel_type}</td>
                                            <td>{item.hotel_name}</td>
                                            <td>{item.hotel_district}</td>
                                            <td>{item.hotel_state}</td>
                                            <td>{item.hotel_place}</td>
                                            <td>{item.rooms.length}</td>
                                            <td>
                                                <div className="btn-group">
                                                    {computedComponent(
                                                        item,
                                                        index
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))} */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Request;
