import React, { useState } from "react";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import styled from "styled-components";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAuth } from "../../context/AuthContextProvider";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useFolder } from "../../hooks/useFolder";
import { database } from "../../firebase";
import { Button, Menu, MenuItem, Modal, Paper, TextField } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const CenteredModal = styled(Modal)`
  display: grid;
  place-items: center;
`;

const StyledFile = styled.div`
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
  .more-options-menu {
    // Add the background color for the More options menu
    background-color: #19348b;
  }
`;

const StyledLink = styled.a`
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

const File = ({ file }) => {
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
    database.files.doc(file.id).delete();
    handleMenuClose();
  };

  const handleRenameClick = () => {
    setNewName(file.name);
    handleMenuClose();
    setRenameModalOpen(true);
  };

  const handleMoveClick = () => {
    handleMenuClose();
    setMoveModalOpen(true);
  };

  const handleRenameConfirm = () => {
    if (newName.trim() === "") {
      return;
    }

    database.files.doc(file.id).update({
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
    database.files.doc(file.id).update({
      folderId: destinationFolderId,
    });

    setMoveModalOpen(false);
    handleMenuClose();
  };

  return (
    <>
      <StyledFile>
        <StyledLink href={file.url} target="_blank">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <InsertDriveFileIcon />
            {file.name.length > 13
              ? file.name.substring(0, 13 - 3) + "..."
              : file.name}
          </div>
        </StyledLink>

        {currentUser && currentUser.uid === file.userId && (
          <div>
            <MoreHorizIcon onClick={handleMenuClick} />
            <ActionsMenu
            className="more-options-menu"
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
      </StyledFile>

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
          <h1>Rename File</h1>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter new name for file"
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
              Rename File
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
              .filter((destinationFolder) => destinationFolder.id !== file.folderId)
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
            <Button onClick={handleClose} color="primary" variant="contained">
              Cancel
            </Button>
          </footer>
        </Paper>
      </CenteredModal>
    </>
  );
};

export default File;
