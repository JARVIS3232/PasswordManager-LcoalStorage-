import React from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
const Manager = () => {
  const [Form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const showPassword = (e) => {
    let img = document.getElementById("pass");
    let showPass = document.getElementById("showPass");
    let lastIndex = img.src.split("/").length - 1;
    if (img.src.split("/")[lastIndex] == "hidden.png") {
      img.src = "/eye.png";
      showPass.type = "text";
    } else {
      img.src = "/hidden.png";
      showPass.type = "password";
    }
  };
  const savePassword = () => {
    if (Form.site === "" || Form.password === "" || Form.username === "") {
      return;
    }
    setpasswordArray([...passwordArray, { ...Form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...Form, id: uuidv4() }])
    );
    setForm({ site: "", username: "", password: "" });
  };
  const deletePassword = (id) => {
    setpasswordArray(passwordArray.filter((item) => item.id != id));
    localStorage.setItem(
      "passwords",
      JSON.stringify(passwordArray.filter((item) => item.id != id))
    );
  };
  const editPassword = (id) => {
    console.log("editing password with id : ", id);
    setForm(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id != id));
  };

  const handleChange = (e) => {
    setForm({ ...Form, [e.target.name]: e.target.value });
  };
  const copyText = (text) => {
    toast("Copied To Clipboard !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  return (
    <>
      <ToastContainer autoClose={2000} />
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-300 opacity-20 blur-[100px]"></div>
      </div>
      <div className="md:mycontainer bg-slate-200 text-green-600">
        <h1 className="font-bold text-4xl text-center">
          <span className="text-green-600">&lt;</span>
          <span className="text-black">Pass</span>
          <span className="text-green-600">OP</span>
          <span className="text-green-600">/&gt;</span>
        </h1>
        <p className="text-center py-4 text-xl">Your Own Password Manager</p>
        <div className=" flex flex-col p-4 gap-10 items-center">
          <input
            type="text"
            value={Form.site}
            name="site"
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full focus-visible:outline-none border-2 border-white px-2 py-1 w-full"
          />
          <div className="flex flex-col md:flex-row gap-10 w-full">
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={Form.username}
              placeholder="Enter Username"
              className="rounded-full w-full focus-visible:outline-none border-2 border-white px-2 py-1"
            />
            <div className="relative flex items-center w-full md:w-fit">
              <input
                id="showPass"
                name="password"
                onChange={handleChange}
                value={Form.password}
                type="password"
                placeholder="Enter Password"
                className="rounded-full focus-visible:outline-none border-2 border-white px-3 py-1 w-full md:w-fit"
              />
              <span className="md:absolute md:right-0 absolute right-0 mr-2">
                <img
                  id="pass"
                  width={20}
                  className="cursor-pointer"
                  onClick={showPassword}
                  src="/hidden.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center gap-1 p-4 rounded-full bg-green-500 w-fit hover:bg-green-300 text-black"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="text-2xl font-bold py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords To Show !</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full text-center text-[12px] md:text-[16px]">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">Username</th>
                  <th className="py-2">Passwords</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 py-2">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center py-2 border-white border">
                        <div className="flex items-center justify-between px-2">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <img
                              src="/copy.gif"
                              width={30}
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center  py-2 border-white border">
                        <div className="flex items-center justify-between px-2">
                          <span> {item.username}</span>
                          <div
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <img
                              src="/copy.gif"
                              width={30}
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center  py-2 border-white border">
                        <div className="flex items-center justify-between px-2">
                          <span> {item.password}</span>
                          <div
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <img
                              src="/copy.gif"
                              width={30}
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </td>
                      <td className="text-center  py-2 border-white border">
                        <div className="flex items-center justify-around px-2">
                          <div
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <img
                              src="/edit.svg"
                              width={30}
                              className="cursor-pointer"
                            />
                          </div>
                          <div
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <img
                              src="/delete.svg"
                              width={30}
                              className="cursor-pointer"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
