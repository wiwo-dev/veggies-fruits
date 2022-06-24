import HorizontalRail from "components/ui/HorizontalRail/HorizontalRail";
import JsonPreviewer from "components/JsonPreviewer";
import Navbar from "components/Navbar/Navbar";
import { useSession } from "next-auth/react";
import HorizontalRailItem from "components/ui/HorizontalRail/HorizontalRailItem";
import Category from "components/Categories/Category";
import { MainContainer } from "components/ui";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar />
      <JsonPreviewer>{session}</JsonPreviewer>
      <MainContainer width="xl">
        <section className="bg-primary-1 h-[100px]">
          <HorizontalRail height={100} oneClickDistance={100}>
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
      </MainContainer>
    </>
  );
}
