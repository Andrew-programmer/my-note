import ContexMenu from "../../HOCs/ContexMenuHoc";
import ContexMenuTemplate from "../../HOCs/utils/ContexMenuTemplate";

const {WrappedComponent: CardContexMenu} = ContexMenu(ContexMenuTemplate, 'card');

export default CardContexMenu;
