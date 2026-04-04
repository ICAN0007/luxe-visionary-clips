import { useNavigate } from "react-router-dom";
import { filterTabs } from "@/data/videos";

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  const navigate = useNavigate();

  const handleClick = (tab: string) => {
    if (tab === "Models") {
      navigate("/models");
      return;
    }
    onFilterChange(tab);
  };

  return (
    <div className="flex flex-wrap gap-2 py-4">
      {filterTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeFilter === tab ? "pill-active" : "pill-inactive"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
