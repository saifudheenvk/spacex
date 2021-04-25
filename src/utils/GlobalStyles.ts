import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
.ant-table-tbody > tr > td{
    border-bottom:none;
}
.ant-empty {
    display:none !important;
}
.ant-table{
    border: 1px solid #e4e4e7;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
    font-size:12px;
}
.ant-modal{
    width:560px !important;
}
.ant-select-item-option-selected:not(.ant-select-item-option-disabled){
    font-weight:500;
}
`;

export default GlobalStyles;