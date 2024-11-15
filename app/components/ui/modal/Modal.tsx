"use client";
import React, { useEffect } from "react";
import cl from "./Modal.module.css";
import { useScrollLock } from "@/app/hooks/useScrollLock";

type Props = {
  children: React.ReactNode;
  visible: boolean;
  setVisible: (value: boolean) => void;
  isNeedPadding?: boolean;
};
const Modal = ({
  children,
  visible,
  setVisible,
  isNeedPadding = false,
}: Props) => {
  const rootClasses = [cl.modal];
  const { lock, unlock } = useScrollLock({ autoLock: false });
  if (visible) {
    rootClasses.push(cl.active);
    // lock();
  }
  useEffect(() => {
    if (visible) {
      lock();
    } else {
      unlock();
    }
    // Очистка эффекта при размонтировании компонента
    return () => unlock();
  }, [visible, lock, unlock]);
  if (visible) {
    return (
      <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
        <div
          className={cl.content}
          {...(isNeedPadding
            ? {
                style: {
                  padding: "0",
                  borderRadius: "0",
                  background: "transparent",
                },
              }
            : {})}
          onClick={(event) => event.stopPropagation()}
        >
          <button className={cl.closeBtn} onClick={() => setVisible(false)}>
            ×
          </button>
          {children}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
export default Modal;
