<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['January', 'February' ,'rrrr'],
      datasets: [
        {
        barPercentage: 0.8,
        barThickness: 50,
        maxBarThickness: 60,
        minBarLength: 1,
        data: [10, 20, 30, 40, 50, 60, 70]
        },
        // {
        //   label: 'February',
        //   backgroundColor: '#f87979',
        //   data: [10, 20]
        // },
        // {
        //   label: 'rrrr',
        //   backgroundColor: '#f87979',
        //   data: [15, 20]
        // }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
canvas#bar-chart{
  width: 500px;
  height: 350px;
}
</style>