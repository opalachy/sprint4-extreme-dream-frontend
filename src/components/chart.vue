

<script>
import { Bar } from 'vue-chartjs'

export default {
    props:['dataExp', 'expTitle'],
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['jan', 'feb', 'mar'],
      datasets: [
        {
          label: 'Number of participant in experience',
          backgroundColor: '#f87979',
          data: [10,20,30]
        }
      ]
    },
    options: {
      responsive: false,
      maintainAspectRatio: true
    },
    
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  },

}
</script>

