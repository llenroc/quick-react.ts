import * as React from 'react';
import { IDropdownProps, IDropdownOption, DropdownType } from './Dropdown.Props';
import { DirectionalHint } from '../../utilities/DirectionalHint';
import { Callout } from '../Callout/Callout';
import { Icon } from '../Icon/Icon';
import { KeyCodes } from '../../utilities/KeyCodes';
import * as classNames from 'classnames';
import { findIndex } from '../../utilities/array';
import { getId } from '../../utilities/getId';
import './Dropdown.scss';

export interface IDropdownState {
    id: string;
    isOpen: boolean;
    selectedIndex: number;
    isDisabled: boolean;
}

export class Dropdown extends React.PureComponent<IDropdownProps, IDropdownState> {
    public static defaultProps = {
        options: [],
        hasTitleBorder: false,
        displaySelection: true,
        showArrowIcon: true,
        disabled: false,
        dropdownType: DropdownType.linkDropdown
    };

    private static Option: string = 'option';

    public refs: {
        [key: string]: React.ReactInstance,
        root: HTMLElement
    };
    private _dropDown: HTMLDivElement;
    private _dropdownLabel: HTMLElement;

    constructor(props: IDropdownProps) {
        super(props);
        this.state = {
            id: getId('Dropdown'),
            isDisabled: props.disabled,
            isOpen: false,
            selectedIndex: this._getSelectedIndex(props.options, props.selectedKey)
        };
    }

    public componentWillReceiveProps(newProps: IDropdownProps) {
        this.setState({
            selectedIndex: this._getSelectedIndex(newProps.options, newProps.selectedKey),
            isDisabled: newProps.disabled
        });
    }

    getSelectionText = (dropdownType, selectedOption) => {
        if (!this.props.displaySelection) {
            return {
                hasText: false,
                text: ''
            };
        }
        if (this.props.onCustomSelectionText) {
            const text = this.props.onCustomSelectionText();
            return {
                hasText: text !== '',
                text
            };
        } else if (dropdownType === DropdownType.selectionDropdown && selectedOption) {
            const element = <span title={selectedOption.text}>{selectedOption.text}</span>;
            return {
                hasText: selectedOption.text !== '',
                text: element
            };
        } else {
            return {
                hasText: false,
                text: ''
            };
        }
    }

    setDropDownRef = (ref) => { this._dropDown = ref; };
    setDropDownLabelRef = (ref) => { this._dropdownLabel = ref; };

    public render() {
        let { label, options, hasTitleBorder, icon, dropdownType, className, calloutClassName, layerClassName, showArrowIcon } = this.props;
        let { id, isOpen, selectedIndex, isDisabled } = this.state;
        let selectedOption = options[selectedIndex];
        const dropdownIconClassName = hasTitleBorder ? 'iconArrowWithBorder' : 'iconArrow';

        const selectionTextObj = this.getSelectionText(dropdownType, selectedOption);

        const dropdownTitleClassName = classNames({
            'dropdown-title-border': hasTitleBorder,
            'dropdown-title': !hasTitleBorder,
            'arrow': showArrowIcon,
            'text': selectionTextObj.hasText
        });

        const arrowIcon = isOpen ? 'icon-Arrow_up' : 'icon-arrow_down';
        const dropdownContainerStyle = {
            width: this.props.dropdownWidth ? this.props.dropdownWidth : this.getMaxItemWidth()
        };

        return (
            <div ref="root" className="dropdown-root">
                {label && (
                    <label id={id + '-label'} className="label" ref={this.setDropDownLabelRef} >{label}</label>
                )}
                <div
                    data-is-focusable={true}
                    ref={this.setDropDownRef}
                    id={id}
                    className={classNames('dropdown', className, {
                        'is-open': isOpen, 'is-disabled': isDisabled
                    })}
                    tabIndex={isDisabled ? -1 : 0}
                    onKeyDown={this._onDropdownKeyDown}
                    onClick={this._onDropdownClick}
                    role="combobox"
                    style={dropdownContainerStyle}
                >
                    <span className={dropdownTitleClassName} title={this.props.label}>
                        {icon && (
                            <Icon iconName={icon}></Icon>
                        )}
                        {selectionTextObj.text}
                        {this.props.displaySelection && this.props.showArrowIcon &&
                            <Icon className={dropdownIconClassName} iconName={arrowIcon}></Icon>
                        }
                    </span>
                </div>
                {isOpen && (
                    <Callout
                        isBeakVisible={false}
                        className={classNames('dropdown-callout', calloutClassName, layerClassName)}
                        gapSpace={0}
                        doNotLayer={false}
                        targetElement={this._dropDown}
                        directionalHint={DirectionalHint.bottomLeftEdge}
                        onDismiss={this.closeDropdown}
                    >
                        {this.renderItems()}
                    </Callout>
                )}
            </div>
        );
    }

    getMaxItemWidth = () => {
        if (this.props.dropdownType !== DropdownType.actionDropdown && this.props.options.length > 0) {
            let longest = this.props.options.reduce((a, b) => { return a.text.length > b.text.length ? a : b; });
            const arrowIconWidth = this.props.showArrowIcon ? 50 : 25;
            const accualWitdh = longest.text.length * 8  + arrowIconWidth;
            return Math.max(accualWitdh, 60) + 'px';
        }
        return;
    }

    renderItems = () => {
        const { dropdownType, children, className, calloutClassName, layerClassName, onCustomSelectionText } = this.props;
        if (dropdownType === DropdownType.customDropdown) {
            return this.renderCustomDropdownItems();
        }
        if (dropdownType === DropdownType.actionDropdown) {
            return this.renderActionDropdownItems();
        }
        return this.renderDefaultDropdownItems();
    }

    renderCustomDropdownItems = () => {
        return (
            <ul
                id={this.state.id + '-list'}
                className="dropdown-items"
                role="listbox">
                {this.props.children}
            </ul>
        );
    }
    renderActionDropdownItems = () => {
        let { options, icon } = this.props;
        let { id } = this.state;
        return (
            <ul
                id={id + '-list'}
                className="dropdown-items"
                role="listbox"
            >
                {options && options.map((option, index) => (
                    <li
                        id={id + '-list' + option.key}
                        title={option.text}
                        key={option.key}
                        data-index={index}
                        className={'dropdown-item'}
                        onClick={() => this.onActionItemClick(option, index)}
                        role="option"
                    >
                        {option.icon ? <Icon iconName={option.icon}></Icon> : null}
                        {option.text}
                    </li>
                ))}
            </ul>
        );
    }

    onActionItemClick = (option, index) => {
        const { onClick, dropdownKey } = this.props;
        if (onClick) {
            onClick(option, index, dropdownKey);
        }
        this.closeDropdown();
    }

    renderDefaultDropdownItems = () => {
        let { options, icon } = this.props;
        let { id, selectedIndex } = this.state;
        return (
            <ul
                id={id + '-list'}
                style={{ width: this._dropDown.clientWidth - 2 }}
                className="dropdown-items"
                role="listbox">
                {options && options.map((option, index) => (
                    <li id={id + '-list' + index.toString()}
                        ref={Dropdown.Option + index.toString()}
                        title={option.text}
                        key={option.key}
                        data-index={index}
                        data-is-focusable={true}
                        className={classNames('dropdown-item', { 'is-selected': selectedIndex === index })}
                        onClick={() => this._onItemClick(index)}
                        onFocus={() => this.setSelectedIndex(index)}
                        role="option">
                        {option.icon ? <Icon iconName={option.icon}></Icon>
                            : null}
                        {option.text}
                    </li>
                ))}
            </ul>
        );
    }

    public setSelectedIndex(index: number) {
        let { onChanged, options, onClick } = this.props;
        let { selectedIndex } = this.state;

        index = Math.max(0, Math.min(options.length - 1, index));

        if (index !== selectedIndex) {
            this.setState({
                ...this.state,
                selectedIndex: index
            });

            if (onChanged) {
                onChanged(options[index], index);
            }
        }
        if (onClick) {
            onClick(options[index], index);
        }

    }

    private _onItemClick(index) {
        this.setSelectedIndex(index);
        this.setState({
            isOpen: false
        });
    }

    closeDropdown = () => {
        this.setState({ ...this.state, isOpen: false });
        if (this.props.onClosed) {
            this.props.onClosed();
        }
    }

    private _getSelectedIndex(options: IDropdownOption[], selectedKey: string | number) {
        return findIndex(options, (option => (option.isSelected || option.selected || (selectedKey != null) && option.key === selectedKey)));
    }

    private _onDropdownKeyDown = (ev: React.KeyboardEvent<any>) => {
        switch (ev.which) {
            case KeyCodes.enter:
                this.setState({
                    ...this.state,
                    isOpen: !this.state.isOpen
                });
                break;

            case KeyCodes.escape:
                this.setState({
                    ...this.state,
                    isOpen: false
                });
                break;

            case KeyCodes.up:
                this.setSelectedIndex(this.state.selectedIndex - 1);
                break;

            case KeyCodes.down:
                this.setSelectedIndex(this.state.selectedIndex + 1);
                break;

            case KeyCodes.home:
                this.setSelectedIndex(0);
                break;

            case KeyCodes.end:
                this.setSelectedIndex(this.props.options.length - 1);
                break;

            default:
                return;
        }

        ev.stopPropagation();
        ev.preventDefault();
    }

    private _onDropdownClick = () => {
        let { isDisabled, isOpen } = this.state;

        if (!isDisabled) {
            this.setState({
                ...this.state,
                isOpen: !isOpen
            });
        }

        if (this.props.onMenuToggle) {
            this.props.onMenuToggle(!isOpen);  // return next state of opened
        }
    }
}
