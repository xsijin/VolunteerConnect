import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Flex } from "@mantine/core";
import { Footer } from "./Footer";
import { useState } from "react";
import { getUser } from "../../service/users";

export const Layout = () => {
  const [user, setUser] = useState(getUser());

  return (
    <Flex
      direction="column"
      position={"relative"}
      style={{ minHeight: "100vh" }}
      bg={"yellow.0"}
    >
      <Header user={user} setUser={setUser} />
      <main
        style={{
          flexGrow: "1",
          padding: "40px 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* <Container
          size="xl"
          style={{
            flexGrow: "1",
            display: "flex",
            // flexDirection: "column",
            // minWidth: "1200px",
            // maxWidth: "800px",
          }}
        > */}
        <Flex
          align={"center"}
          // direction={"column"}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            flexGrow: "1",
            width: "100%",
          }}
        >
          <Outlet context={{ user, setUser }} />
        </Flex>
        {/* </Container> */}
      </main>
      <Footer />
    </Flex>
  );
};
