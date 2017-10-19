import { IStepProps } from './IStepProps';

export interface IStepperProps {
  activeStep?: number;
  steps?: Array<IStepProps>;
  activeColor?: string;
  completeColor?: string;
  defaultColor?: string;
  activeTitleColor?: string;
  completeTitleColor?: string;
  defaultTitleColor?: string;
  circleFontColor?: string;
  size?: number;
  circleFontSize?: number;
  titleFontSize?: number;
  circleTop?: number;
  titleTop?: number;
  defaultOpacity?: string;
  completeOpacity?: string;
  activeOpacity?: string;
  defaultTitleOpacity?: string;
  completeTitleOpacity?: string;
  activeTitleOpacity?: string;
  barStyle?: string;
  defaultBarColor?: string;
  completeBarColor?: string;
  defaultBorderColor?: string;
  completeBorderColor?: string;
  activeBorderColor?: string;
  defaultBorderStyle?: string;
  completeBorderStyle?: string;
  activeBorderStyle?: string;
}
