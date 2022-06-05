import React, { Component } from 'react';
// import StatusChart from "./charts/status-chart.component";
// import PriorityChart from "./charts/priority-chart.component";
// import TypeChart from "./charts/type-chart.component";
import IncidentList from "./incidents/incident-list.component";

export default class Dashboard extends Component {
    render() {
        return(
            <div className="table table-bordered">
                    <IncidentList />
            </div>
        );
    }
}