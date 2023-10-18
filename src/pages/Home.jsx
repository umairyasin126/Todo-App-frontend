import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { server,Context } from "../main";
import toast from "react-hot-toast";
import TodoItem from "../components/TodoItem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState("");
  const [refresh, setReferesh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
      try {
        const {data} = await axios.put(`${server}/task/${id}`, 
        { },
        {
          withCredentials: true,
        });
        setReferesh((prev) => !prev);
        toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
  }

  const deleteHandler = async (id) => {
    try {
      const {data} = await axios.delete(`${server}/task/${id}`, 
      {
        withCredentials: true,
      });
      toast.success(data.message);
      setReferesh((prev) => !prev);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTitle("");
      setDescription("");
      toast.success(data.message);
      setLoading(false);
      setReferesh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((e) => {
        toast.error(e.response.data.message);
      });
  }, [refresh]);
  
  if(!isAuthenticated) return <Navigate to={"/login"} />;

  return (
    <div className="container">
      <div className="login">
        <section>
          <form action="" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {tasks.length > 0 ? (
          tasks.map((i) => (
            <TodoItem 
            title = {i.title} 
            description = {i.description}
            isCompleted = {i.isCompleted}
            updateHandler = {updateHandler}
            deleteHandler = {deleteHandler}
             key = {i._id}
            id= {i._id}
              />
          ))
        ) : (
          <div>No tasks available.</div>
        )}
      </section>
    </div>
  );
};
export default Home;
