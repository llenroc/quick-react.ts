import * as React from 'react';
import * as d3 from 'd3';
import * as classNames from 'classnames';
import { Label } from '../Label/Label';
import { ILineChartProps } from './LineChart.props';
import { ILineChartData } from './LineChart.props';
import './LineChart.scss';

export class LineChart extends React.Component<ILineChartProps, null> {
    public static defaultProps = {
        width: 350,
        height: 200,
        id: '',
        title: '',
        ticks: 2
    };

    private _focus: any;
    private margin: any = {
        top: 20,
        bottom: 30,
        left: 50,
        right: 40
    };
    private width: number = this.props.width - this.margin.left - this.margin.right - 10;
    private height: number = this.props.height - this.margin.top - this.margin.bottom;

    refs: {
        [argument: string]: (Element);
        container: (HTMLInputElement);
        xAxis: (HTMLInputElement);
        yAxis: (HTMLInputElement);
        line: (HTMLInputElement);
    };

    private x;
    private y;

    constructor(props: ILineChartProps) {
        super(props);
        this.x = this.generateX();
        this.y = this.generateY();       
    }

    public componentDidMount() {
        this.draw();
    }

    public componentDidUpdate() {
        this.x = this.generateX();
        this.redraw();
    }

    public shouldComponentUpdate(nextProps: ILineChartProps, nextState: null) {
        if (this.props.height === nextProps.height &&
            this.props.width === nextProps.width &&
            this.props.id === nextProps.id &&
            this.props.title === nextProps.title && 
            this.state === null && nextState === null &&
            this.props.ticks === nextProps.ticks) {
                return !this.arraysEqual(this.props.data, nextProps.data);
        }
        return true;
    }

    private arraysEqual(arr1: ILineChartData[], arr2: ILineChartData[]) {
        if (arr1.length !== arr2.length) { return false; }
        for ( let i = arr1.length; i--; ) {
            if (!this.compareValues(arr1[i], arr2[i])) { return false; }
        }
        return true;
    }

    private compareValues(data1: ILineChartData, data2: ILineChartData) {
        if (typeof data1.argument !== 'number') {
            if ((data1.argument as Date).getTime() !== (data2.argument as Date).getTime()) { return false; }
        }
        if (data1.argument !== data2.argument) { return false; }
        if (data1.value !== data2.value) { return false; }
        return true;
    }
    
    public render() {
        const id = this.props.id;
        const xClass = classNames('x-axis', id);
        const yClass = classNames('y-axis', id);
        const lineClass = classNames('line-chart-line', id);

        return (
            <div className={'line-chart-container'}>
                <Label className={'line-chart-title'}>{this.props.title}</Label>
                <svg width={this.props.width - 10} height={this.props.height}>
                    <g className={'svg-container'} transform={'translate(' + this.margin.left + ',' + (this.margin.top + 20) + ')'} ref={'container'}>
                        <g className={xClass} transform={'translate(0,' + (this.height - 20) + ')'} ref={'xAxis'}></g>
                        <g className={yClass} ref={'yAxis'}></g>
                        <path className={lineClass} ref={'line'}></path>
                    </g>
                </svg>
            </div>
        );
    }

    private draw() {
        (d3.select(this.refs.xAxis) as any).call(this.generateXAxis());
        (d3.select(this.refs.yAxis) as any).call(this.generateYAxis()).selectAll('line').attr('transform', 'translate(-15, 0)');
        (d3.select(this.refs.line) as any).data([this.props.data]).attr('d', this.constructArea());

        const svg = d3.select(this.refs.container);

        this.addTooltip(svg);
        this.drawCaptureArea(svg);
    }

    private redraw() {
        (d3.select(this.refs.xAxis) as any).call(this.generateXAxis());
        d3.select(this.refs.line).data([this.props.data]).attr('d', this.constructArea());
    }

    private generateX() {
        const scale: any = (typeof this.props.data[0].argument) === 'number' ? d3.scaleLinear() : d3.scaleTime();
        return scale.domain(d3.extent(this.props.data, (d) => d.argument)).range([0, this.width]);
    }

    private generateY() {
        return d3.scaleLinear().domain([0, 100]).range([this.height - 20, 0]);
    }

    private generateXAxis() {
        const axis = d3.axisBottom(this.generateX())
                .tickValues(d3.extent(this.props.data, (d) => d.argument))
                .tickSizeInner(-(this.height - 20))
                .tickSizeOuter(0)
                .tickPadding(15);
        if (typeof this.props.data[0].argument !== 'number') { return axis.ticks(2, '%I:%M:%S %p'); }
        return axis.ticks(2);
    }

    private generateYAxis() {
        return d3.axisLeft(this.generateY())
                .tickSizeInner(-(this.width + 15))
                .tickSizeOuter(-10)
                .ticks(this.props.ticks)
                .tickFormat((d) => (d + '%'))
                .tickPadding(20);   
    }

    // private constructLine() {
    //     return d3.line<ILineChartData>()
    //                 .x((d) => this.x(d.argument))
    //                 .y((d) => this.y(d.value))
    //                 .curve(d3.curveMonotoneX);
    // }

    private constructArea() {
        return d3.area<ILineChartData>().x((d) => this.x(d.argument)).y0(this.y(0)).y1((d) => this.y(d.value));
    }

    private drawCaptureArea(svg: any) {
        return svg.append('rect')
                    .attr('width', this.width)
                    .attr('height', this.height)
                    .attr('class', 'line-chart-capture')
                    .on('mouseover', () => this._focus.style('display', null))
                    .on('mouseout', () =>  this._focus.style('display', 'none'))
                    .on('mousemove', () => this.mouseMove());
    }

    private addTooltip(container: any) {
        this._focus = container.append('g').attr('class', 'tip-container').style('display', 'none');
        this._focus.append('polygon')
            .attr('class', 'tip-pol')
            .attr('points', '10,20 20,35 30,20');
        this._focus.append('rect')
            .attr('width', 40)
            .attr('height', 24)
            .attr('class', 'tip-rect');
        this._focus.append('text')
            .attr('class', 'tooltip-text')
            .attr('dx', 8)
            .attr('dy', '-.3em');
    }

    private mouseMove() {
        const bisect = d3.bisector<ILineChartData, any>((d) => d.argument).left;
        let x0 = this.x.invert(d3.mouse(d3.event.currentTarget)[0]);

        let i = bisect(this.props.data, x0, 1);
        let d0 = this.props.data[i - 1];
        let d1 = this.props.data[i];
        let d;

        if (typeof this.props.data[0].argument !== 'number') {
            d = (x0.getTime() - (d0.argument as Date).getTime()) > ((d1.argument as Date).getTime() - x0.getTime()) ? d1 : d0;
        } else {
            d = x0 - (d0.argument as any) > (d1.argument as any) - x0 ? d1 : d0;
        }

        this._focus.select('.tip-rect')
                .attr('transform', 'translate(' + (this.x(d.argument) - 20) + ',' + (this.y(d.value) - 40) + ')');
        this._focus.select('.tip-pol')
                .attr('transform', 'translate(' + (this.x(d.argument) - 20) + ',' + (this.y(d.value) - 40) + ')');
        this._focus.select('text.tooltip-text')
                .attr('transform', 'translate(' + (this.x(d.argument) - 24) + ',' + (this.y(d.value) - 20) + ')')
                .text(() => d.value + ' %');
    }
}
