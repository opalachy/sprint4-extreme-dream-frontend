

<script>
import { Bar } from 'vue-chartjs'

export default {
    props:['dataExp', 'expTitle'],
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: '',
      datasets: [
        {
          label: 'Number of participant in experience',
          backgroundColor: '#f87979',
          data: '',
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
  created(){
    this.chartdata.labels = this.dataExp
    this.chartdata.datasets.data = this.expTitle
  }

}
</script>

