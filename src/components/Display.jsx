import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import DisplayByUser from "./DisplayByUser";
import DisplayByPriority from "./DisplayByPriority";
import DisplayByStatus from "./DisplayByStatus";
import { UserContext } from "../App";
import "./Display.css";
const Display = () => {
  const [userData, setUserData] = useState(null);
  const { displayType } = useContext(UserContext);
  useEffect(() => {
    const getData = () => {
      axios
        .get("https://api.quicksell.co/v1/internal/frontend-assignment")
        .then((res) => {
          return res.data;
        })
        .then((datas) => {
          if (displayType === "priority") {
            let obj = {};
            let arr = [0, 4, 3, 2, 1];
            arr.map((priority, index) => {
              const newdata = Object.values(datas.tickets).filter((val) => {
                return val.priority === priority;
              });
              obj[priority] = newdata;
            });
            setUserData(obj);
          } else if (displayType === "status") {
            let obj = {};
            let arr = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];
            arr.map((task, index) => {
              const newdata = Object.values(datas.tickets).filter((val) => {
                return val.status === task;
              });
              obj[task] = newdata;
            });
            setUserData(obj);
          } else {
            let obj = {};
            Object.values(datas.users).map((user, index) => {
              const newdata = Object.values(datas.tickets).filter((val) => {
                return val.userId === user.id;
              });
              obj[user.name] = newdata;
            });
            setUserData(obj);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, [displayType]);

  return (
    <div className="displayContainer">
      {displayType === "user" ? (
        <DisplayByUser data={userData} />
      ) : displayType === "priority" ? (
        <DisplayByPriority data={userData} />
      ) : (
        <DisplayByStatus data={userData} />
      )}
    </div>
  );
};

export default Display;
