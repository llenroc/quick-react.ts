import { IDropdownOption } from '../Dropdown/Dropdown.Props';

export enum LogicalOperatorTypeEnum {
    And = 0,
    Or
}

export class ConditionDefinitionRowProps {    
    id: number;
    propertyName: string;
    isHardcodedValue: boolean;
    classname?: string;
    selectedLogicalOperator?: LogicalOperatorTypeEnum; // default and
    conditionSelectionTypes?: IDropdownOption[];
    showStartLogialOperator?: boolean; // default true
    hasMultipleLogicalOperations?: boolean; // default true
    allowConditionDeletion?: boolean; // default true
    hasIndent?: boolean; // default false 
    indentSize?: number; // default 30
    conditionStateChanged?: (conditionState: ConditionDefinitionRowState) => void;
}

export class ConditionDefinitionRowState {
    id: number;
    propertyName: string;
    selectedLogicalOperator: IDropdownOption;
    conditionSelectionType: IDropdownOption;
    addConditionClicked: boolean;
    removeConditionClicked: boolean;
}
