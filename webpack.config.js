'use strict';

const path = require('path');
const webpack = require('webpack');
const loaders = require('./webpack/loaders');
const plugins = require('./webpack/plugins');

module.exports = {
    entry: {
        Dropdown: "./examples/src/Dropdown.tsx",
        Button: "./examples/src/Button.tsx",
        CompactServer: "./examples/src/CompactServer.tsx",
        TagContainer: "./examples/src/TagContainer.tsx",
        BarChart: "./examples/src/BarChart.tsx",
        Callout: "./examples/src/Callout.tsx",
        MainNavigation: "./examples/src/MainNavigation.tsx",
        MessageBar: "./examples/src/MessageBar.tsx",
        Pivot: "./examples/src/Pivot.tsx",
        Dialog: "./examples/src/Dialog.tsx",
        Search: "./examples/src/Search.tsx",
        Icon: "./examples/src/Icon.tsx",
        Breadcrumbs: "./examples/src/Breadcrumbs.tsx",
        LeftNavigation: "./examples/src/LeftNavigation.tsx",
        ConditionSelector: "./examples/src/ConditionSelector.tsx",
        ContextualMenu: "./examples/src/ContextualMenu.tsx",
        Checkbox: "./examples/src/Checkbox.tsx",
        ChoiceGroup: "./examples/src/ChoiceGroup.tsx",
        ToggleSwitch: "./examples/src/ToggleSwitch.tsx",
        Slider: "./examples/src/Slider.tsx",
        Label: "./examples/src/Label.tsx",
        TextField: "./examples/src/TextField.tsx",
        Spinner: "./examples/src/Spinner.tsx",
        CheckboxList: "./examples/src/CheckboxList.tsx",
        Treeview: "./examples/src/Treeview.tsx",
        StatusBar: "./examples/src/StatusBar.tsx",
        Dashboard: "./examples/src/Dashboard.tsx",
        ServerTile: "./examples/src/ServerTile.tsx",
        ProgressBar: "./examples/src/ProgressBar.tsx",
        PieChart: "./examples/src/PieChart.tsx",
        LineChart: "./examples/src/LineChart.tsx",
        CompactFarm: "./examples/src/CompactFarm.tsx",
        DetailedServerGroup: "./examples/src/DetailedServerGroup.tsx",
        DetailedServerTile: "./examples/src/DetailedServerTile.tsx",
        ServerGridDashboard: "./examples/src/ServerGridDashboard.tsx",
        DateTimePicker: "./examples/src/DateTimePicker.tsx",
        CustomDateRange: "./examples/src/CustomDateRange.tsx",
        TreeFilter: "./examples/src/TreeFilter.tsx",
        QuickGrid: "./examples/src/QuickGrid.tsx",
        Tooltip: "./examples/src/Tooltip.tsx",
        Wizard: "./examples/src/Wizard.tsx",
        MessageBox: "./examples/src/MessageBox.tsx",
        Compare: "./examples/src/Compare.tsx",
        Scheduler: "./examples/src/Scheduler.tsx",
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: '[name].js',
        publicPath: '/',
        sourceMapFilename: '[name].[hash].js.map'
    },
    devServer: {
        inline: true,
        port: 3000
    },
    devtool: 'source-map',
    resolve: {
        extensions: [
            '',
            '.webpack.js',
            '.web.js',
            '.tsx',
            '.ts',
            '.js',
            '.json'
        ]
    },

    plugins: plugins,

    module: {
        preLoaders: [loaders.tslint],
        loaders: [
            loaders.ts,
            loaders.html,
            loaders.css,
            loaders.json,
            loaders.svg,
            loaders.eot,
            loaders.woff,
            loaders.woff2,
            loaders.ttf,
        ]
    },

    externals: {
        'react/lib/ReactContext': 'window',
        'react/lib/ExecutionEnvironment': true,
        'react/addons': true
    }

}
