"use client";
import styles from "./styles.module.css";

interface PropTypes {
  label: string;
  onClick: () => void;
  colors?: {
    bg?: string;
    text?: string;
  };
}

const RoundedButton = ({ label, onClick, colors }: PropTypes) => {
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{
        backgroundColor: colors?.bg ?? "#fff",
        color: colors?.text ?? "#000",
      }}
    >
      {label}
    </button>
  );
};

export default RoundedButton;
