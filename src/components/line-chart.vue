
<script>


import VueCharts from 'vue-chartjs'
import { Bar, Line } from 'vue-chartjs'

export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: []
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
      console.log(this.chartdata)
    this.renderChart(this.chartdata, this.options)
  }
}
</script>