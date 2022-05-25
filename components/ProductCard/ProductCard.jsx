import { AnimateSharedLayout, LayoutGroup, motion } from "framer-motion";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { name, mainPhotoUrl } = product;
  const imageUrl =
    "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80";

  const variant = "first";

  const [countAdded, setCountAdded] = useState(0);

  const handleClickPlus = () => {
    setCountAdded(countAdded + 1);
  };

  const handleClickDelete = () => {
    setCountAdded(0);
  };

  return (
    <div className="w-[155px]">
      <div
        className="w-full h-[120px] bg-center bg-cover bg-gradient-to-tr from-primary-6 to-primary-8 relative"
        style={{ backgroundImage: `url("${mainPhotoUrl}")` }}>
        {/* <AnimateSharedLayout>

            </AnimateSharedLayout> */}

        <motion.div
          layout="position"
          className="w-fit h-[36px] bg-primary-9 flex items-center justify-between rounded-full px-0 shadom-md right-[-8px] top-[-8px] absolute">
          {countAdded > 0 && (
            <>
              <button
                className="w-[36px] h-[36px] rounded-full bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
                onClick={handleClickDelete}>
                <svg
                  //layout="position"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
                    fill="white"
                  />
                </svg>
              </button>
              <span className="text-base font-bold text-white font-abhaya-libre">{countAdded}</span>
            </>
          )}
          <button
            className="w-[36px] h-[36px] rounded-full bg-primary-9 flex items-center justify-center hover:bg-primary-10 active:bg-primary-11"
            onClick={handleClickPlus}>
            <motion.svg
              layout="position"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.1 11.1V7.5H12.9V11.1H16.5V12.9H12.9V16.5H11.1V12.9H7.5V11.1H11.1ZM12 21C7.0293 21 3 16.9707 3 12C3 7.0293 7.0293 3 12 3C16.9707 3 21 7.0293 21 12C21 16.9707 16.9707 21 12 21ZM12 19.2C13.9096 19.2 15.7409 18.4414 17.0912 17.0912C18.4414 15.7409 19.2 13.9096 19.2 12C19.2 10.0904 18.4414 8.25909 17.0912 6.90883C15.7409 5.55857 13.9096 4.8 12 4.8C10.0904 4.8 8.25909 5.55857 6.90883 6.90883C5.55857 8.25909 4.8 10.0904 4.8 12C4.8 13.9096 5.55857 15.7409 6.90883 17.0912C8.25909 18.4414 10.0904 19.2 12 19.2V19.2Z"
                fill="white"
              />
            </motion.svg>
          </button>
        </motion.div>
      </div>

      <p className="font-abhaya-libre text-primary-12">{name}</p>
    </div>
  );
}
