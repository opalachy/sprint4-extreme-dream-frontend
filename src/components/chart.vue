

<script>
import { Bar } from 'vue-chartjs'

export default {
    props:['dataExp', 'expTitle'],
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['A', 'B'],
      datasets: [
        {
          label: 'Number of participant in experience',
          backgroundColor: '#f87979',
          data: []
        }
      ]
    },
    options: {
      responsive: false,
      maintainAspectRatio: true
    },
    
  }),

  mounted () {
    this.chartdata.labels = this.expTitle
    this.chartdata.datasets[0].data = this.dataExp
    this.renderChart(this.chartdata, this.options)
    },
  created(){
  }

}
</script>

