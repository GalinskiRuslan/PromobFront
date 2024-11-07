import React from "react";
import cl from "./style.module.css";

type Props = { isOn: boolean; handleToggle: () => void };

export const ToggleSwitcher = (props: Props) => {
  return (
    <div
      className={props.isOn ? cl.toggle_switch_on : cl.toggle_switch}
      onClick={props.handleToggle}
    >
      <div className={props.isOn ? cl.toggle_knob_off : cl.toggle_knob} />
    </div>
  );
};
