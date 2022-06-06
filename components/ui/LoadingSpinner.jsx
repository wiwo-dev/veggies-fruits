import { Oval } from "react-loader-spinner";

const primary = {
  1: "#fbfefb",
  2: "#f3fcf3",
  3: "#ebf9eb",
  4: "#dff3df",
  5: "#ceebcf",
  6: "#b7dfba",
  7: "#97cf9c",
  8: "#65ba75",
  9: "#46a758",
  10: "#3d9a50",
  11: "#297c3b",
  12: "#1b311e",
};

export default function LoadingSpinner() {
  return <Oval height="100" width="100" color={primary[9]} secondaryColor={primary[3]} ariaLabel="loading" />;
}
