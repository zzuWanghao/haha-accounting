<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
// import echarts, {EChartsOption, ECharts} from 'echarts';
import * as echarts from 'echarts';
console.log(666);
console.log(echarts);
console.log(666);


@Component
export default class Chart extends Vue {
  @Prop() options?: any;
  chart?: any;

  mounted() {
    if (this.options === undefined) {
      return console.error('options 为空');
    }

    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }

  @Watch('options')
  onOptionsChange(newValue: any) {
    this.chart!.setOption(newValue);
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  height: 400px;
}
</style>
