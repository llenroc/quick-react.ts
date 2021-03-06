import * as React from 'react';

export interface IPivotItemProps extends React.HTMLProps<HTMLDivElement> {
    linkText: string;
    linkIcon?: string;
    itemKey?: string;
    itemCount?: number;
    disabled?: boolean;
}
