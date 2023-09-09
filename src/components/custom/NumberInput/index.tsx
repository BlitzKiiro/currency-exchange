"use client";
import styles from "./styles.module.css";

interface PropTypes {
  value?: string;
  onChange?: (value: string) => void;
}

const NumberInput = ({ value, onChange }: PropTypes) => {
  return (
    <div className={styles.container}>
      <label htmlFor='number-input' className={styles.label}>
        Amount
      </label>
      <input
        id='number-input'
        name='number-input'
        className={styles.numberInput}
        type='text'
        pattern='[0-9]*\.?[0-9]*'
        onChange={(e) => {
          if (!e.target.validity.valid || !onChange) return;
          onChange(e.target.value);
          console.log(e.target.value);
        }}
        value={value}
        placeholder='0.00'
      />
    </div>
  );
};

export default NumberInput;
