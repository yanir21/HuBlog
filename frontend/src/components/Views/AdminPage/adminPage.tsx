import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UserCard from "../../UserCard/userCard";
import { getAllUsers, getCurrentUser } from "../../../services/user";
import "./adminPage.css";
import { User } from "../../../models/user";
import { promptError, promptSuccess } from "../../../services/toast";
import CreateUserModal from "../../CreateUserModal/CreateUserModal";

const AdminPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<User>();

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const { data: users, refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const closeModal = () => {
    setEditedUser(undefined);
    setShowModal(false);
  };

  return user?.isAdmin ? (
    <div className="admin-page">
      <div className="top-title">Manage Site</div>
      <div className="section-title">Users</div>
      <div className="users-list">
        { users?.map((user) => (
              <UserCard
                key={user._id}
                user={user}
                onUserEdit={() => {
                  setEditedUser(user);
                  setShowModal(true);
                }}
                onUserDelete={() => {
                  promptSuccess("Successfully deleted user");
                  refetch();
                }}
                showActions={
                  !user?.isAdmin
                }
              />
        )) }
      </div>
      <CreateUserModal
          show={showModal}
          handleClose={closeModal}
          userEdited={() => {
            promptSuccess("Successfully edit post");
            closeModal();
            refetch();
          }}
          userEditFailed={() => {
            promptError("Error occured");
          }}
          existingUser={editedUser}
        />
    </div>
  ) : (
    <div className="unauth">You are unauthorized for this page</div>
  );
};

export default AdminPage;
