import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { createPost } from "../../redux/posts/postActions";
import { useState } from "react";

function CreatePost() {
  const [coverPhoto, setCoverPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState({
    title: "",
    businessType: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const { title, description, businessType } = data;

    if (!title || !description || !businessType || !coverPhoto) {
      toast.info("All fields are required");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("businessType", businessType);
    formData.append("description", description);
    formData.append("my_file", coverPhoto);

    setIsLoading(true)
    try {
      await createPost(formData);
      toast.success("Ad created successfully");
      setIsLoading(false);
    } catch (error) {
      toast.error(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Box xs={12} sx={{ bgcolor: "white", padding: "10px 20px" }}>
        <Typography variant="h5" sx={{ pb: 4 }}>
          {" "}
          Create post{" "}
        </Typography>
        <Box component="form" noValidate onSubmit={submit} sx={{ mt: 1 }}>
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
              value={data.title}
              onChange={handleChange}
            />
            <FormControl required sx={{ m: 1, minWidth: 120 }}>
              <Stack>
                <InputLabel id="demo-simple-select-required-label">
                  Business Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-required-label"
                  id="demo-simple-select-required"
                  value={data.businessType}
                  placeholder="Business Type"
                  label="Business Type *"
                  name="businessType"
                  onChange={handleChange}
                >
                  <MenuItem value={"good"}>Goods</MenuItem>
                  <MenuItem value={"service"}>Services</MenuItem>
                </Select>
              </Stack>
            </FormControl>
            <Stack>
              <label>Job Description</label>
              <textarea
                cols="30"
                rows="10"
                name="description"
                required
                value={data.description}
                onChange={handleChange}
              ></textarea>
            </Stack>
            <Box>
              <label className="block mb-2">
                Cover Picture
                <input
                  type="file"
                  accept="image/*"
                  name="coverPhoto"
                  onChange={(e) => setCoverPhoto(e.target.files[0])}
                  className="coverPhoto"
                />
              </label>

              {/* Display Profile Photo */}
              {coverPhoto && (
                <img
                  src={URL.createObjectURL(coverPhoto)}
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
              disabled={isLoading}
            >
              {isLoading ? "Processing... Please wait" : "Create post"}
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default CreatePost;
