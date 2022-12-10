import { Me, CheckMe, editUser, uploadAvater } from "../api/blogAPIs";
import { useMutation } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import CircularIndeterminate from "../../components/CircularIndeterminate";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function Profile() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null);
  const [bio, setBio] = useState(null);
  const [file, setFile] = useState("");

  const CheckMe = useMutation({
    mutationFn: Me,
    onSuccess: (res) => {
      // console.log(res.data);
      setName(res.data.name);
      setBio(res.data.bio);
      setFile(res.data.avatar);
      setLoading(false);
    },
    onError: (res) => {
      router.push("/login");
    },
  });
  const edit = useMutation({
    mutationFn: editUser,
    onSuccess: (res) => {
      console.log(res);
      router.push("/dashboard");
    },
    onError: (res) => {
      console.log(res);
    },
  });

  useEffect(() => {
    if (token) return CheckMe.mutate();
    else router.push("/login");
  }, []);

  const editUserHandler = () => {
    // console.log('hey')
    if (name.trim().length === 0 || bio.trim().length === 0)
      return alert("please fill all the blank");
    const data = { name: name, bio: bio };
    edit.mutate(data);
  };

  const imageChangeHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadAvatar = useMutation({
    mutationFn: uploadAvater,
    onSuccess: (res) => {
      console.log(res);
      router.push("/dashboard");
    },
    onError: (res) => {
      console.log(res);
    },
  });

  const imageUploadHandler = async () => {
    if (!file) return console.log("heyyyyyy");
    console.log(file);

    const formData = new FormData();
    formData.append("avatar", file);
    console.log(formData.getAll);
    uploadAvatar.mutate(formData);
  };

  if (loading) return <CircularIndeterminate />;
  return (
    <Box
      sx={{
        marginTop: "8em",
        width: 400,
        height: 350,
        boxShadow: 3,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        gap: 5,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <Button
          sx={{
            position: "absolute",
            margin: "auto",
            top: -90,
            left: "calc(50% - 75px)",
            "&.MuiButtonBase-root:hover": {
              bgcolor: "transparent",
            },
          }}
          varient="contained"
          component="label"
        >
          <Avatar
            alt="user-profile"
            src={file ? "http://localhost:4000/" + file : "/images/unknown.png"}
            sx={{
              width: 150,
              height: 150,
              boxShadow: 5,
            }}
          />
          <input type="file" onChange={imageChangeHandler} hidden />
        </Button>
      </Box>

      <Box sx={{}}>
        <TextField
          placeholder={name ? "" : "name"}
          sx={{ width: 400, padding: 1, marginBottom: 3 }}
          id="standard-basic"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          placeholder={bio ? "" : "Bio"}
          sx={{ width: 400, padding: 1 }}
          id="standard-basic"
          variant="standard"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <Button
          sx={{ position: "absolute", left: 0, bottom: -45 }}
          variant="contained"
          color="primary"
          onClick={editUserHandler}
        >
          submit
        </Button>
        <Button
          sx={{ position: "absolute", left: 0, bottom: -45, marginLeft: 25 }}
          variant="contained"
          color="primary"
          onClick={imageUploadHandler}
        >
          upload image
        </Button>
      </Box>
    </Box>
  );
}

export default Profile;
