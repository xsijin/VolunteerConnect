/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Container,
  Flex,
  Group,
  Image,
  Menu,
  UnstyledButton,
} from "@mantine/core";
import styles from "@/components/Layout/Header.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import buttonStyles from "@/components/Parts/Button/Button.module.scss";
import mv from "@/assets/mv.png";
import { getUser, logOut } from "../../service/users";
import useToast from "../../hooks/useToast";
import { useDisclosure } from "@mantine/hooks";
import useFetch from "../../hooks/useFetch";
import { hashDataWithSaltRounds, storeToken } from "../../util/security";
import { SigninModal } from "../Signin/SigninModal";

export const Header = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();
  const [opened, { open, close }] = useDisclosure(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { getLoginDetails } = useFetch();

  const handleSubmit = async () => {
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
      navigate("/profile");
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

  const navData = [
    {
      path: "/",
      title: "LANDING",
    },
    {
      path: "/instructions",
      title: "INSTRUCTIONS",
    },
    {
      path: "/scenarios",
      title: "CHOOSE SCENARIOS",
    },
    {
      path: "/roleplay/1",
      title: "ROLEPLAY",
    },
    {
      path: "/performance",
      title: "SHARE RESULTS",
    },
  ];

  const currentIndex = navData.findIndex(
    (navItem) => navItem.path === location.pathname
  );

  const handleLogout = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASEURL}/user/logout`,
        {
          method: "POST",
          body: JSON.stringify({ email: user.email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      logOut();
      setUser(null);
      navigate("/");
      successToast({
        title: "See you again!",
        message: "You have successfully logged out.",
      });
    } catch (err) {
      console.log(err);
      errorToast({
        title: "Error",
        message: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <>
      <div className={styles.header}>
        <Container size="xl">
          <Flex align={"center"} justify={"center"} gap="lg">
            <nav>
              <ul className={styles.ul}>
                <Group justify="space-between">
                  {navData.map((navItem, index) => (
                    <React.Fragment key={navItem.path}>
                      <li
                        className={
                          location.pathname === navItem.path
                            ? styles.active
                            : ""
                        }
                      >
                        {location.pathname === navItem.path ? (
                          navItem.title.includes(" ") ? (
                            navItem.title.split(" ").map((part, index) => (
                              <React.Fragment key={index}>
                                {part}
                                {index === 0 && <br />}
                              </React.Fragment>
                            ))
                          ) : (
                            navItem.title
                          )
                        ) : currentIndex !== -1 && index > currentIndex ? (
                          <span className={styles.disabled}>
                            {navItem.title.includes(" ")
                              ? navItem.title.split(" ").map((part, index) => (
                                  <React.Fragment key={index}>
                                    {part}
                                    {index === 0 && <br />}
                                  </React.Fragment>
                                ))
                              : navItem.title}
                          </span>
                        ) : (
                          <Link to={navItem.path}>
                            {navItem.title.includes(" ")
                              ? navItem.title.split(" ").map((part, index) => (
                                  <React.Fragment key={index}>
                                    {part}
                                    {index === 0 && <br />}
                                  </React.Fragment>
                                ))
                              : navItem.title}
                          </Link>
                        )}
                      </li>
                      {index < navData.length - 1 && (
                        <span className={styles.span}></span>
                      )}
                    </React.Fragment>
                  ))}
                </Group>
              </ul>
            </nav>
            {!user && (
              <Button className={buttonStyles.button} size="lg" onClick={open}>
                Log in
              </Button>
            )}
            {user && (
              <Menu shadow="md" width={200} position="bottom-end" withArrow>
                <Menu.Target>
                  <UnstyledButton>
                    <Image src={mv} w={60} h={60} />
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item component="a" fz="lg" p={"lg"} href="/profile">
                    Your Profile
                  </Menu.Item>
                  <Menu.Item component="a" fz="lg" p={"lg"} href="/">
                    Settings
                  </Menu.Item>
                  <Menu.Item fz="lg" p={"lg"} onClick={handleLogout}>
                    Logout
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Flex>
        </Container>
      </div>

      {/* Signin Modal */}
      <SigninModal opened={opened} setUser={setUser} close={close} />
    </>
  );
};
