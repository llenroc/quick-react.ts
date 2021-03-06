import * as React from 'react';
import { IHoverableCompactServerProps, IHoverableCompactServerState } from './HoverableCompactServer.Props';
import { CommonComponent } from '../Common/Common';
import { CompactServer } from '../CompactServer/CompactServer';
import { Callout } from '../Callout/Callout';
import { autobind } from '../../utilities/autobind';
import { ServerTile } from '../ServerTile/ServerTile';
import { IServer } from '../../models';
import { getServerMeasures } from '../../utilities/server';

export class HoverableCompactServer extends CommonComponent<IHoverableCompactServerProps, IHoverableCompactServerState> {
    private _enterTimerId: number;
    private _hoverTargetElement = null;

    constructor(props: IHoverableCompactServerProps) {
        super(props);
        this.state = {
            showTooltip: false,
            targetHoverElement: null
        };
    }

    @autobind
    private _refCallback(ref) {
        this._hoverTargetElement = ref;
    }

    @autobind
    private onRoleEdit(serverId: string, event: any) {
        if (this.props.onRoleEdit) {
            this.props.onRoleEdit(serverId, '');
        }
    }

    private serverOnClick = (serverId: any) => {
        const { serverOnClick } = this.props;
        if (serverOnClick) {
            serverOnClick('', serverId);
        }
    }

    public render(): JSX.Element {
        const { server, hoverMessageForCriticalOrWarningServer } = this.props;
        return (
            <div className={this.props.className} style={this.props.style} ref={this._refCallback}>
                <CompactServer
                    key={server.id}
                    roles={server.roles}
                    id={server.id}
                    status={server.status}
                    onRoleEdit={this.props.onRoleEdit ? this.onRoleEdit : undefined}
                    name={server.name}
                    onMouseEnter={this._onItemMouseEnter}
                    onMouseLeave={this._onMouseLeave}
                    serverOnClick={this.serverOnClick}
                    hoverMessageForCriticalOrWarningServer={hoverMessageForCriticalOrWarningServer}
                />
                {
                    this.state.showTooltip &&
                    <Callout
                        targetElement={this._hoverTargetElement}
                        hideBorder
                        isBeakVisible={false}
                        gapSpace={5}>
                        {this._renderServerTile(server)}
                    </Callout>
                }
            </div>
        );
    }

    @autobind
    private _onMouseLeave(ev?: React.MouseEvent<HTMLElement>) {
        this._async.clearTimeout(this._enterTimerId);
        this._hideServerTile();
    }

    private _displayServerTile(target: HTMLElement) {
        this.setState({ showTooltip: true, targetHoverElement: target });
    }

    @autobind
    private _hideServerTile() {
        this.setState({ showTooltip: false, targetHoverElement: null });
    }

    @autobind
    private _renderServerTile(server: IServer): JSX.Element {
        return (
            <ServerTile
                name={server.name}
                id={server.id}
                roles={server.roles}
                status={server.status}
                countersData={getServerMeasures(server.measures)}>
            </ServerTile>
        );
    }

    private HOVER_TIME = 250; // ms 
    @autobind
    private _onItemMouseEnter(ev?: React.MouseEvent<HTMLElement>) {
        let targetElement = ev.currentTarget as HTMLElement;
        this._enterTimerId = this._async.setTimeout(() => this._displayServerTile(targetElement), this.HOVER_TIME);

    }
}
