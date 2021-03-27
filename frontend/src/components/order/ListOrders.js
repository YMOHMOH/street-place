import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader";

import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearErrors } from "../../actions/orderActions";

function ListOrders() {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Id",
          field: "Id",
          sort: "asc",
        },
        {
          label: "Nombre d'articles",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Montant",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Statut",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    orders.forEach((order) => {
      data.rows.push({
        Id: order._id,
        numOfItems: order.orderItems.length,
        amount: `${order.totalPrice} €`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <i className="fa fa-eye"></i>
          </Link>
        ),
      });
    });
    return data;
  };

  return (
    <Fragment>
      <MetaData title={"Mes Commandes"} />
      <h1 className="my-5">Mes Commandes</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
          responsive
        />
        // <table class="table table-bordered" id="myTable">
        //   <thead>
        //     <tr>
        //       <td>Id</td>
        //       <td>Nombre d'articles</td>
        //       <td>Montant</td>
        //       <td>Statut</td>
        //       <td>Actions</td>
        //     </tr>
        //   </thead>
        //   <tbody>
        //     {orders.map((order) => {
        //       return (
        //         <>
        //           <tr>
        //             <td>{order._id}</td>
        //             <td>{order.orderItems.length}</td>
        //             <td>{`${order.totalPrice} €`}</td>
        //             <td>
        //               {order.orderStatus &&
        //               String(order.orderStatus).includes("Delivered") ? (
        //                 <p style={{ color: "green" }}>{order.orderStatus}</p>
        //               ) : (
        //                 <p style={{ color: "red" }}>{order.orderStatus}</p>
        //               )}
        //             </td>
        //             <td>
        //               {
        //                 <Link
        //                   to={`/order/${order._id}`}
        //                   className="btn btn-primary"
        //                 >
        //                   <i className="fa fa-eye"></i>
        //                 </Link>
        //               }
        //             </td>
        //           </tr>
        //         </>
        //       );
        //     })}
        //   </tbody>
        // </table>
      )}
    </Fragment>
  );
}

export default ListOrders;

//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json
