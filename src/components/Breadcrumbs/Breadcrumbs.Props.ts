import * as React from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export interface IBreadcrumbsProps extends React.Props<any> {
    items: IBreadcrumbItem[];
    className?: string;
    url: string;
    onPathClick: (path: string) => void;  // return constructed url
}

export interface IBreadcrumbItem extends React.Props<any> {
    key: string;
    displayName: string;
    href?: string;
    onClick?: (ev?: React.MouseEvent<any>, item?: IBreadcrumbItem) => void;
    children?: IBreadcrumbItem[];
}

export interface IBreadcrumbsItemProps {
    iconName: string;
    name: string;
    onClick: () => any;
    selected: boolean;
    siblingItems: Array<any>;
}


export interface ICurrentPathItem {
    name: string;
    key: string;
    index: number;
    url: string;
    selected: boolean;
    siblings?: Array<ICurrentPathItem>;
    onClick?: (ev?: React.MouseEvent<any>, item?: any) => void;
}
