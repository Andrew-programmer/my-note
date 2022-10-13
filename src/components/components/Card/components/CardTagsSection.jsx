import ExpandElementHoc from "../../../../HOCs/ExpandElement.hoc";
import CardCollapse from "./CardCollapse";
import CardActionsArea from "./CradActionsArea";

const style = {
    expandedTagsContainer: `!border-b-black-200 !border-b !mx-[2px] sm:!z-50 sm:!absolute sm:bg-white 2xl:w-[12.9%] xl:w-[18.6%] lg:w-[23.1%] md:w-[22.5%] sm:w-[30.2%] w-[97.6%]`,
    nonExpandedTagsContainer: `!mx-[2px]`
}


const CardTagsSection = ExpandElementHoc(CardActionsArea, CardCollapse, style)

export default CardTagsSection;
