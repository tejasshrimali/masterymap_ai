import { useState } from "react";
import run from "../services/geminiApi.js";
let keywords = ["html", "JS", "CSS", "Web Development", "Unity Engine", "Unreal Engine", "Godot", "Java", "Kotlin"];

let userSelected_words = [];
let advice = "";
function UserForm() {
  const [data, setData] = useState(null);

  const pushVal = (v) => {
    if (userSelected_words.includes(v)) {
      userSelected_words.splice(userSelected_words.indexOf(v), 1);
      document.querySelector(`.${v.replace(" ", "")}`).style.backgroundColor = "white";
    } else {
      document.querySelector(`.${v.replace(" ", "")}`).style.backgroundColor = "skyblue";
      userSelected_words.push(v);
    }

    console.log(userSelected_words);
  };

  const getData = async (userSelected_words) => {
    setData(await run(userSelected_words));
  };
  return (
    <div className="w-full h-screen flex  flex-col items-center gap-10  scale-95  ">
      {data !== null ? (
        <div className=" data  max-w-3xl p-3 rounded-md mr-1 ml-1 lg:w-9/12">
          <div className="q1 text-2xl font-semibold mb-10">Here is your study plan :</div>
          <div className="font-medium p-3 advice_box rounded-md text-lg">{data?.advice}</div>
          <br></br>
          <div className="Resources font-medium p-3 advice_box rounded-md text-lg">
            {data?.resources.map((val) => {
              return (
                <>
                  <div className="type p-2">
                    <p className="resource_type opacity-75">{val.type}</p>
                    <p>{val.title}</p>
                    <a href={val.link} className="text-blue-600">
                      {val.link}
                    </a>
                  </div>
                  <hr />
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div className="form-container min-w-fit sm:w-80 max-w-3xl p-3 rounded-md mr-1 ml-1 lg:w-9/12 mt-5">
            <div className="q1 text-2xl font-semibold mb-10">Select your interest(s) :</div>
            <div className="opts grid  md:grid-cols-4  gap-5 grid-cols-3">
              {keywords.map((val, i) => {
                return (
                  <div key={i}>
                    <input
                      type="button"
                      value={val}
                      onClick={(e) => {
                        pushVal(e.target.value);
                      }}
                      id={val}
                      className={`p-2  btn rounded-md w-full ${val.replace(" ", "")}`}
                    ></input>

                    <br />
                  </div>
                );
              })}
            </div>
            <br />
          </div>
          <button
            className="p-3 font-bold submit_btn w-fit rounded-md active:scale-110 active:opacity-85 text-white"
            onClick={() => getData(userSelected_words)}
          >
            Let's Begin
          </button>
        </>
      )}
      {/* <div className="form-container min-w-fit sm:w-80 max-w-3xl p-3 rounded-md mr-1 ml-1 lg:w-9/12">
        <div className="q1 text-2xl font-semibold mb-10">Choose your interest :</div>
        <div className="opts grid  md:grid-cols-4  gap-5 grid-cols-3">
          {keywords.map((val, i) => {
            return (
              <div key={i}>
                <input
                  type="button"
                  value={val}
                  onClick={(e) => {
                    pushVal(e.target.value);
                    setClick(true);
                  }}
                  id={val}
                  className={`p-2  btn rounded-md w-full ${val}`}
                ></input>

                <br />
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}

export default UserForm;
