import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import FolderIcon from "@material-ui/icons/Folder";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useAuth } from "../../context/AuthContextProvider";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";


const StyledFolder = styled.div`
  border: 2px solid #19348b;
  padding: 7px 15px;
  border-radius: 7px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
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

const Folder = ({ folder, onDelete, onRename }) => {
  const { currentUser } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = (e) => {
    e.stopPropagation();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDeleteClick = () => {
    // Handle delete logic here
    onDelete(folder.id, "folder");
    setIsDropdownOpen(false);
  };

  const handleRenameClick = () => {
    // Handle rename logic here
    const newName = prompt("Enter new name:", folder.name);
    if (newName) {
      onRename(folder.id, "folder", newName);
    }
    setIsDropdownOpen(false);
  };

  return (
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
          <MoreHorizIcon onClick={handleDropdownToggle} />
          {isDropdownOpen && (
            <div>
              <DeleteIcon onClick={handleDeleteClick} />
              <EditIcon onClick={handleRenameClick} />
            </div>
          )}
        </div>
      )}
    </StyledFolder>
  );
};

export default Folder;
