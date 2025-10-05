import React, { useRef } from "react";
import DeleteIcon from "../icons/DeleteIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
  type: "youtube" | "twitter";
  link: string;
  title: string;
  id: string;
}

const Card = (props: CardProps) => {
  const deleteRef = useRef<HTMLDivElement | null>(null);

  async function onDelete() {
    const contentId = deleteRef.current?.id;
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/content/deleteOne`,
        {
          data: {
            contentId: contentId,
          },
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("deleted");
    } catch (e) {
      alert("Something went wrong while deleting");
    }
  }
  return (
    <div>
      <div className="flex justify-between text-xl items-center">
        <h3 className="pl-3">{props.title}</h3>
        <DeleteIcon
          Value={props.id}
          reference={deleteRef}
          onclick={() => onDelete()}
        />
      </div>
      {props.type === "youtube" && (
        <div>
          <iframe
            className="h-auto w-3xs"
            src={props.link.replace(
              "https://youtu.be/",
              "https://www.youtube.com/embed/"
            )}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {props.type === "twitter" && (
        <div className="transform scale-70 origin-top-left ">
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")}></a>
          </blockquote>
        </div>
      )}
    </div>
  );
};

export default Card;
