/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Anchor,
  Box,
  Button,
  Modal,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import useToast from "../../hooks/useToast";
import { useState } from "react";
import { hashDataWithSaltRounds, storeToken } from "../../util/security";
import { getUser } from "../../service/users";
import classes from "@/pages/User/Signin.module.css";
import buttonstyles from "@/components/Parts/Button/Button.module.scss";
import useFetch from "../../hooks/useFetch";

export const SigninModal = ({ opened, setUser, close }) => {
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { getLoginDetails } = useFetch();

  const handleSubmit = async () => {
    console.log("submitting");
    setSubmitting(true);
    try {
      const loginDetails = await getLoginDetails(email);
      const hashedPassword = hashDataWithSaltRounds(
        password,
        loginDetails.salt,
        loginDetails.iterations
      );
      const payload = {
        email: email,
        password: hashedPassword,
      };
      const res = await fetch(
        `${import.meta.env.VITE_API_BASEURL}/user/login`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = await res.json();
      storeToken(token);
      setUser(getUser());
      setSubmitting(false);
      navigate("/");
      successToast({
        title: "Welcome back!",
        message: "You have successfully logged in.",
      });
    } catch (err) {
      console.log(err);
      errorToast(err.message ? err.message : "error");
      setSubmitting(false);
    }
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={() => {
        close();
      }}
      size={"lg"}
    >
      <Box pb={"lg"} w="80%" m="auto">
        <Title ta="center" className={classes.title}>
          Log in
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Not a member yet?<br></br>
          <Anchor size="sm" component={Link} to="/">
            Create a free profile by taking our roleplay test
          </Anchor>
          .
        </Text>
        <Box mt="md">
          <TextInput
            label="Email"
            placeholder="volunteer@connect.com"
            required
            withAsterisk
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
          />
          <PasswordInput
            label="Password"
            placeholder="Enter Your Password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
            size="lg"
          />
          <Button
            fullWidth
            mt="xl"
            onClick={handleSubmit}
            loading={submitting}
            className={buttonstyles.button}
            size="lg"
          >
            Log in
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
