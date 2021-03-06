/* tslint:disable:no-console */
import 'babel-polyfill';
import 'ts-helpers';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { TagContainer } from './../../src/components/TagContainer/TagContainer';
import { Icon } from './../../src/components/Icon/Icon';

export class Index extends React.Component<any, any> {
    public render() {
        return (
            <div style={{width: '200px'}}>
                <TagContainer
                    title={'Roles:'} 
                    tags={[
                        { display: 'Tag1', iconName: 'icon-add' },
                        { display: 'Tag2', iconName: 'icon-alert' },
                        { display: 'Tag3', iconName: 'icon-buy' }
                    ]}
                />
            </div>
        );
    }
}
ReactDOM.render(<Index />, document.getElementById('root'));
