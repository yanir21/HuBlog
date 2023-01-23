import React, { useEffect, useState, useMemo } from "react";
import Login from "../Login/login";
import "./photosPage.css";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import PhotoCard from "../../PhotoCard/photoCard";
import { useQuery } from "@tanstack/react-query";
import CreatePhotoModal from "../../CreatePhotoModal/createPhotoModal";
import { Photo } from "../../../models/photo";
import { promptError, promptSuccess } from "../../../services/toast";
import { Search } from "react-bootstrap-icons";
import PageLayout from "../PageLayout/pageLayout";
import { fetchPhoto } from "../../../services/photo";
import { getCurrentUser } from "../../../services/user";

const searchOptions: (keyof Photo)[] = ["caption", "tags", "author"];

const PhotosPage = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editedPhoto, setEditedPhoto] = useState<Photo>();
  const [search, setSearch] = useState<string>("");
  const [searchField, setSearchField] = useState<keyof Photo>("caption");
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["photos"],
    queryFn: fetchPhoto,
  });

  const {
    isLoading: isUserLoading,
    data: user,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const closeModal = () => {
    setEditedPhoto(undefined);
    setShowModal(false);
  };

  const filteredPhotos = useMemo(
    () =>
      searchField === "author"
        ? data.filter((photo) => photo.author?.username.includes(search))
        : data?.filter((photo) =>
            photo?.[searchField]?.toString().includes(search)
          ),
    [data, search, searchField]
  );

  return (
    <PageLayout>
      <div className="blog-page">
        <div className="top-row">
          <span className="top-title">Recent Photos</span>
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
                setEditedPhoto(null);
                setShowModal(true);
              }}
            >
              Create New Photo
            </Button>
          </span>
        </div>
        <div className="photos-container">
          <div className="row">
            {isLoading ? (
              <>Loading Your Data...</>
            ) : !filteredPhotos || filteredPhotos.length === 0 ? (
              <>No Photos to show</>
            ) : (
              filteredPhotos.map((blogPhoto) => (
                <span key={blogPhoto._id} className="col-6">
                  <PhotoCard
                    photo={blogPhoto}
                    onPhotoEdit={() => {
                      setEditedPhoto(blogPhoto);
                      setShowModal(true);
                    }}
                    onPhotoDelete={() => {
                      promptSuccess("Successfully deleted photo");
                      refetch();
                    }}
                    showActions={
                      user?.isAdmin ||
                      user?.username === blogPhoto.author.username
                    }
                  />
                </span>
              ))
            )}
          </div>
        </div>
        <CreatePhotoModal
          show={showModal}
          handleClose={closeModal}
          photoCreated={() => {
            promptSuccess("Successfully created photo");
            closeModal();
            refetch();
          }}
          photoEdited={() => {
            promptSuccess("Successfully edited photo");
            closeModal();
            refetch();
          }}
          photoCreationFailed={() => {
            promptError("Error occured");
          }}
          existingPhoto={editedPhoto}
        />
      </div>
    </PageLayout>
  );
};

export default PhotosPage;
