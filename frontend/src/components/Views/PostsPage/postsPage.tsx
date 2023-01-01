import React, { useEffect, useState, useMemo } from "react";
import Login from "../Login/login";
import "./postsPage.css";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import PostCard from "../../PostCard/postCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../services/post";
import CreatePostModal from "../../CreatePostModal/createPostModal";
import { Post } from "../../../models/post";
import { promptError, promptSuccess } from "../../../services/toast";
import { Search } from "react-bootstrap-icons";
import PageLayout from "../PageLayout/pageLayout";

const searchOptions: (keyof Post)[] = ["title", "content", "author"];

const PostsPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editedPost, setEditedPost] = useState<Post>();
  const [search, setSearch] = useState<string>("");
  const [searchField, setSearchField] = useState<keyof Post>("title");
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const closeModal = () => {
    setEditedPost(undefined);
    setShowModal(false);
  };

  const filteredPosts = useMemo(
    () =>
      searchField === "author"
        ? data.filter((post) => post.author.username.includes(search))
        : data?.filter((post) => post[searchField].toString().includes(search)),
    [data, search, searchField]
  );

  return (
    <PageLayout>
      <div className="blog-page">
        <div className="top-row">
          <span className="top-title">Recent Posts</span>
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
          <span>
            <Button
              onClick={() => {
                setEditedPost(undefined);
                setShowModal(true);
              }}
            >
              Create New Post
            </Button>
          </span>
        </div>
        <div className="posts-container">
          {isLoading ? (
            <>Loading Your Data...</>
          ) : !filteredPosts || filteredPosts.length === 0 ? (
            <>No Posts to show</>
          ) : (
            filteredPosts.map((blogPost) => (
              <PostCard
                key={blogPost._id}
                post={blogPost}
                onPostEdit={() => {
                  setEditedPost(blogPost);
                  setShowModal(true);
                }}
                onPostDelete={() => {
                  promptSuccess("Successfully deleted post");
                  refetch();
                }}
              />
            ))
          )}
        </div>
        <CreatePostModal
          show={showModal}
          handleClose={closeModal}
          postCreated={() => {
            promptSuccess("Successfully created post");
            closeModal();
            refetch();
          }}
          postEdited={() => {
            promptSuccess("Successfully edited post");
            closeModal();
            refetch();
          }}
          postCreationFailed={() => {
            promptError("Error occured");
          }}
          existingPost={editedPost}
        />
      </div>
    </PageLayout>
  );
};

export default PostsPage;