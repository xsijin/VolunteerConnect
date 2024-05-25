import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import styles from "@/components/Parts/Button/Button.module.scss";

export const ButtonComponent = () => {
  return (
    <Button
      component={Link}
      to="/selection"
      className={styles.button}
      size="lg"
    >
      START
    </Button>
  );
};
