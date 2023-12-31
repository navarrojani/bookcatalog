/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";

import styles from "../page.module.css";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import NavAppBar from "../components/NavAppBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useRouter, useSearchParams } from "next/navigation";
import { BookResources } from "../resources/BookResources";
import { AuthorResources } from "../resources/AuthorResources";
import { Button } from "@mui/material";


export default function ShowBook() {
  const [expanded, setExpanded] = React.useState(false);
  const router = useRouter();
  const paramValue = useSearchParams();
  const idBook = paramValue.get('id');

  console.log('idBook', idBook);

  const [book, setBook] = React.useState({
      name:'',
      description:'',
      imagen:'',
      idAuthor:'',
      
  });

  const [author, setAuthor] = React.useState({
      firstname:'',
      lastname:'',
      photo:'',
  });
 

  const getBookById = async () => {
    try {
      const response = await BookResources.getByIdBook("/book/"+`${idBook}`);

      console.log("Response", response);
      setBook({
        ...book,
        name:response.data.name,
        description:response.data.description,
        imagen:response.data.imagen,
        idAuthor:response.data.author_id,

      });
     
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthorById = async () => {
    
        try {

          const response = await AuthorResources.getByIdAuthor(`/author/${book.idAuthor}`);
          console.log("Resp", response);
          setAuthor({
            ...author,
            firstname: response.data.firstname,
            lastname: response.data.lastname,
            photo: response.data.photo,
    
          });
          
        } catch (error) {

          console.log(error);
          
        }

  };

  React.useEffect(() => {
    getBookById();
    getAuthorById();

  }, []);

  return (
    <main className={styles.main}>
      <NavAppBar />
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Box  mt={5}>
          <Box mb={2}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <div>
                    <h2 id="parent-modal-title">Details Book</h2>
                </div>
                <div>
                    <Button onClick={() => {
                        router.back()                
                    }} style={{minWidth:'4px'}}>
                    <ArrowBackIcon
                        fontSize="small"
                        style={{ color: "#5dade2" }}
                    />
                    </Button>
                </div>
            </div>
          </Box>
          <Card sx={{ width: 600, height: 600 }}>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe"  src={author.photo}/>
              }
              title={book.name}
              subheader={
                <div>
                  <p style={{fontSize: 12, fontWeight: "bold"}}>Autor: {`${author.firstname} ${author.lastname}`}</p>
                  <p  style={{fontSize: 12}}>Publicación: September 14, 2016</p>
                </div>
              }
            />
            <CardMedia
              component="img"
              height="400"
              image={book.imagen}
              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {book.description}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </main>
  );
}
