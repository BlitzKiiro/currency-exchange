"use client";
import { useRef } from "react";
import { useToggle, useOnClickOutside } from "usehooks-ts";
import styles from "./styles.module.css";
import { ChevronDown, ChevronUp } from "../Icons";
import cn from "classnames";

interface PropTypes {
  label: string;
  placeholder: string;
  options: string[];
  selectedValue: string | null;
  onChange: (value: string) => void;
  disabledValues: [string | null];
}

const DropDown = ({
  label,
  placeholder,
  options,
  selectedValue,
  onChange,
  disabledValues,
}: PropTypes) => {
  const [isExpanded, toggleExpanded, setToggle] = useToggle();
  const menuRef = useRef(null);

  useOnClickOutside(menuRef, () => setToggle(false));

  return (
    <div className={styles.container} ref={menuRef}>
      <label htmlFor='number-input' className={styles.label}>
        {label}
      </label>
      <div className={styles.menu} onClick={toggleExpanded}>
        <p>{selectedValue ?? placeholder}</p>
        <span>{isExpanded ? <ChevronUp /> : <ChevronDown />}</span>
      </div>
      <div className={styles.optionsContainer}>
        {isExpanded && (
          <div className={styles.options}>
            {options.map((option, index) => (
              <span
                className={cn(styles.option, {
                  [styles.disabled]: disabledValues.includes(option),
                })}
                key={index}
                onClick={() => {
                  if (disabledValues.includes(option)) return;
                  onChange(option);
                  toggleExpanded();
                }}
              >
                {option}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DropDown;
