import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getAllUsers, getCurrentUser } from "../../../services/user";
import "./adminPage.css";
const AdminPage = () => {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  const { data: users } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
  return user?.isAdmin ? (
    <div className="admin-page">
      <div className="top-title">Manage Site</div>
      <div className="section-title">Users</div>
      <div className="users-list">
        { users?.map((user) => (
          <span className="user-card">
            <span>
              Name:
              {user.username}
            </span>
            <span>Admin? {user.isAdmin}</span>
          </span>
        )) }
      </div>
    </div>
  ) : (
    <div className="unauth">You are unauthorized for this page</div>
  );
};

export default AdminPage;
