import * as React from 'react';
import * as classNames from 'classnames';
import * as d3 from 'd3';
import { IBarChartProps, IBarChartData } from './BarChart.props';
import './BarChart.scss';

export class BarChart extends React.Component<IBarChartProps, null> {

    public static defaultProps = {
        id: '',
        barColor: '#889ac4',
        hovColor: '#b8c7e8',
        data: [],
        tipText: (data: IBarChartData) => ('Frequency of ' + data.argument + ' is : ' + data.frequency),
        xAxisFormat: () => null,
        width: 500,
        height: 300,
        minWidth: 300,
        maxWidth: 1000,
        isResponsive: false
    };

    public refs: {
        [argument: string]: (Element);
        container: (HTMLInputElement);
    };

    private margin = { top: 50, right: 50, bottom: 50, left: 50 };
    private width = this.props.width - this.margin.right - this.margin.left;
    private height = this.props.height - this.margin.top - this.margin.bottom;
    private x;
    private y;
    private focus;
    private svg;

    constructor(props: IBarChartProps) {
        super(props);

        this.x = this.generateX();
        this.y = this.generateY();

        // console.log(props);

        if(this.props.isResponsive) {
            this.width = window.innerWidth / 2;
            this.height = 0.7 * this.width;
        }
    }

    public componentWillReceiveProps(nextProps: IBarChartProps) {
        // console.log('next props', nextProps);
    }

    public shouldComponentUpdate(nextProps: IBarChartProps, nextState: null) {
        if(this.props.id !== nextProps.id ||
            this.props.width !== nextProps.width ||
            this.props.height !== nextProps.height ||
            this.props.barColor !== nextProps.barColor) {
                return true;
            }
        if(!this.arraysEqual(this.props.data, nextProps.data)) { return true; }
        return false;
    }

    private arraysEqual(arr1: IBarChartData[], arr2: IBarChartData[]) {
        if (arr1.length !== arr2.length) { return false; }
        for ( let i = arr1.length; i--; ) {
            if (!this.compareValues(arr1[i], arr2[i])) { return false; }
        }
        return true;
    }

    private compareValues(data1: IBarChartData, data2: IBarChartData) {
        if (typeof data1.argument !== 'number') {
            if ((data1.argument as Date).getTime() !== (data2.argument as Date).getTime()) { return false; }
        }
        if (data1.argument !== data2.argument) { return false; }
        if (data1.frequency !== data2.frequency) { return false; }
        return true;
    }

    public componentDidMount() {
        this.init();
        if(this.props.isResponsive) { window.addEventListener('resize', () => this._onResize()); }
    }

    public componentDidUpdate() {
        this.redraw();
        console.log('updating bar chart...'); // debug...
    }

    public render() {
        return <div className={'bar-chart-component'} ref={'container'}></div>;
    }

    private init() {
        const xAxisClass = classNames('x-axis', this.props.id);
        const yAxisClass = classNames('y-axis', this.props.id);

        const container = this.createContainer();
        container.append('g').attr('class', xAxisClass).call(this.generateXAxis())
                    .attr('transform', 'translate(0,' + this.height + ')')
                    .selectAll('text').attr('transform', 'rotate(45)').attr("y", 0)
                    .attr("x", 9).attr("dy", ".35em").style('text-anchor', 'start');
        container.append('g').attr('class', yAxisClass).call(this.generateYAxis());
        
        this.generateBars(container);
        this.createTooltip(container);
    }

    private redraw() {
        this.rescale(this.props.width, this.props.height);
    }

    private _onResize() : any {
        let width = window.innerWidth / 2;
        width = width < this.props.minWidth ? this.props.minWidth : width;
        const height = width * 0.7;
        this.rescale(width, height);
    }

    private rescale(newWidth : number, newHeight: number) {
        this.width = newWidth - this.margin.right - this.margin.left;
        this.height = newHeight - this.margin.top - this.margin.bottom;

        this.x.range([0, this.width]);
        this.y.range([this.height, 0]);

        this.svg.attr('height', newHeight).attr('width', newWidth);

        d3.select('.x-axis.' + this.props.id).attr('transform', 'translate(0,' + this.height + ')').call(this.generateXAxis());
        d3.select('.y-axis.' + this.props.id).call(this.generateYAxis());
        d3.selectAll('.bar').data(this.props.data)
                            .attr('x', (d) => this.x(d.argument))
                        	.attr('y', (d) => this.y(d.frequency))
                            .attr('width', this.x.bandwidth())
                            .attr('height', (d) => (this.height - this.y(d.frequency)));
    }

    private createContainer() {
        const containerClass = classNames('bar-chart-container', this.props.id);

        this.svg = d3.select(this.refs.container)
                .append('svg')
                .attr('width', this.props.width)
                .attr('height', this.props.height);
        return this.svg.append('g')
                .attr('class', containerClass)
                .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    private generateX() {
        return d3.scaleBand().domain(this.props.data.map((d) => d.argument)).rangeRound([0, this.width]).padding(0.1);
    }

    private generateY() {
        return d3.scaleLinear().domain([0, d3.max(this.props.data, (d) => d.frequency)]).range([this.height, 0]);
    }

    private generateXAxis() {
        return d3.axisBottom(this.x).tickPadding(10).tickFormat(d3.timeFormat(this.props.xAxisFormat()));
    }

    private generateYAxis() {
        return d3.axisLeft(this.y).tickSizeInner(-this.width).tickPadding(5);
    }

    private generateBars(container: any) {
        container.selectAll('.bar').data(this.props.data).enter()
                    .append('rect').attr('class', 'bar').style('fill', this.props.barColor)
                    .on('mouseover', () => this._onMouseOver())
                    .on('mouseout', () => this._onMouseOut())
                    .attr('x', (d) => this.x(d.argument))
                    .attr('y', (d) => this.height)
                    .attr('width', this.x.bandwidth())
                    .attr('height', 0)
                    .transition()
                    .duration(600)
                    .attr('y', (d) => this.y(d.frequency))
                    .attr('height', (d) => (this.height - this.y(d.frequency)));
    }

    private createTooltip(container: any) {
        this.focus = container.append('g')
                        .attr('class', 'tip-container')
                        .style('display', 'none');
        this.focus.append('polygon')
            .attr('class', 'tip-pol')
            .attr('points', '0,24 10,35 20,24');
        this.focus.append('rect')
            .attr('height', 24)
            .attr('class', 'tip-rect');
        this.focus.append('text')
            .attr('class', 'tooltip-text')
            .attr('dx', 4)
            .attr('dy', 15);
    }

    private _onMouseOver() {
        const node = d3.select(d3.event.currentTarget).style('fill', this.props.hovColor);
        this.focus.style('display', 'block');
        const height = +node.attr('y') - 38;
        const width = Math.floor(+node.attr('width') / 2);
        const xPol = +node.attr('x') + width - 10;
        const data = (node.datum() as IBarChartData);

        const textRef = this.focus.select('.tooltip-text').text(this.props.tipText(data));
        const textWidth = this.focus.select('.tooltip-text').node().getComputedTextLength();
        const tipMargin = 8;

        const xRect = +node.attr('x') + width - (textWidth + tipMargin) / 2;

        this.focus.select('.tip-rect').attr('width', textWidth + tipMargin).attr('transform', 'translate(' + xRect + ',' + height + ')');
        this.focus.select('.tip-pol').attr('transform', 'translate(' + xPol + ',' + height + ')');
        textRef.attr('transform', 'translate(' + xRect + ',' + height + ')');
    }

    private _onMouseOut() {
        d3.select(d3.event.currentTarget).style('fill', this.props.barColor);
        this.focus.style('display', 'none');
    }
}
