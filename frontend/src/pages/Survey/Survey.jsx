import {
  TextInput,
  Textarea,
  Select,
  Group,
  Space,
  Box,
  Button,
  Flex,
  Image,
  Text,
  Title,
} from "@mantine/core";

import { useForm } from "@mantine/form";

import mv from "@/assets/mv.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "@/components/Parts/Button/Button.module.scss";

const Survey = () => {
  const form = useForm({
    initialValues: {
      questionOne: "",
      questionTwo: "",
    },
  });

  const navigate = useNavigate();

  //What are the most common situations or interactions you face during your volunteer work, and can you provide specific examples?

  //Have you had to engage in difficult conversations with those you are helping, other volunteers, or staff? Can you describe one such instance and how you navigated it?

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = form.getValues();
    console.log("form data: ", formData);

    try {
      // const response = await fetch(process.VITE_API_BASEURL, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // "Authorization": `Bearer ${token}` // Include the JWT token in the request
      //   },
      //   body: JSON.stringify(formData),
      // });
      // console.log("Survey created successfully:", response.data);
      // Optionally reset the form or show a success message
      // setTitle("");
      // setDescription("");
      // setQuestions([{ questionText: "" }]);
      const score = localStorage.getItem("score");
      navigate(`/performance/${score}`);
    } catch (error) {
      console.error("Error creating survey:", error);
    }
  };

  return (
    <Flex
      align={"center"}
      gap={"xl"}
      justify={"space-between"}
      style={{ flexGrow: 1 }}
    >
      {/* <Box w={"40%"}>
        <Image src={mv} />
      </Box> */}
      <Box>
        <Title
          order={1}
          style={{
            fontSize: "50px",
          }}
        >
          GENERATING RESULTS
        </Title>

        <Space h={20} />

        <Text fz="xl" fs={"italic"}>
          Thank you for your patience while we calculate your results. In the
          meantime, we’d love to hear about your volunteering experiences. Your
          feedback helps us improve our platform and better support volunteers
          like you.
        </Text>

        <Space h={20} />

        {/* <form onSubmit={form.onSubmit((values) => console.log(values))}> */}
        <form>
          <Textarea
            label="What are the most common situations or interactions you encounter during your volunteer work? Can you provide specific examples?"
            placeholder="Describe your experience"
            minRows={4}
            {...form.getInputProps("questionOne")}
          />
          <br />

          <Textarea
            label="Have you had to engage in difficult conversations with those you are helping, other volunteers, or staff? Can you describe one such instance and how you navigated it?"
            placeholder="Describe your experience"
            minRows={4}
            {...form.getInputProps("questionTwo")}
          />

          <Box ta={"center"} mt="xl">
            <Button
              component={Link}
              // to="/scenarios"
              onClick={handleSubmit}
              className={styles.button}
              size="lg"
            >
              Continue
            </Button>
          </Box>
        </form>
      </Box>
    </Flex>
  );
};

export default Survey;
