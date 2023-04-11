import {
  Text,
  Navbar,
  Button,
  Link,
  Container,
  Grid,
  Collapse,
  Spacer,
} from "@nextui-org/react";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Layout } from "./components/layout";
import { FaGlobeAmericas, FaGlobeEurope, FaGlobeAsia } from "react-icons/fa";
import getGlobalIndex from "../afc/getGlobalIndex";

const IndexTable = dynamic(() => import("./views/IndexTable"), { ssr: false });

export default function Main() {
  const today = new Date().toDateString();
  const [indexData, setIndexData] = useState<any[]>([]);

  const americas = indexData.slice(0, 5);
  const euafme = indexData.slice(5, 10);
  const asia = indexData.slice(10, 16);

  useEffect(() => {
    getGlobalIndex(setIndexData);
  }, []);

  const collapseItems = ["Overview", "Insights", "Query", "News", "Login"];

  return (
    <Layout>
      <Navbar isBordered variant="sticky">
        <Navbar.Brand>
          <Navbar.Toggle aria-label="navbar toggle navigation" showIn={"xs"} />

          <Text b color="inherit" hideIn="xs">
            Quant Priori
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs">
          <Navbar.Link isActive href="#">
            Overview
          </Navbar.Link>
          <Navbar.Link href="#">Insights</Navbar.Link>
          <Navbar.Link href="#">Query</Navbar.Link>
          <Navbar.Link href="#">News</Navbar.Link>
          {/* <Navbar.Link href="#">ETFs</Navbar.Link> */}
        </Navbar.Content>
        <Navbar.Content>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Login
            </Button>
          </Navbar.Item>
        </Navbar.Content>
        <Navbar.Collapse>
          {collapseItems.map((item, _index) => (
            <Navbar.CollapseItem key={item}>
              <Link
                color="inherit"
                css={{
                  minWidth: "100%",
                  backgroundColor: "inherit",
                }}
                href="#"
              >
                {item}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>

      <Container responsive fluid gap={2}>
        <Spacer />
        <Text h1>World Economy</Text>
        <Grid>
          <Collapse.Group accordion={false} bordered>
            <Collapse
              title="U.S. Stock Market"
              subtitle={today}
              arrowIcon={<FaGlobeAmericas />}
            >
              <IndexTable data={americas} title={"US Economy"} />
            </Collapse>
            <Collapse
              title="Europe, Africa & Middle East"
              subtitle={today}
              arrowIcon={<FaGlobeEurope />}
            >
              <IndexTable data={euafme} title={"EU, Africa & MidEast"} />
            </Collapse>
            <Collapse
              title="Asia Pacific"
              subtitle={today}
              arrowIcon={<FaGlobeAsia />}
            >
              <IndexTable data={asia} title={"Asia Pacific Economy"} />
            </Collapse>
          </Collapse.Group>
        </Grid>
      </Container>
    </Layout>
  );
}
