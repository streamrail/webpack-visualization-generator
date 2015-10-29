import React from 'react';
import Chart from './components/chart';
import ChartDetails from './components/chart-details';
import Breadcrumbs from './components/breadcrumbs';
import addDragDrop from './util/dragdrop';
import readFile from './util/readFile';
import buildHierarchy from './buildHierarchy';

export default React.createClass({
    
    getInitialState() {
        return {
            needsUpload: true,
            dragging: false,
            chartData: null,
            hoverDetails: null,
            breadcrumbNodes: [],
            paddingDiff: 0
        };
    },
    
    componentDidMount() {
        addDragDrop({
            el: this.refs.ChartArea,
            callback: file => {
                readFile(file, this.handleFileUpload);
            },
            onDragStart: () => {
                this.setState({
                    dragging: true
                });
            },
            onDragEnd: () => {
                this.setState({
                    dragging: false
                });
            }
        });

        this.loadJSON();
    },
    
    chartAreaClick() {
        if (this.state.needsUpload) {
            this.refs.FileInput.click();
        }
    },
    
    onFileChange(ev) {
        readFile(ev.target.files[0], this.handleFileUpload);
    },
    
    handleFileUpload(jsonText) {
        var json = typeof jsonText === 'string' ? JSON.parse(jsonText) : jsonText;
        
        this.setState({
            needsUpload: false,
            chartData: buildHierarchy(json)
        });
    },
    
    loadJSON() {
        this.setState({
            loading: true
        });
        if (typeof window.STATS_JSON === 'string') {
            let request = new XMLHttpRequest();
            request.open('GET', 'stats.json', true);
            
            request.onload = () => {
                this.setState({
                    loading: false
                });
                
                if (request.status >= 200 && request.status < 400) {
                    this.handleFileUpload(request.response);
                }
            };
            
            request.send();
        } else {
            this.handleFileUpload(window.STATS_JSON || {});
        }
        
    },
    
    onChartRender(details) {
        this.setState({
            paddingDiff: details.removedTopPadding
        });
    },
    
    onChartHover(details) {
        this.setState({
            hoverDetails: details,
            breadcrumbNodes: details.ancestorArray
        });
    },
    
    onChartUnhover() {
        this.setState({
            hoverDetails: null,
            breadcrumbNodes: []
        });
    },
    
    render() {
        var chartAreaClass = 'chart';
        
        if (this.state.chartData && this.state.chartData.maxDepth > 9) {
            chartAreaClass += ' chart--large';
        }
                
        return (
            <div>
                <div ref="ChartArea" className={chartAreaClass} onClick={this.chartAreaClick}>
                    <ChartDetails details={this.state.hoverDetails} topMargin={this.state.paddingDiff} />
                    <Chart
                        data={this.state.chartData}
                        onHover={this.onChartHover}
                        onUnhover={this.onChartUnhover}
                        onRender={this.onChartRender}
                    />
                </div>
                
                <Breadcrumbs nodes={this.state.breadcrumbNodes} />
            </div>
        );
    }
});
