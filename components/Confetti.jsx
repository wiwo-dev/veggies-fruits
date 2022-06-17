import JSConfetti from "js-confetti";
import { useEffect } from "react";

export default function Confetti() {
  useEffect(() => {
    const runConfetti = async () => {
      const jsConfetti = new JSConfetti();
      await jsConfetti.addConfetti({
        emojis: ["🍎", "⚡️", "💥", "✨", "💫", "🍌", "🥑", "🥝", "🥕"],

        confettiRadius: 6,
        confettiNumber: 50,
      });
      console.log("Confetti animation completed!");
      await jsConfetti.addConfetti({
        //confettiColors: ["#ff0a54", "#ff477e", "#ff7096", "#ff85a1", "#fbb1bd", "#f9bec7"],
        confettiColors: [
          "#ebf9eb",
          "#dff3df",
          "#ceebcf",
          "#b7dfba",
          "#97cf9c",
          "#65ba75",
          "#46a758",
          "#3d9a50",
          "#297c3b",
        ],
        confettiRadius: 6,
        confettiNumber: 500,
      });
    };
    runConfetti();
  }, []);

  return null;
}
