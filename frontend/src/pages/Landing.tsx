import React, { useEffect } from "react";
import { useState } from "react";
import Button from "../components/Button";
import CreateContentModel from "../components/CreateContentModel";
import PlusIcon from "../icons/PlusIcon";
import ShareIcon from "../icons/ShareIcon";
import Card from "../components/Card";
import axios from "axios";
import { BACKEND_URL } from "../config";
import DeleteIcon from "../icons/DeleteIcon";
import ShareLinkModal from "../components/ShareLinkModal";

interface contentt {
  type: "youtube" | "twitter";
  link: string;
  title: string;
  _id: string;
}

const Landing = () => {
  const [modal, setmodal] = useState(false);
  const [content, setContent] = useState<contentt[]>([]);
  const [shareModal, setShareModal] = useState<boolean>(false);

  async function getContent() {
    const response = await axios.get(`${BACKEND_URL}/api/content`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setContent(response.data.content);
  }

  useEffect(() => {
    getContent();
  }, []);

  async function deleteAll() {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/content/deleteAll`,
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      alert("Deleted all contents");
    } catch (e) {
      alert("Something went wrong cannot delete");
    }
  }

  return (
    <div>
      <div className="font-Outfit h-screen w-full">
        <CreateContentModel open={modal} onClose={() => setmodal(false)} />
        <ShareLinkModal
          open={shareModal}
          onClose={() => setShareModal(false)}
        />
        <div className="flex justify-end gap-3 pr-4 pt-2 ">
          <div className="flex justify-end items-center">
            <Button
              variant="danger"
              text="Delete All"
              startIcon={<DeleteIcon />}
              onclick={() => deleteAll()}
            />
          </div>
          <Button
            text="share"
            variant="primary"
            startIcon={<ShareIcon />}
            onclick={() => setShareModal(true)}
          />
          <div onClick={() => setmodal(true)}>
            <Button
              text="add content"
              variant="secondary"
              startIcon={<PlusIcon />}
            />
          </div>
        </div>
        <div className="p-8 flex flex-wrap">
          {content.map((val, idx) => {
            console.log(val.link);
            return (
              <div className="p-2" key={val._id}>
                <Card
                  type={val.type}
                  link={val.link}
                  title={val.title}
                  id={val._id}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Landing;
