import * as React from 'react';
import { ITreeviewItem } from './TreeviewItem.Props';

export interface ITreeviewProps {
    label?: string;
    className?: string;
    items?: ITreeviewItem[];
    onSelect?: (ev?: React.FormEvent<HTMLInputElement>, itemsId?: string[], checked?: boolean) => void;
    showCheckbox?: boolean;
}
