import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.drawBarChart();
    this.drawPieChart();
  }

  drawBarChart() {
    const canvas = <HTMLCanvasElement>document.getElementById('barChart');
    const ctx:any = canvas.getContext('2d');
    const data = [150, 200, 250, 300, 350];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
    
    canvas.width = 400;
    canvas.height = 300;
    
    if (ctx) {
      ctx.fillStyle = '#4CAF50';

      data.forEach((value, index) => {
        ctx.fillRect(index * 70 + 30, 300 - value, 40, value); // draw bars
        ctx.fillStyle = '#333';
        ctx.fillText(labels[index], index * 70 + 35, 290); // add labels
      });
    }
    
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if within any bar
      data.forEach((value, index) => {
        const barX = index * 70 + 30;
        if (x >= barX && x <= barX + 40 && y >= 300 - value) {
          ctx.fillStyle = '#FFC107';
          ctx.fillRect(barX, 300 - value, 40, value);
          ctx.fillStyle = '#333';
          ctx.fillText(labels[index] + ': $' + value * 100, barX, 50); // Show tooltip
        }
      });
    });
  }

  drawPieChart() {
    const canvas = <HTMLCanvasElement>document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    const data = [40, 60, 100];
    const colors = ['#4CAF50', '#FFC107', '#FF5722'];
    const labels = ['Active', 'Inactive', 'Pending'];
    
    let total = data.reduce((a, b) => a + b, 0);
    let startAngle = 0;
    
    canvas.width = 400;
    canvas.height = 300;

    if (ctx) {
      data.forEach((value, index) => {
        const sliceAngle = (value / total) * 2 * Math.PI;
        ctx.beginPath();
        ctx.moveTo(150, 150);
        ctx.arc(150, 150, 100, startAngle, startAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        
        // Draw text on pie chart
        ctx.fillStyle = '#fff';
        const middleAngle = startAngle + sliceAngle / 2;
        const textX = 150 + Math.cos(middleAngle) * 60;
        const textY = 150 + Math.sin(middleAngle) * 60;
        ctx.fillText(labels[index], textX, textY);
        
        startAngle += sliceAngle;
      });
    }
  }
}
