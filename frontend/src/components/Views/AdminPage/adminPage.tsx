import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import UserCard from "../../UserCard/userCard";
import { getAllUsers, getCurrentUser } from "../../../services/user";
import "./adminPage.css";
import { User } from "../../../models/user";
import { promptError, promptSuccess } from "../../../services/toast";
import CreateUserModal from "../../CreateUserModal/CreateUserModal";
import PostsGraph from "../../PostsGraph/postsGraph";
import { Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Line } from 'react-chartjs-2';

const searchOptions: (keyof User)[] = ["username", "email"];

const AdminPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editedUser, setEditedUser] = useState<User>();
  const [search, setSearch] = useState<string>("");
  const [searchField, setSearchField] = useState<keyof User>("username");

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

  const filteredUsers = useMemo(
    () =>
      users?.filter((post) => post[searchField].toString().includes(search)),
    [users, search, searchField]
  );

  return user?.isAdmin ? (
    <div className="admin-page">
      <div className="top-title">Manage Site</div>
      <div className="top-row">
        <div className="section-title">Users</div>
        <span className="search-box">
          <InputGroup className="input-group">
            <InputGroup.Text>
              <Search />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder={`Search by ${searchField}`}
              value={search}
              onChange={({ target }) => setSearch(target.value)}
            />
          </InputGroup>
          <div className="search-options-container">
            Search by:
            <div className="search-options">
              {searchOptions.map((option) => (
                <Form.Check
                  key={option}
                  type="radio"
                  value={option}
                  label={option}
                  checked={searchField === option}
                  onChange={setSearchField.bind(this, option)}
                />
              ))}
            </div>
          </div>
        </span>
      </div>
      <div className="users-list">
        {filteredUsers?.map((user) => (
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
            showActions={!user?.isAdmin}
          />
        ))}
      </div>
      <div className="mid-row">
        <div className="section-title">Post By Day</div>
          <div className="posts-graph"><PostsGraph/></div>
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
