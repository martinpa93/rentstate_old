import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Income, Outgoing } from '../core/models/contability';
import { movements } from 'src/assets/mocks/contability';

@Component({
  selector: 'app-contability',
  templateUrl: './contability.component.html',
  styleUrls: ['./contability.component.scss']
})
export class ContabilityComponent implements OnInit {

  // Charts

  lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40,65, 59, 80, 81, 56, 55, 40], label: 'Ingresos' },
  ];
  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June', ['July','Agosto'], 'January', 'February', 'March', 'April', 'May', 'June', 'July','January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions: (ChartOptions) = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0
      }
    },
    tooltips: {
      mode: 'nearest'
    }
  };
  lineChartColors: Color[] = [
    {
      borderWidth: 3,
      borderColor: 'red',
      backgroundColor: 'rgba(0,0,0,0)',
      pointBackgroundColor: 'white',
      pointRadius: 4,
      pointHoverRadius: 7
    },
  ];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];

  moves: Income | Outgoing [] = movements;


  constructor() { }

  ngOnInit(): void {
  }

}
