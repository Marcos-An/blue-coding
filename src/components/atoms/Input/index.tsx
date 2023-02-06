import styles from "./input.module.scss";

export const Input = ({ ...rest }) => {
  return <input {...rest} className={styles.input} />;
};
