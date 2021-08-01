<template>
  <div class="home">
    <!-- 数据 -->
    <header>
      <div class="data">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-home-orders"></use>
        </svg>
        <div class="data-name">
          <h3>总订单</h3>
          <p>999999</p>
        </div>
      </div>
      <div class="data">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-home-moneys"></use>
        </svg>
        <div class="data-name">
          <h3>总销售额</h3>
          <p>999999</p>
        </div>
      </div>
      <div class="data">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-home-order"></use>
        </svg>
        <div class="data-name">
          <h3>今日订单数</h3>
          <p>999999</p>
        </div>
      </div>
      <div class="data">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-home-money"></use>
        </svg>
        <div class="data-name">
          <h3>今日销售额</h3>
          <p>999999</p>
        </div>
      </div>
    </header>

    <!-- 图表 -->
    <main ref="table"></main>
  </div>
</template>

<script>
import iconfont from "../../../assets/fonts/iconfont";
import * as echarts from "echarts";

export default {
  mounted() {
    var myChart = echarts.init(this.$refs.table);
    var option = {
      title: {
        text: "折线图堆叠",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["邮件营销", "联盟广告"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "邮件营销",
          type: "line",
          stack: "总量",
          data: [120, 132, 101, 134, 90, 230, 210],
        },
        {
          name: "联盟广告",
          type: "line",
          stack: "总量",
          data: [220, 182, 191, 234, 290, 330, 310],
        },
      ],
    };
    // 把核心配置参数 噻进去
    myChart.setOption(option);
  },
};
</script>

<style lang="less" scoped>
.home {
  // 数据
  header {
    display: flex;

    justify-content: space-between;

    .data {
      display: flex;

      padding: 25px;
      width: 240px;
      height: 120px;

      background-color: #fff;

      justify-content: space-between;
      align-items: center;

      .icon {
        font-size: 70px;
      }

      .data-name {
        text-align: center;

        h3 {
          font: normal 22px/35px "微软雅黑";

          color: #a8a8a8;
        }

        p {
          font: bold 22px/35px "微软雅黑";
        }
      }
    }
  }

  // 图表
  main {
    margin-top: 40px;
    padding: 20px;
    height: 500px;

    background-color: #fff;
  }

  // 字体图标
  .icon {
    overflow: hidden;

    width: 1em;
    height: 1em;

    vertical-align: -0.15em;

    fill: currentColor;
  }
}
</style>
