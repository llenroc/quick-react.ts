import * as React from 'react';
import * as d3 from 'd3';
import * as classNames from 'classnames';
import { Label } from '../Label/Label';
import { ILineChartProps, ILineChartData, ISeriesData } from './LineChart.props';
import { LineChartContent } from './LineChartContent';
import './LineChart.scss';

const ResizeSensor = require('css-element-queries/src/ResizeSensor');
const objectAssign = require('object-assign');

export class LineChart extends React.PureComponent<ILineChartProps, any> {
    public static defaultProps = {
        width: 0,
        height: 0,
        id: '',
        xAxisTicks: 6,
        yAxisTicks: 6,
        yAxisDomain: [0, 100],
        xAxisFormat: () => null,
        yAxisFormat: (d: number) => d,
        colorPallette: d3.schemeCategory20,
        showLegend: false,
        tooltipText: (d: ILineChartData) => d.value
    };

    private containerRef: HTMLDivElement;

    constructor(props: ILineChartProps) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            isParentMounted: false
        };
    }

     public render() {
        const props = objectAssign({}, this.props, {width: this.state.width, height: this.state.height});
        const componentClass = classNames('line-chart-component', this.props.id, this.props.className);
        const titleClass = classNames('line-chart-title', this.props.id, this.props.className);
        return (
            <div className={componentClass} 
                style={{ width: this.props.dimensions.width, height: this.props.dimensions.height }}
                ref={(element: HTMLDivElement) => this.init(element)}>
                {  
                    ( this.props.showLegend || this.props.title ) && 
                    <div className={classNames('line-chart-header', this.props.id)}>
                        { this.props.title && <Label className={titleClass}>{this.props.title}</Label> }
                        { this.props.showLegend && this.renderLegend() }
                    </div>
                }
                { this.state.isParentMounted && <LineChartContent {...props}/> }
            </div>
        );
    }

    private init(element: HTMLDivElement) {
        if (element === null) { return; }
        this.containerRef = element;
        const sensor = new ResizeSensor(element, () => this.onResize());
        
        const width = element.offsetWidth;
        const height = element.offsetHeight;

        const header = d3.select('.line-chart-header.' + this.props.id).node() as HTMLDivElement;
        const headerHeight = header === null ? 0 :  header.offsetHeight;

        if ((height - headerHeight) !== this.state.height || width !== this.state.width) {
            this.setState({ width: width, height: (height - headerHeight), isParentMounted: true });
        }
    }

    private onResize() {
        const width = this.containerRef.offsetWidth;
        const height = this.containerRef.offsetHeight;

        const header = d3.select('.line-chart-header.' + this.props.id).node() as HTMLDivElement;
        const headerHeight = header === null ? 0 :  header.offsetHeight;

        if ((height - headerHeight) !== this.state.height || width !== this.state.width) {
            this.setState({ width: width, height: (height - headerHeight) });
            this.forceUpdate();
        }
    }

    public componentDidUpdate() {
        const series = d3.selectAll('.line-chart-container.' + this.props.id + ' > path,circle');
        series.attr('display', 'block');
        const items = d3.selectAll('.line-chart-legend.' + this.props.id + ' > .legend-item > div').nodes();
        for (let i = 0; i < items.length; i++) {
            const el = d3.select(items[i]);
            el.style('background-color', el.style('border-color'));
        }
    }

    public componentWillUnmount() { ResizeSensor.detach(this.containerRef); }

    private renderLegend() {
        const colorFunc = d3.scaleOrdinal(this.props.colorPallette);
        const items = this.props.series.map( (data: ISeriesData, index: number) => {
            const legendCheckboxStyle = {
                backgroundColor: colorFunc(data.name),
                boxSizing: 'border-box',
                border: '2px solid ' + colorFunc(data.name)
            };

            return (
                <div key={index} className={'legend-item'} title={data.name}>
                    <div style={ legendCheckboxStyle } 
                        className={ data.id }
                        onClick={(ev: React.MouseEvent<HTMLDivElement>) => this.showHideSeries(ev.currentTarget)}></div>
                    <Label style={{ display: 'inline-block' }}>{ data.name }</Label>
                </div>
            );
        });
        return <div className={classNames('line-chart-legend', this.props.id)}>{items}</div>;
    }

    private showHideSeries(element: HTMLDivElement) {
        const className = element.getAttribute('class');
        const series = d3.selectAll('.line-chart-container.' + this.props.id + ' > .' + className );
        const selector = d3.select(element).style('background-color', 'white');

        if (series.attr('display') === 'none') {
            series.attr('display', 'block');
            selector.style('background-color', selector.style('border-color'));
        } else {
            series.attr('display', 'none');
            selector.style('background-color', 'white');
        }
    }
}
