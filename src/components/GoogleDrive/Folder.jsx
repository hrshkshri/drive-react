import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAuth } from "../../context/AuthContextProvider";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useFolder } from "../../hooks/useFolder";
import { database } from "../../firebase";
import { ROOT_FOLDER } from "../../hooks/useFolder";
import { Button, Menu, MenuItem, Modal, Paper, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const CenteredModal = styled(Modal)`
  display: grid;
  place-items: center;
`;

const StyledFolder = styled.div`
  border: 2px solid #19348b;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  gap: 12px;
  margin: 15px;
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #19348b;
  font-size: 20px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const ActionsMenu = styled(Menu)`
  .MuiList-root {
    padding: 8px 0;
  }
  .MuiPaper-root {
    background-color: #D9E2FE;
  }
`;

const ActionMenuItem = styled(MenuItem)`
  display: flex;
  align-items: center;

  svg {
    margin-right: 8px;
  }
`;

const Folder = ({ folder }) => {
  const { currentUser } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [newName, setNewName] = useState("");
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const { allFolders } = useFolder();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = () => {
    if (folder === ROOT_FOLDER) {
      return;
    }

    database.folders
      .doc(folder.id)
      .delete()
      .then(() => {
        console.log("Folder deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    handleMenuClose();
  };

  const handleRenameClick = () => {
    if (folder === ROOT_FOLDER) {
      return;
    }

    setNewName(folder.name);
    setRenameModalOpen(true);
    handleMenuClose();
  };

  const handleMoveClick = () => {
    if (folder === ROOT_FOLDER) {
      return;
    }

    setMoveModalOpen(true);
    handleMenuClose();
  };

  const handleRenameConfirm = () => {
    if (newName.trim() === "") {
      return;
    }

    database.folders.doc(folder.id).update({
      name: newName,
    });

    setRenameModalOpen(false);
    handleMenuClose();
  };

  const handleClose = () => {
    setRenameModalOpen(false);
    setMoveModalOpen(false);
  };

  const handleMoveConfirm = (destinationFolderId) => {
    if (folder === ROOT_FOLDER) {
      return;
    }

    const path = [...folder.path];

    if (folder !== ROOT_FOLDER) {
      path.push({ name: folder.name, id: folder.id });
    }

    database.folders.doc(folder.id).update({
      parentId: destinationFolderId,
      path,
    });

    setMoveModalOpen(false);
    handleMenuClose();
  };

  return (
    <>
      <StyledFolder>
        <StyledLink
          to={{
            pathname: `/folder/${folder.id}`,
            state: { folder: folder },
          }}
        >
          <FolderIcon />
          {folder.name.length > 13
            ? folder.name.substring(0, 13 - 3) + "..."
            : folder.name}
        </StyledLink>

        {currentUser && currentUser.uid === folder.userId && (
          <div>
            <MoreHorizIcon onClick={handleMenuClick} />
            <ActionsMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <ActionMenuItem onClick={handleDeleteClick}>
                <DeleteIcon /> Delete
              </ActionMenuItem>
              <ActionMenuItem onClick={handleRenameClick}>
                <EditIcon /> Rename
              </ActionMenuItem>
              <ActionMenuItem onClick={handleMoveClick}>
                <ArrowForwardIcon /> Move
              </ActionMenuItem>
            </ActionsMenu>
          </div>
        )}
      </StyledFolder>

      <CenteredModal
        open={renameModalOpen}
        onClose={handleClose}
        aria-labelledby="rename-modal-title"
        aria-describedby="rename-modal-description"
      >
        <Paper
          style={{
            padding: "15px",
            borderRadius: "10px",
            width: "400px",
          }}
        >
          <h1>Rename Folder</h1>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter new name for folder"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ marginBottom: "20px" }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
            }}
          >
            <Button
              onClick={handleRenameConfirm}
              color="primary"
              variant="contained"
            >
              Rename Folder
            </Button>
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
          </div>
        </Paper>
      </CenteredModal>

      <CenteredModal
        open={moveModalOpen}
        onClose={handleClose}
        aria-labelledby="move-modal-title"
        aria-describedby="move-modal-description"
      >
        <Paper
          style={{
            padding: "15px",
            borderRadius: "7px",
            width: "400px",
            paddingBottom: "20px",
          }}
        >
          <h1>Move Folder</h1>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              margin: "15px",
              marginBottom: "30px",
            }}
          >
            {/* Render a list of available folders */}
            {allFolders
              .filter((destinationFolder) => destinationFolder.id !== folder.id)
              .map((destinationFolder) => (
                <div key={destinationFolder.id}>
                  <Button
                    onClick={() => handleMoveConfirm(destinationFolder.id)}
                    color="primary"
                    variant="outlined"
                    style={{ marginBottom: "10px" }}
                  >
                    {destinationFolder.name}
                  </Button>
                </div>
              ))}
          </div>
          <footer
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            {/* Add a Cancel button */}
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
          </footer>
        </Paper>
      </CenteredModal>
    </>
  );
};

export default Folder;
