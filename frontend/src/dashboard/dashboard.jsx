import React from 'react'
import {connect} from 'react-redux'
import {withCookies} from "react-cookie"
import {withRouter} from "react-router-dom"
import {withMediaQuery} from "../common/media"
import {Container} from "@mui/material"
import PropTypes from "prop-types"
import * as actions from "./action"
import { ResponsiveBar } from '@nivo/bar'
import * as exampleData from './exampleData.json'

class Dashboard extends React.Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
        documentation: PropTypes.object,
        loadDocumentation: PropTypes.func.isRequired
    }

    static defaultProps = {
        documentation: null
    }

    componentDidMount() {
        // if (this.props.documentation === null) {
        //     this.props.loadDocumentation(this.props.user.documentationId)
        // }
        this.props.loadDocumentation(this.props.user.documentationId)
    }

    render() {

        const documentationContent = this.props.documentation ? JSON.stringify(this.props.documentation) : 'Documentation not available';


        return (
            <Container>
                {this.MyResponsiveBar({data: exampleData})}
                <div>
                    <p>Dashboard page</p>
                    <p>Documentation:</p>
                    <pre>{documentationContent}</pre>
                </div>
            </Container>
        )
    }

    MyResponsiveBar = ({ data /* see data tab */ }) => (
        <ResponsiveBar
            data={data}
            keys={[
                'hot dog',
                'burger',
                'sandwich',
                'kebab',
                'fries',
                'donut'
            ]}
            indexBy="country"
            margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={{ scheme: 'nivo' }}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10
                }
            ]}
            fill={[
                {
                    match: {
                        id: 'fries'
                    },
                    id: 'dots'
                },
                {
                    match: {
                        id: 'sandwich'
                    },
                    id: 'lines'
                }
            ]}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32,
                truncateTickAt: 0
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40,
                truncateTickAt: 0
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        1.6
                    ]
                ]
            }}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
        />
    )

}

export default connect((state) => ({
    user: state.auth.userData,
    documentation: state.documentation.documentation
}), actions)(withCookies(withRouter(withMediaQuery(Dashboard))))
