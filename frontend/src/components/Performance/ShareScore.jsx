import {
  Box,
  Button,
  Modal,
  Title,
  TextInput,
  Text,
  rem,
  Input,
  UnstyledButton,
  Tooltip,
  CopyButton,
  Image,
} from "@mantine/core";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import { IconClipboard } from "@tabler/icons-react";
import styles from "@/components/Parts/Button/Button.module.scss";
import { Link, useOutletContext } from "react-router-dom";
import { hashData } from "../../util/security";
import { useState } from "react";
import mv from "@/assets/mv.png";

// eslint-disable-next-line react/prop-types
export const ShareScore = ({ score }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const clipboard = useClipboard({ timeout: 500 });
  const clipboardvalue = `${
    import.meta.env.VITE_FRONTEND_URL
  }/performance/${score}`;
  const { user } = useOutletContext();

  const handleClipboard = () => {
    clipboard.copy(clipboardvalue);
  };

  const iconClipboard = (
    <UnstyledButton style={{ width: rem(24), height: rem(24) }}>
      <CopyButton value={clipboardvalue} timeout={2000}>
        {({ copied, copy }) =>
          copied ? (
            <Tooltip
              label="Copied to clipboard!"
              position="top"
              transitionProps={{ transition: "skew-up", duration: 300 }}
              bg={"yellow"}
            >
              <IconClipboard onClick={handleClipboard} />
            </Tooltip>
          ) : (
            <IconClipboard onClick={copy} />
          )
        }
      </CopyButton>
    </UnstyledButton>
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const emailValue = e.target[0].value;
    var currForm = {
      email: emailValue,
      score: score,
    };
    // 8 digits random password
    var randomPassword = Math.random().toString(36).slice(-8);
    console.log(randomPassword);
    currForm.password = randomPassword;
    var hash = hashData(currForm.password);
    currForm.randomNum = randomPassword;
    currForm.password = hash.hash;
    currForm.salt = hash.salt;
    currForm.iterations = hash.iterations;
    const formData = { ...currForm };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASEURL}/user/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Error");
      }
      const data = await res.json();
      console.log(data);
      //   User data
      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Box w={"100%"} style={{ marginTop: "100px" }}>
        <Box>
          <Title ta={"center"}>
            SHARE YOUR SCORE<br></br>
          </Title>
          <Text ta={"center"} mt="md">
            Let someone else glimpse into your volunteer socre by sharing your
            profile link!
          </Text>
          <Input
            size="lg"
            value={clipboardvalue}
            readOnly
            mt="md"
            rightSection={iconClipboard}
            rightSectionPointerEvents="all"
          ></Input>
        </Box>

        {!user && (
          <Box mt="lg" ta={"center"}>
            <Button
              onClick={open}
              className={styles.button}
              size="lg"
              ta={"center"}
            >
              Save your Result
            </Button>
          </Box>
        )}
      </Box>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={() => {
          close();
        }}
        size={"lg"}
      >
        {!submitted ? (
          <Box pb={"lg"}>
            <Box mt="lg" pb={"lg"}>
              <Title c={"2"} fz={"xl"} ta={"center"}>
                GET YOUR RESULTS
              </Title>
              <Text mt="md" ta="center">
                Enter your email address to get a copy of your<br></br>
                results and save them for access at a later date!
              </Text>
              <Box mt="lg">
                <form onSubmit={onSubmit}>
                  <TextInput
                    placeholder="john@volunteerconnect.org"
                    size="lg"
                  ></TextInput>
                  <Box ta="center" mt="lg">
                    <Button
                      size="lg"
                      className={styles.button}
                      type="submit"
                      loading={submitting}
                      loaderProps={{ color: "gray", type: "dots" }}
                    >
                      SEND RESULTS
                    </Button>
                  </Box>
                </form>
              </Box>

              <Text fz="sm" c="gray.5" mt="lg">
                We’ll never sell or inappropriately share your personal data.
                See our <Link to="/">Privacy Policy</Link> for more info. By
                continuing, you agree to our{" "}
                <Link to="/">Terms & Conditions</Link>.
              </Text>
            </Box>
          </Box>
        ) : (
          <Box pb={"lg"}>
            <Title c={"2"} fz={"xl"} ta={"center"}>
              RESULT SENT!
            </Title>
            <Image src={mv} w="30%" m="auto"></Image>
            <Text mt="md" ta="center">
              You will receive the email shortly.
            </Text>
          </Box>
        )}
      </Modal>
    </>
  );
};
