/* tslint:disable:no-console */
import 'babel-polyfill';
import 'ts-helpers';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { DirectionalHint } from './../../src/utilities/DirectionalHint';
import { ContextualMenu } from './../../src/components/ContextualMenu/ContextualMenu';

import { Button } from './../../src/components/Button/Button';

export class Index extends React.Component<any, any> {    
    public render() {
         return (
            <div>
                 <ContextualMenu
                    shouldFocusOnMount={true}
                    targetPoint={{ x: 1000, y: 300 }}
                    useTargetPoint={true}
                    onDismiss={() => { } }
                    directionalHint={DirectionalHint.bottomRightEdge}
                    items={
                        [
                            {
                                key: 'newItem',
                                iconProps: {iconName: 'icon-add'},
                                items: [
                                    {
                                        key: 'emailMessage',
                                        name: 'Email message',
                                        title: 'Create an email'
                                    },
                                    {
                                        key: 'calendarEvent',
                                        name: 'Calendar event',
                                        title: 'Create a calendar event'
                                    }
                                ],
                                name: 'New'
                            },
                            {
                                key: 'upload',
                                iconProps: {iconName: 'icon-upload'},
                                name: 'Upload',
                                title: 'Upload a file'
                            },
                            {
                                key: 'divider_1',
                                name: '-'
                            },
                            {
                                key: 'rename',
                                name: 'Rename'
                            },
                            {
                                key: 'properties',
                                name: 'Properties'
                            },
                            {
                                key: 'disabled',
                                name: 'Disabled item',
                                disabled: true
                            },
                            {
                                key: 'divider_2',
                                name: '-'
                            },
                            {
                                key: 'share',
                                iconProps: {iconName: 'icon-ghost'},
                                items: [
                                    {
                                        key: 'sharetoemail',
                                        name: 'Share to Email',
                                        iconProps: {iconName: 'icon-add'}
                                    },
                                    {
                                        key: 'sharetofacebook',
                                        name: 'Share to Facebook'
                                    },
                                    {
                                        key: 'sharetotwitter',
                                        name: 'Share to Twitter',
                                        iconProps: {iconName: 'icon-add'},
                                        items: [
                                            {
                                                key: 'sharetoemail_1',
                                                name: 'Share to Email',
                                                title: 'Share to Email',
                                                iconProps: {iconName: 'icon-add'}
                                            },
                                            {
                                                key: 'sharetofacebook_1',
                                                name: 'Share to Facebook',
                                                title: 'Share to Facebook'
                                            },
                                            {
                                                key: 'sharetotwitter_1',
                                                name: 'Share to Twitter',
                                                title: 'Share to Twitter',
                                                iconProps: {iconName: 'icon-add'}
                                            }
                                        ]
                                    }
                                ],
                                name: 'Share'
                            },
                            {
                                key: 'print',
                                iconProps: {iconName: 'icon-add'},
                                name: 'Print'
                            },
                            {
                                key: 'music',
                                iconProps: {iconName: 'icon-add'},
                                name: 'Music'
                            },
                            {
                                key: 'divider_3',
                                name: '-'
                            },
                            {
                                key: 'Bing',
                                name: 'Go to Bing',
                                href: 'http://www.bing.com'
                            }
                        ]
                    }
                    />
            </div>
        );
    }
}
ReactDOM.render(<Index />, document.getElementById('root'));
