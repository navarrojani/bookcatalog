"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { BookResources } from "../resources/BookResources";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

type Props = {
  idBook: number;
  open: any;
  onClose: any;
};

export default function ModalDelete({ idBook, open, onClose }: Props) {
   
  const deleteBook = async () => {
    try {
      const response = await BookResources.deleteBook("/book/"+`${idBook}`);

      if(response.message === 'Deleted'){
        
        onClose();
        location.reload()
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Box mb={2}>
            <h2 id="parent-modal-title">Delete Book</h2>
          </Box>
          <p id="parent-modal-description">
            Are you sure you want to delete the record?
          </p>
          <Box ml={15}>
            <Button variant="outlined" size="medium" style={{marginRight:'8px'}} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" size="medium" onClick={deleteBook}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
