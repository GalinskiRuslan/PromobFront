"use client";
import React from "react";
import cl from "./Modal.module.css";
import { useScrollLock } from "@/app/hooks/useScrollLock";

type Props = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (value: boolean) => void;
};
const Modal = ({ children, visible, setVisible }: Props) => {
  const rootClasses = [cl.modal];
  const { lock, unlock } = useScrollLock({ autoLock: false });
  if (visible) {
    rootClasses.push(cl.active);
    // lock();
  } else {
    // unlock();
  }
  if (visible) {
    return (
      <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
        <div
          className={cl.content}
          onClick={(event) => event.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default Modal;
