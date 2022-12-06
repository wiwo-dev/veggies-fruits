import HorizontalRail from "components/ui/HorizontalRail/HorizontalRail";
import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar/Navbar";
import { useSession } from "next-auth/react";
import HorizontalRailItem from "components/ui/HorizontalRail/HorizontalRailItem";
import Category from "components/Categories/Category";
import { Heading, MainContainer, Text } from "components/ui";
import { BoxHeading, BoxSection, BoxText } from "components/ui/BoxSection";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <section
        className="h-screen w-full bg-[url('/hero-header.jpg')] bg-cover flex justify-center items-center"
        style={{
          backgroundPosition: "center -100px",
        }}>
        <h1 className="font-display text-5xl text-white">Veggies & Fruits</h1>
      </section>
      <MainContainer width="xl">
        <section className="bg-primary-1">
          <HorizontalRail gap={3}>
            <HorizontalRailItem>
              <Category label="All" icon="shopping-basket" active />
            </HorizontalRailItem>
            <HorizontalRailItem>
              <Category label="Fruits" icon="apple" />
            </HorizontalRailItem>
            <HorizontalRailItem>
              <Category label="Veggies" icon="carrot" />
            </HorizontalRailItem>
            <HorizontalRailItem>
              <Category label="Bakery" icon="bakery" />
            </HorizontalRailItem>
            <HorizontalRailItem>
              <Category label="Diary" icon="5" />
            </HorizontalRailItem>
            <HorizontalRailItem>
              <Category label="All" icon="shopping-basket" active />
            </HorizontalRailItem>
            <HorizontalRailItem>
              <Category label="Fruits" icon="apple" />
            </HorizontalRailItem>
            <HorizontalRailItem>
              <Category label="Veggies" icon="carrot" />
            </HorizontalRailItem>
            <HorizontalRailItem>
              <Category label="Bakery" icon="bakery" />
            </HorizontalRailItem>
            <HorizontalRailItem>
              <Category label="Diary" icon="5" />
            </HorizontalRailItem>
          </HorizontalRail>
        </section>
        <Heading>Veggies & Fruits Shop</Heading>
        <Text>This shop doesn't work</Text>
        <BoxSection>
          <BoxHeading>Section test</BoxHeading>
          <BoxText>box section text</BoxText>
        </BoxSection>
      </MainContainer>
    </>
  );
}
