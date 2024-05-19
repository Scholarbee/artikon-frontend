import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostInfo } from "../../redux/posts/postActions";
import { BACKEND_URL } from "../../redux/auth/authActions";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import useRedirectLoggedOutUser from "../../services/useRedirectLoggedOutUser";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  Fade,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { selectIsLoggedIn } from "../../redux/auth/authSlice";
import moment from "moment";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Label } from "@mui/icons-material";
import Loader from "../../components/global/Loader";

function PostInfo() {
  useRedirectLoggedOutUser("/login");
  const userInfo = useSelector(selectIsLoggedIn);

  const [open, setOpen] = useState(false);

  const [ref, setRef] = useState("");
  const [title, setTitle] = useState("");
  const [postedBy, setPostedBy] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [quantity, setQuantity] = useState("");

  // const formData = {
  //   phone: contact,
  //   address,
  //   appointmentDate: dateTime,
  //   quantity,
  // };

  const { id } = useParams();

  const displaySinglePost = async () => {
    setLoading(true);
    try {
      const { data } = await getPostInfo(id);
      console.log(data);
      setRef(data.post._id);
      setTitle(data.post.title);
      setContent(data.post.description);
      setBusinessType(data.post.businessType);
      setImage(data.post.coverPhoto.url);
      setPostedBy(data.post.postedBy.name);
      setEmail(data.post.postedBy.email);
      setLocation(data.post.postedBy.city);
      setPhone(data.post.postedBy.phone);
      setCreatedAt(data.post.createdAt);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading) {
      displaySinglePost();
    }
  }, []);

  // Place order
  const handleOrders = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/posts/post/place-order/${id}`,
        {
          phone: contact,
          address,
          appointmentDate: dateTime,
          quantity,
          ownerEmail: email,
          ownerPhone: phone,
          ownerName: postedBy,
        }
      );
      console.log(data);
      if (data.success === true) {
        setIsLoading(false);
        toast.success("Order has been placed successfully");
        setOpen(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error);
    }
    setIsLoading(false);
  };

  /**
   * This function handle Book Appointment
   *
   *
   * @param {*} e - The event object.
   */
  const handleAppointments = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.put(
        `${BACKEND_URL}/api/posts/post/book-appointment/${id}`,
        {
          phone: contact,
          address,
          appointmentDate: dateTime,
          quantity,
          ownerEmail: email,
          ownerPhone: phone,
          ownerName: postedBy,
        }
      );
      if (data.success === true) {
        setIsLoading(false);
        toast.success("Appointment has been booked successfully");
        setOpen(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error);
    }
    setIsLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Card>
              <Box sx={{ width: "100%", height: "auto" }}>
                <img
                  src={image}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    overflow: "clip",
                    display: "block",
                    position: "relative",
                  }}
                />
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ textAlign: "center", margin: "0 0 25px 0" }}
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {title}
                </Typography>
                <Box>
                  <Typography gutterBottom variant="h7" component="div">
                    Brand Owner: {postedBy}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Ref: {ref}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Date Posted:{" "}
                    {moment(createdAt).format("DD MMMM, YYYY - (HH:MM)")}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Phone: {phone}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Address: {location}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Business Type: {businessType}
                  </Typography>
                  <Typography gutterBottom variant="h7" component="div">
                    Category: {""}
                  </Typography>
                  {businessType === "service" ? (
                    <Typography gutterBottom variant="h7" component="div">
                      Service Charge: {"¢12.00"}
                    </Typography>
                  ) : (
                    <Typography gutterBottom variant="h7" component="div">
                      Price: {"¢12.00"}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography
                    sx={{ margin: "20px 0 0px 0" }}
                    variant="h5"
                    // color="text.secondary "
                  >
                    Description
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {content}
                  </Typography>
                </Box>
                <Stack sx={{ margin: "5px 0 0 0" }}>
                  {businessType === "service" ? (
                    <Button
                      href=""
                      variant="contained"
                      onClick={() => setOpen(true)}
                      sx={{ backgroundColor: "teal" }}
                      // onClick={changePassword}
                      // endIcon={<SendIcon />}
                    >
                      Book Appointment
                    </Button>
                  ) : (
                    <Button
                      href=""
                      variant="contained"
                      onClick={() => setOpen(true)}
                      sx={{ backgroundColor: "teal" }}
                      // onClick={changePassword}
                      // endIcon={<SendIcon />}
                    >
                      Place Order
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      <Box>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                sx={{
                  textAlign: "center",
                  borderBottom: "2px solid teal",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "teal",
                }}
                id="transition-modal-title"
                variant="h5"
                component="h2"
              >
                {businessType === "service"
                  ? "BOOK YOUR APPOINMENT HERE"
                  : "PLACE YOUR ORDER"}
              </Typography>
              <Typography
                variant="body2"
                color="red"
                // id="transition-modal-description"
                sx={{ mt: 3 }}
              >
                Please do not make advance payment until you get what you want.
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                onChange={(e) => setContact(e.target.value)}
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                autoFocus
                // onChange={handleInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="address"
                onChange={(e) => setAddress(e.target.value)}
                label={
                  businessType === "service" ? "Address" : "Delivery Address"
                }
                name="address"
                autoComplete="address"
                autoFocus
                // onChange={handleInputChange}
              />
              {businessType === "service" ? (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DatePicker",
                      "TimePicker",
                      "DateTimePicker",
                      "DateRangePicker",
                    ]}
                  >
                    <DemoItem label={"Pick appointment Date & Time"}>
                      <DateTimePicker onChange={(e) => setDateTime(e)} />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              ) : (
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="quantity"
                  onChange={(e) => setQuantity(e.target.value)}
                  label={"Quantities"}
                  name="quantity"
                  autoComplete="quantity"
                  autoFocus
                  // onChange={handleInputChange}
                />
              )}
              <Stack sx={{ margin: "20px 0 0 0" }}>
                {businessType === "service" ? (
                  <Button
                    href=""
                    variant="contained"
                    onClick={handleAppointments}
                    sx={{ backgroundColor: "teal" }}
                    // onClick={changePassword}
                    // endIcon={<SendIcon />}
                  >
                    {isLoading ? "Process..." : "Book Appointment"}
                  </Button>
                ) : (
                  <Button
                    href=""
                    variant="contained"
                    onClick={handleOrders}
                    sx={{ backgroundColor: "teal" }}
                    // onClick={changePassword}
                    // endIcon={<SendIcon />}
                  >
                    {isLoading ? "Process..." : "Place Order"}
                  </Button>
                )}
              </Stack>
            </Box>
          </Fade>
        </Modal>
      </Box>
    </>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default PostInfo;
