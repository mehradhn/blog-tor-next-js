import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Me, MyBlogs, deleteBlog } from "../../api/blogAPIs";
import Cookies from "universal-cookie";
import CircularIndeterminate from "../../../components/CircularIndeterminate";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Avatar from "@mui/material/Avatar";

function Posts() {


  const [isblogs, setIsBogs] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const cookies = new Cookies();
  const token = cookies.get("token");
  const CheckMe = useMutation({
    mutationFn: Me,
    onSuccess: (res) => {
      setLoading(false);
    },
    onError: (res) => {
      console.log(res);
      router.push("/login");
    },
  });

  const fallbackImage = "/images/home-page2.jpg"

  const DeleteBlog = useMutation({
    mutationFn: deleteBlog,
    onSuccess: (res) => {
      console.log(res);
      refetch();
    },
  });

  useEffect(() => {
    if (token) {
      CheckMe.mutate();
    } else router.push("/login");
  }, []);
  const { isLoading, isError, data, refetch } = useQuery({
    queryKey: ["getBlogs"],
    queryFn: MyBlogs,
  });



  if (loading) return <CircularIndeterminate />;
  if(isError) return console.log('hey')
  if (isLoading) return <CircularIndeterminate />;
  
  // console.log(data.data[0].imgurl);
  const deleteHandler = (_id) => {
    const id = { blogId: _id };
    DeleteBlog.mutate(id);
  };
  const editHandler = (_id) => router.push(`/dashboard/post/${_id}`);
  return (
    <>
      {data.data &&
        data.data.map(({ title, _id, imgurl }, index) => (
          <Box key={_id}>
            <Box
              sx={{
                marginTop: "4em",
                width: "25em",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Avatar
                alt="image-blog"
                src={imgurl}
              >
                <Avatar alt="default" src="/images/default-blog.png"  />
              </Avatar>
              <Typography>{title}</Typography>
              <Box>
                <EditIcon onClick={() => editHandler(_id)} />
                <DeleteIcon onClick={() => deleteHandler(_id)} />
              </Box>
            </Box>
            <Divider />
          </Box>
        ))}
      {data.data.length === 0 && (
        <Box sx={{ marginTop: "4em" }}>
          <Typography>There is No post</Typography>
        </Box>
      )}
    </>
  );
}

export default Posts;
