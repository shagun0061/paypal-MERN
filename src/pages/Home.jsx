import axios from "axios";
import "./Home.css";
import React, { useState, useEffect } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

export const Home = () => {
  const [sprint, setSprint] = useState("");
  const [taskvl, setTaskval] = useState("");
  const [status, setStaus] = useState("");
  const [category, setCategory] = useState("");
  const [user, setUser] = useState("");

  const [show, setShow] = useState(false);

  const [data, setData] = useState("");
  const [task, setTask] = useState("");

  const [open, setOpen] = useState(false);
  console.log(data, task);
  function onOpenModal() {
    setOpen(true);
  }

  function onCloseModal() {
    setOpen(false);
  }

  let impPayload = {
    title: taskvl,
    category: category,
    complete: status,
    user: user,
  };

  function openModule2(id) {
    console.log(id);
    setUser(id);
    setShow(true);
  }
  function lastFunc() {
    console.log(impPayload, "sdfjjkds");
    axios
      .post("https://katydid-top-hat.cyclic.app/taskadd", impPayload, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setShow(false);
        getdata();
      });
  }
  function getdata() {
    axios.get("https://katydid-top-hat.cyclic.app/sprint").then((res) => {
      setData(res.data);
    });
    axios.get("https://katydid-top-hat.cyclic.app/task").then((res) => {
      setTask(res.data);
    });
  }
  let token = localStorage.getItem("Token");
  function handelSprintCreate() {
    axios
      .post(
        "https://katydid-top-hat.cyclic.app/sprintadd",
        {
          sprintname: sprint,
        },
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((res) => {
        alert(res.data);
        getdata();
      });
    setOpen(false);
  }
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="home">
      <p className="heading_task_manager">Task Manager</p>

      <div>
        <button
          onClick={onOpenModal}
          style={{ backgroundColor: "lightgreen", borderRadius: "10px" }}
        >
          Add Sprint ➕
        </button>
        <Modal
          classNames={{
            overlayAnimationIn: "customEnterOverlayAnimation",
            overlayAnimationOut: "customLeaveOverlayAnimation",
            modalAnimationIn: "customEnterModalAnimation",
            modalAnimationOut: "customLeaveModalAnimation",
          }}
          animationDuration={500}
          open={open}
          onClose={onCloseModal}
          center
        >
          <input
            style={{ textAlign: "center", marginTop: "20px" }}
            placeholder="Sprint Name"
            onChange={(e) => {
              setSprint(e.target.value);
            }}
          />
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => {
                handelSprintCreate();
              }}
              style={{ backgroundColor: "lightgreen", borderRadius: "10px" }}
            >
              Create
            </button>
          </div>
        </Modal>
      </div>
      {show && (
        <div
          style={{
            width: "300px",
            backgroundColor: "teal",
            borderRadius: "20px",
            position: "absolute",
            alignItems: "center",
            top: "300px",
            left: "600px",
            padding: "30px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "0px",
              right: "0px",
              padding: "30px",
            }}
          >
            <button
              onClick={() => {
                setShow(false);
              }}
            >
              X
            </button>
          </div>
          <input
            onChange={(e) => {
              setTaskval(e.target.value);
            }}
            placeholder="title"
          />
          <br></br>
          <select
            name="staus"
            id="staus"
            onChange={(e) => {
              setStaus(e.target.value);
            }}
          >
            <option>staus</option>
            <option value="false">Pending</option>
            <option value="true">Done</option>
          </select>

          <br></br>
          <select
            name="category"
            id="category"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option>category</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
            <option value="story.">story.</option>
          </select>
          <br></br>
          <div>
            <button
              style={{ marginLeft: "80px" }}
              onClick={() => {
                lastFunc();
              }}
            >
              Task Add
            </button>{" "}
          </div>
        </div>
      )}
      <div
        style={{
          padding: "20px",
        }}
      >
        {data &&
          data.map((ele) => {
            return (
              <fieldset
                style={{
                  borderRadius: "10px",
                  backgroundColor: "lightblue",
                  marginTop: "55px",
                  color: "white",
                }}
              >
                <legend>
                  <h3
                    style={{ color: "red", fontSize: "36px", fontWeight: 800 }}
                  >
                    {ele.sprintname}
                  </h3>
                </legend>

                {task &&
                  task.map((e) => {
                    if (ele._id == e.user) {
                      return (
                        <tr>
                          <td>{e.title}</td>
                          <td>{e.category}</td>
                          <td>{(e.complete = true ? "Not-Don" : "Done")}</td>
                          <td style={{ backgroundColor: "pink" }}>deleate</td>
                        </tr>
                      );
                    }
                  })}
                <button
                  onClick={() => {
                    openModule2(ele._id);
                  }}
                  style={{
                    backgroundColor: "lightgreen",
                    borderRadius: "10px",
                  }}
                >
                  Add Task ➕
                </button>
              </fieldset>
            );
          })}
      </div>
    </div>
  );
};
