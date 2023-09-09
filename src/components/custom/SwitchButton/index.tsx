"use client";
import { SwitchIcon } from "../Icons";
import styles from "./styles.module.css";

interface PropTypes {
  onClick: () => void;
}

const SwitchButton = ({ onClick }: PropTypes) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <SwitchIcon />
    </button>
  );
};

export default SwitchButton;
