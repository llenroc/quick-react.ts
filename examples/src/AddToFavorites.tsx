/* tslint:disable:no-console */
import 'babel-polyfill';
import 'ts-helpers';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Button } from './../../src/components/Button/Button';
import { AddToFavorites } from './../../src/components/AddToFavorites/AddToFavorites';

export class Index extends React.Component<any, any> {
    public constructor() {
        super();
        this.state = { favorited: true };
    }
    public render() {
        return (
            <div>
                <AddToFavorites favorited={this.state.favorited} />
                <br />
                <br />
                <Button onClick={() => { this.setState({ favorited: !this.state.favorited }); }} >Toggle Favorite</Button>
            </div>
        );
    }
}
ReactDOM.render(<Index />, document.getElementById('root'));
