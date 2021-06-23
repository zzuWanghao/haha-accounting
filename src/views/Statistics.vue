<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="typeList" :type.sync="type"/>

    <div class="createdAt">
      <FormItem field-name="日期"
                type="month"
                placeholder="在这里输入日期"
                :value.sync="createdAt"
      />
    </div>

    <div class="chart-wrapper" ref="chartWrapper">
      <Chart class="chart" :options="chartOptions"/>
    </div>

<!--    <Tabs class-prefix="interval" :data-source="intervalList" :type.sync="interval"/>-->
      <ol v-if="groupedList.length>0">
        <div class="total">
          <h2><span>总计:{{this.cost}}</span></h2>
        </div>
        <li v-for="(group,index) in groupedList" :key="index">
         <h3 class="title">{{beautify(group.title)}} <span>￥{{group.total}}</span></h3>
          <ol>
            <li  class="record" v-for="item in group.items" :key="item.id">
              <span>{{tagString(item.tags)}}</span>
              <span class="notes">{{item.notes}}</span>
              <span>￥{{item.amount}} </span>
            </li>
          </ol>
        </li>
      </ol>
    <div v-else class="no-result">

      <span>还没有相关记录哦</span>

    </div>
  </Layout>

</template>

<script lang="ts">
import Tabs from '@/components/Tabs.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import intervalList from '@/constans/intervalList';
import typeList from '@/constans/typeList';
import FormItem from '@/components/Money/FormItem.vue';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

import Chart from '@/components/Chart.vue';
import _ from 'lodash';
import day from 'dayjs';

@Component({
  components: {Tabs, Chart,FormItem},
})
export default class Statistics extends Vue{

  createdAt=dayjs().format('YYYY-MM')
 get recordList(){
   // eslint-disable-next-line no-undef
   return  (this.$store.state as RootState).recordList
 }
  get groupedList(){

    const {recordList} = this;


    const newList = clone(recordList)
        .filter(r => r.type === this.type&&dayjs(this.createdAt).isSame(dayjs(r.createdAt), 'month'))
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [];}
    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];


    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amount;
      }, 0);
    });
    this.cost = result.reduce((cost,t)=>{
      return cost + t.total
    },0)
    return result;

  }


  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();

    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join(',');
  }
  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    //div.scrollLeft = div.scrollWidth;
  }
  cost=0
  type='-'
  interval ='day'
  typeList = typeList
  intervalList = intervalList


  get keyValueList() {
    const today = new Date();
    const array = [];
    console.log(this.groupedList);
    // for (let i = 0; i <= 29; i++) {
    //   // this.recordList = [{date:7.3, value:100}, {date:7.2, value:200}]
    //   const dateString = day(today)
    //       .subtract(i, 'day').format('YYYY-MM-DD');
    //   const found = _.find(this.groupedList, {
    //     title: dateString
    //   });
    //   array.push({
    //     key: dateString, value: found ? found.total : 0
    //   });
    // }


    let dateString = dayjs(this.createdAt).startOf('month').format('YYYY-MM-DD');
    for (let i = 1 ;i<=dayjs(this.createdAt).daysInMonth();i++){
      const found = _.find(this.groupedList, {
        title: dateString
      });
      array.push({
        key: dateString, value: found ? found.total : 0
      });
      dateString =  dayjs(dateString).add(1, 'day').format('YYYY-MM-DD');

    }


    array.sort((a, b) => {
      if (a.key > b.key) {
        return 1;
      } else if (a.key === b.key) {
        return 0;
      } else {
        return -1;
      }
    });
    console.log('array');
    console.log(array);
    return array;
  }

  get chartOptions() {
    const keys = this.keyValueList.map(item => item.key);
    const values = this.keyValueList.map(item => item.value);
    console.log('values');
    console.log(values);
    return {
      grid: {
        top:50,
        left: 10,
        right: 10,
        bottom:50
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {alignWithLabel: true},
        axisLine: {lineStyle: {color: '#666'}},
        axisLabel: {
          formatter: function (value: string, index: number) {
            return value.substr(5);
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        symbol: 'circle',
        symbolSize: 10,
        itemStyle: {borderWidth: 1, color: '#666', borderColor: '#666'},
        // lineStyle: {width: 10},
        data: values,
        type: 'line'
      }],
      tooltip: {
        show: true, triggerOn: 'click',
        position: 'top',
        formatter: '{c}'
      }
    };
  }

}
</script>



<style lang="scss" scoped>
.total{
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.echarts {
  max-width: 100%;
  height: 400px;
}

.no-result{
  padding: 20px;
  text-align: center;
}
::v-deep >.tabs{
  .type-tabs-item{
    background: white;
    &.selected{
      background: #c4c4c4;
      &::after{
        display: none;
      }
    }
  }
  .interval-tabs-item{
    height: 48px;
    &.selected{

    }
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

.chart {
  width: 200%;
  &-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

</style>