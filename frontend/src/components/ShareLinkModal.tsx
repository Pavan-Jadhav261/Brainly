import React, { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import CrossIcon from "../icons/CrossIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface ShareLinkModalProps {
  open: boolean;
  onClose: () => void;
}

const ShareLinkModal = (props: ShareLinkModalProps) => {
  const [share, setShare] = useState<boolean>(false);
  useEffect(() => {
    isShare();
  }, []);

  async function stopShare() {
    setShare(false);
    setHash("");
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/brain/share`, {
        data: {
          share: share,
        },
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      alert("Stopped sharing");
    } catch (e) {
      alert("something went wrong try again");
    }
  }

  const [hash, setHash] = useState<string>("");
  async function isShare() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/brain/share`,
        {
          share: share,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      );
      setHash(response.data.hash);
    } catch (e) {
      alert("something went wrong try again");
    }
  }
  return (
    <div>
      {props.open && (
        <div className="h-screen w-full  bg-slate-500/50 absolute flex justify-center items-center">
          <div>
            <div className="h-45 w-100 bg-white rounded-2xl ">
              <span className="flex justify-end items-end p-3 cursor-pointer">
                <CrossIcon onclick={props.onClose} />
              </span>
              <div className="flex justify-center items-center flex-col gap-4 pt-3">
                <Input
                  Disable={true}
                  Value={share ? `${BACKEND_URL}/api/brain/:${hash}` : ""}
                />
                <div className="flex gap-4">
                  <Button
                    variant={share ? "selected" : "secondary"}
                    text="Share"
                    onclick={() => {
                      setShare(true);
                      isShare();
                    }}
                  />
                  <Button
                    variant="danger"
                    text="Stop sharing"
                    onclick={() => {
                      setShare(false);
                      stopShare();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareLinkModal;
