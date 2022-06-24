import CategoryIcon from "./CategoryIcon";

function Category({ active, label, icon }) {
  return (
    <div
      className={`w-[100px] h-[100px] flex flex-col justify-between items-center p-3 bg-primary-3  rounded-lg ${
        active ? "border-2 border-primary-7" : "border-2 border-transparent"
      }`}>
      <div className="w-[40px] h-[40px] flex justify-center items-center">
        <CategoryIcon icon={icon} fill={active ? "black" : "#77817B"} />
      </div>
      <div className="font-body text-primary-12 text-lg flex justify-center">{label}</div>
    </div>
  );
}

export default Category;
