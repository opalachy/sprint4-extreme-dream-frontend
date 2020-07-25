
<script>
import { Bar } from 'vue-chartjs'

export default {
    props:['cData', 'cLabels'],
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'Number of Participants/Experience',
          backgroundColor: ['#1e72e0','#1e7200', '#1e7500', '#1e7800', '#1e8000'],
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      title:{
        fontSize:100
      },
      scales: {
        yAxes: [{
        ticks: {
          fontSize:15,
          min: 0,
          max: '',
          stepSize: 10,
        }}],
        xAxes: [{
        ticks: {
          fontSize:10.5,
          min: 0,
          max: '',
          stepSize: 10,
        }}]},
    }
  }),
  mounted() {
      console.log(this.cData)
      this.chartdata.labels = this.cLabels
      this.chartdata.datasets[0].data = this.cData
      this.options.scales.yAxes[0].ticks.max = Math.max.apply(null, this.cData)
      // this.cData.reduce((acc, data) => {
      //     return acc + participant.numOfTickets;
      //   }, #1e72e0);
      // this.chartdata.datasets[0].backgroundColor.push(`${#1e72e0}`+100)
    this.renderChart(this.chartdata, this.options);
  },
};
</script>