// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';

/**
 * 引入具体的模块
 * http://ecomfe.github.io/echarts/doc/doc.html#引入ECharts1
 */
import 'echarts/lib/component/axis';
import 'echarts/lib/chart/line';


let LineChartComponent = {
  templateUrl: 'app/components/line-chart/chart.html',
  bindings: {
    width: '=',
    height: '='
  },
  controller: function ($timeout, $interval, $element) {
    'ngInject';

    let $ctrl = this;

    let container = angular.element('.line-chart', $element[0])[0];

    $ctrl.$onInit = function () {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(container);

      function randomData() {
        now = new Date(+now + oneDay);
        value = value + Math.random() * 21 - 10;
        return {
          name: now.toString(),
          value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'),
            Math.round(value)
          ]
        }
      }

      var data = [];
      var now = +new Date(1997, 9, 3);
      var oneDay = 24 * 3600 * 1000;
      var value = Math.random() * 1000;
      for (var i = 0; i < 1000; i++) {
        data.push(randomData());
      }

      var option = {
        title: {
          text: '动态数据 + 时间坐标轴'
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0];
            var date = new Date(params.name);
            return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '模拟数据',
          type: 'line',
          showSymbol: false,
          hoverAnimation: false,
          data: data
        }]
      };

      $interval(function () {

        for (var i = 0; i < 5; i++) {
          data.shift();
          data.push(randomData());
        }

        myChart.setOption(option);

      }, 1000);

    }

  }
};

export {
  LineChartComponent
};