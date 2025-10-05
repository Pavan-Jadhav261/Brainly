import React, { useRef, useState } from "react";
import Input from "./Input";
import CrossIcon from "../icons/CrossIcon";
import Button from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

const CreateContentModel = (props: CreateContentModelProps) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [type, setType] = useState("youtube");

  async function addContent() {
    let titleVal = titleRef.current?.value;
    let linkVal = linkRef.current?.value;
    try {
      await axios.post(
        `${BACKEND_URL}/api/content`,
        {
          title: titleVal,
          type: type,
          link: linkVal,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("Content added");
    } catch (e) {
      alert("Cannot add content");
    }
    if (titleRef.current) titleRef.current.value = "";
    if (linkRef.current) linkRef.current.value = "";
  }

  return (
    <>
      <div>
        {props.open && (
          <div className="h-full w-full bg-slate-500/50 absolute p-0 m-0 flex justify-center items-center z-2">
            <div className="h-90 w-100 bg-white rounded-2xl ">
              <span className="flex justify-end items-center p-4 ">
                <div className="cursor-pointer" onClick={props.onClose}>
                  <CrossIcon />
                </div>
              </span>
              <div className="flex flex-col gap-2 justify-center items-center">
                <Input placeHolder=" Add Title Here" reference={titleRef} />
                <Input placeHolder="Paste Link Here" reference={linkRef} />
              </div>
              <div className="flex justify-evenly items-center pt-4">
                <Button
                  text="Youtube"
                  variant={type == "youtube" ? "selected" : "secondary"}
                  Value="youtube"
                  onclick={() => setType("youtube")}
                />
                <Button
                  text="twitter"
                  variant={type == "twitter" ? "selected" : "secondary"}
                  Value="twitter"
                  onclick={() => setType("twitter")}
                />
              </div>
              <div className="flex justify-center items-center pt-4">
                <Button
                  text="Submit"
                  variant={"primary"}
                  onclick={() => addContent()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateContentModel;
