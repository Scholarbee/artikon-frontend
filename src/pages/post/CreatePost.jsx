import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
// import { modules } from "../components/moduleToolbar";
// import { BACKEND_URL } from "../redux/actions/userAction";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// const validationSchema = yup.object({
//   title: yup
//     .string("Add a post title")
//     .min(4, "text content should havea minimum of 4 characters ")
//     .required("Post title is required"),
//   content: yup
//     .string("Add text content")
//     .min(10, "text content should havea minimum of 10 characters ")
//     .required("text content is required"),
// });

function CreatePost() {
  const [desc, setDesc] = useState("");

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

      const [formData, setFormData] = useState({
        coverPhoto: null,
      });


      const handleChange = (event) => {
        const { name, value, files } = event.target;

        // If it's a file input (profile photo), store the file directly
        const newValue = name === "coverPhoto" ? files[0] : value;

        setFormData({
          ...formData,
          [name]: newValue,
        });
      };




  

  return (
    <>
      <Box xs={12} sx={{ bgcolor: "white", padding: "10px 20px" }}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          {" "}
          Create post{" "}
        </Typography>
        <Box
          component="form"
          noValidate
          // onSubmit={"handleSubmit"}
          sx={{ mt: 1 }}
        >
          <Stack spacing={3}>
            <TextField
              sx={{ mb: 3 }}
              fullWidth
              id="title"
              label="Post title"
              name="title"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Post title"
              // value={values.title}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // error={touched.title && Boolean(errors.title)}
              // helperText={touched.title && errors.title}
            />
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <Stack>
                <InputLabel id="demo-simple-select-required-label">
                  Business Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  // value={age}
                  placeholder="Business Type"
                  label="Business Type *"
                  onChange={handleChange}
                >
                  <MenuItem value={10}>Goods</MenuItem>
                  <MenuItem value={20}>Services</MenuItem>
                </Select>
              </Stack>
            </FormControl>
            <Stack>
              <label>Job Description</label>
              <textarea
                cols="30"
                rows="10"
                name="desc"
                required
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </Stack>
            <Box>
              <label className="block mb-2">
                Cover Picture
                <input
                  type="file"
                  accept="image/*"
                  name="coverPhoto"
                  onChange={handleChange}
                  className="coverPhoto"
                />
              </label>

              {/* Display Profile Photo */}
              {formData.coverPhoto && (
                <img
                  src={URL.createObjectURL(formData.coverPhoto)}
                  alt="Profile"
                  className="cover-img"
                />
              )}
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              elevation={0}
              sx={{ mt: 3, p: 1, mb: 2, borderRadius: "25px" }}
              // disabled={loading}
            >
              Create post
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default CreatePost;
