import { useEffect, useState } from "react";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../redux/services/userApi";
import {
  AddUser,
  Error,
  FlashMessage,
  Loader,
  UpdateUser,
} from "../components";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoAddCircleOutline } from "react-icons/io5";

const Users = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updatedItem, setUpdatedItem] = useState();
  const { data, isFetching, isError } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { token, userInfo } = useSelector((state) => state.user);
  const [backMsg, setBackMsg] = useState("");
  const [type, setType] = useState("");

  const handleDelete = (id) => {
    deleteUser(id)
      .unwrap()
      .then((response) => {
        setBackMsg(response.message);
        setType("success");
      })
      .catch((err) => {
        setBackMsg("Server Error");
        setType("error");
      });
  };
  if (!token) return <Navigate to={"/login"} />;
  if (userInfo?.role == "User") return <Navigate to={"/"} />;
  if (isFetching) return <Loader />;
  if (isError) return <Error />;

  const rows = data?.users;
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "login", headerName: "LOGIN", flex: 1 },
    { field: "role", headerName: "ROLE", flex: 1 },
    {
      field: "services",
      headerName: "SERVICES",
      valueGetter: ({ row }) => row.services.join(", "),
      flex: 1,
    },
    { field: "createdAt", headerName: "CREATED", flex: 1 },
    { field: "updatedAt", headerName: "UPDATED", flex: 1 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (obj) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit size={20} color="blue" />}
            onClick={() => {
              setShowUpdate(true);
              setUpdatedItem(obj.row);
            }}
            label="Edit"
            className="textPrimary"
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete size={20} color="red" />}
            onClick={() => handleDelete(obj.row._id)}
            label="Delete"
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      {backMsg && (
        <FlashMessage
          message={backMsg}
          setBackMsg={setBackMsg}
          type={type}
          setType={setType}
        />
      )}
      <div className="bg-white py-4 px-5 mb-4 rounded shadow-lg flex items-center justify-end">
        <button
          onClick={() => {
            setShowAdd(true);
          }}
          className="flex items-center gap-2"
        >
          <IoAddCircleOutline size={20} /> Add New User
        </button>
      </div>
      <div className="shadow-lg">
        <DataGrid
          autoHeight
          sx={{
            backgroundColor: "white",
          }}
          getRowId={(row) => row._id}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 8,
              },
            },
          }}
        />
      </div>
      {showUpdate && (
        <UpdateUser
          setBackMsg={setBackMsg}
          setShowUpdate={setShowUpdate}
          login={updatedItem?.login}
          id={updatedItem?._id}
          setType={setType}
        />
      )}
      {showAdd && (
        <AddUser
          setType={setType}
          setBackMsg={setBackMsg}
          setShowAdd={setShowAdd}
        />
      )}
    </div>
  );
};

export default Users;
