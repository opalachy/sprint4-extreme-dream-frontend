
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
  mounted() {
      console.log(this.cData)
      this.chartdata.labels = this.cLabels
      this.chartdata.datasets[0].data = this.cData
    this.renderChart(this.chartdata, this.options);
  },
};
</script>