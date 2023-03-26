import axios from "axios";
import "./Home.css";
import React, { useState, useEffect } from "react";

import "react-responsive-modal/styles.css";
import { AiTwotoneDelete } from "react-icons/ai";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Table,
  Thead,
  Tbody,
  Stack,
  Tr,
  Th,
  Td,
  FormControl,
  TableContainer,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormLabel,
  Modal,
  useDisclosure,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Radio, RadioGroup } from "@chakra-ui/react";

export const Home = () => {
  const [Flag, setFlag] = useState("");
  const {
    isOpen: isSprintOpen,
    onOpen: onSprintOpen,
    onClose: onSprintClose,
  } = useDisclosure();
  const {
    isOpen: isTaskOpen,
    onOpen: onTaskOpen,
    onClose: onTaskClose,
  } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [taskdiscription, setTaskdiscription] = useState("");
  const [status, setStaus] = useState("false");
  const [category, setCategory] = useState("feature");

  const [sprint, setSprint] = useState("");
  const [user, setUser] = useState("");

  const [data, setData] = useState("");
  const [task, setTask] = useState("");

  let impPayload = {
    title: taskdiscription,
    category: category,
    complete: status,
    user: user,
  };
  const toast = useToast();

  function openModule2(id) {
    setUser(id);
  }

  function handelTaskAdd() {
    impPayload.linkid = localStorage.getItem("userid");

    axios
      .post("https://katydid-top-hat.cyclic.app/taskadd", impPayload, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        toast({
          title: `${res.data}`,
          position: "top",
          status: "success",
          isClosable: true,
        });
        onTaskClose();
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
          linkid: localStorage.getItem("userid"),
        },
        {
          headers: {
            auth: token,
          },
        }
      )
      .then((res) => {
        toast({
          title: `${res.data}`,
          status: "success",
          position: "top",
          isClosable: true,
        });

        onSprintClose();
        getdata();
      });
  }

  function handelTaskDelet(id) {
    axios
      .delete(`https://katydid-top-hat.cyclic.app/taskdel/${id}`, {
        headers: {
          userid: localStorage.getItem("userid"),
          auth: token,
        },
      })
      .then((res) => {
        toast({
          title: `${res.data}`,
          position: "top",
          status: "error",
          isClosable: true,
        });
        getdata();
      });
  }
  function handelSprintDel(id) {
    axios
      .delete(`http://localhost:8080/sprintdel/${id}`, {
        headers: {
          userid: localStorage.getItem("userid"),
          auth: token,
        },
      })
      .then((res) => {
        toast({
          title: `${res.data}`,
          position: "top",
          status: "error",
          isClosable: true,
        });
        getdata();
      });
  }
  function handelTaskStatusTogal(id, status) {
    axios
      .patch(
        `http://localhost:8080/taskupdate/${id}`,
        { complete: !status },
        {
          headers: {
            userid: localStorage.getItem("userid"),
            auth: token,
          },
        }
      )
      .then((res) => {
        toast({
          title: `${res.data}`,
          position: "top",
          isClosable: true,
        });
        getdata();
      });
  }
  useEffect(() => {
    getdata();
  }, []);

  return (
    <div className="home">
      <p className="heading_task_manager">Task Manager</p>
      {/* Modal 1 */}
      <Box>
        <Button
          style={{ backgroundColor: "lightgreen", margin: "10px" }}
          onClick={onSprintOpen}
        >
          Create Sprint
        </Button>

        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isSprintOpen}
          onClose={onSprintClose}
        >
          <ModalOverlay />
          <ModalContent
            style={{
              backgroundColor: "pink",
              width: "400px",
              padding: "20px",
              position: "absolute",
              top: "200px",
              right: "600px",
            }}
          >
            <ModalHeader>Create Sprint 📜</ModalHeader>
            <ModalCloseButton
              style={{
                width: "50px",
                position: "absolute",
                top: "200px",
                right: "600px",
              }}
            />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Sprint Name</FormLabel>
                <Input
                  ref={initialRef}
                  onChange={(e) => {
                    setSprint(e.target.value);
                  }}
                  placeholder="First name"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  handelSprintCreate();
                }}
              >
                Create
              </Button>
              <Button onClick={onSprintClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      {/* Modal 2*/}
      <Box>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isTaskOpen}
          onClose={onTaskClose}
        >
          <ModalOverlay />
          <ModalContent
            style={{
              backgroundColor: "pink",
              width: "400px",
              padding: "20px",
              position: "absolute",
              top: "200px",
              right: "600px",
            }}
          >
            <ModalHeader>Create Task 📜</ModalHeader>
            <ModalCloseButton
              style={{
                width: "50px",
                position: "absolute",
                top: "200px",
                right: "600px",
              }}
            />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Task discription</FormLabel>
                <Input
                  ref={initialRef}
                  onChange={(e) => {
                    setTaskdiscription(e.target.value);
                  }}
                  placeholder="Task discription"
                />

                <FormLabel>Category</FormLabel>
                <RadioGroup onChange={setCategory} value={category}>
                  <Stack direction="row">
                    <Radio value="bug">Bug</Radio>
                    <Radio value="story">story</Radio>
                    <Radio value="feature" defaultChecked>
                      Feature
                    </Radio>
                  </Stack>
                </RadioGroup>

                <FormLabel>Task Status</FormLabel>
                <RadioGroup onChange={setStaus} value={status}>
                  <Stack direction="row">
                    <Radio value="false" defaultChecked>
                      Pending
                    </Radio>
                    <Radio value="true">Complete</Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  handelTaskAdd();
                }}
              >
                Create Task
              </Button>
              <Button onClick={onTaskClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      {/* Main */}
      <div
        style={{
          padding: "20px",
        }}
      >
        {data &&
          data.map((ele) => {
            return (
              <Accordion
                style={{ border: "1px solid gray", marginTop: "20px" }}
                defaultIndex={[0]}
                allowMultiple
              >
                <AccordionItem>
                  {/* <h2> */}
                  <AccordionButton
                    style={{ backgroundColor: "lightblue", fontWeight: 900 }}
                  >
                    <Box as="span" flex="1" textAlign="left">
                      {ele.sprintname}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>

                  <AccordionPanel pb={4}>
                    <TableContainer>
                      <Table variant="simple">
                        <Thead>
                          <Tr style={{ textAlign: "center" }}>
                            <Th
                              style={{
                                textAlign: "center",
                                backgroundColor: "lightseagreen",
                                fontSize: "22px",
                                fontWeight: 700,
                              }}
                            >
                              Task
                            </Th>
                            <Th
                              style={{
                                textAlign: "center",
                                backgroundColor: "lightsalmon",
                                fontSize: "22px",
                                fontWeight: 700,
                              }}
                            >
                              category
                            </Th>
                            <Th
                              style={{
                                textAlign: "center",
                                backgroundColor: "lightskyblue",
                                fontSize: "22px",
                                fontWeight: 700,
                              }}
                            >
                              Status
                            </Th>
                            <Th
                              style={{
                                textAlign: "center",
                                backgroundColor: "lightyellow",
                                fontSize: "22px",
                                fontWeight: 700,
                              }}
                            >
                              Delete Task
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {task &&
                            task.map((e) => {
                              if (ele._id == e.user) {
                                return (
                                  <Tr>
                                    <Td style={{ textAlign: "center" }}>
                                      {e.title}
                                    </Td>
                                    <Td style={{ textAlign: "center" }}>
                                      {e.category}
                                    </Td>
                                    <Td
                                      onClick={() => {
                                        handelTaskStatusTogal(
                                          e._id,
                                          e.complete
                                        );
                                      }}
                                      style={{
                                        backgroundColor: e.complete
                                          ? "green"
                                          : "pink",
                                        textAlign: "center",
                                      }}
                                    >
                                      {e.complete ? "Compleate" : "Pending"}
                                      {console.log("chek4", e.complete)}
                                    </Td>
                                    <Td
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                      onClick={() => {
                                        handelTaskDelet(e._id);
                                      }}
                                    >
                                      <AiTwotoneDelete
                                        style={{ color: "red" }}
                                      />
                                    </Td>
                                  </Tr>
                                );
                              }
                            })}
                          <Button
                            onClick={() => {
                              openModule2(ele._id);
                              onTaskOpen();
                            }}
                            style={{
                              backgroundColor: "lightgreen",
                              borderRadius: "10px",
                            }}
                          >
                            Add Task ➕{" "}
                          </Button>
                          <Button
                            style={{ backgroundColor: "pink", margin: "10px" }}
                            onClick={(e) => {
                              handelSprintDel(ele._id);
                            }}
                          >
                            delete Sprint{" "}
                            <AiTwotoneDelete
                              style={{
                                padding: "0px 0px 0px 5px",
                                fontSize: "25px",
                                color: "red",
                              }}
                            />
                          </Button>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            );
          })}
      </div>
    </div>
  );
};
