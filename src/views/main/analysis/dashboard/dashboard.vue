<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <template v-for="item in amountList" :key="item.amount">
        <el-col :span="6" :xs="24" :sm="12" :md="8" :lg="6">
          <count-card v-bind="item" />
        </el-col>
      </template>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="7">
        <chart-card>
          <pieEchartVue :pie-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
      <el-col :span="10">
        <chart-card>
          <mapEchartVue :map-data="showGoodsAdressSale" />
        </chart-card>
      </el-col>
      <el-col :span="7">
        <chart-card>
          <roseEchartVue :rose-data="showGoodsCategoryCount" />
        </chart-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <chart-card>
          <lineEchartVue v-bind="showGoodsCategorySale" />
        </chart-card>
      </el-col>
      <el-col :span="12">
        <chart-card>
          <barEchartVue v-bind="showGoodsCategoryFavor" />
        </chart-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import CountCard from './components/count-card/count-card.vue'
import ChartCard from './components/chart-card/chart-card.vue'
import useAnalysisStore from '@/store/main/analysis/analysis'
import { storeToRefs } from 'pinia'

import {
  pieEchartVue,
  lineEchartVue,
  roseEchartVue,
  barEchartVue,
  mapEchartVue
} from '@/components/page-echarts'
import { computed } from 'vue'

// 发起请求
const analysisStore = useAnalysisStore()
analysisStore.fetchAnalysisDataAction()

// 从store中获取数据
const { amountList, goodsCategoryCount, goodsCategorySale, goodsCategoryFavor, goodsAddressSale } =
  storeToRefs(analysisStore)

// 获取数据
const showGoodsCategoryCount = computed(() => {
  return goodsCategoryCount.value.map((item) => {
    return { name: item.name, value: item.goodsCount }
  })
})

const showGoodsCategorySale = computed(() => {
  const labels = goodsCategorySale.value.map((item) => item.name)
  const values = goodsCategorySale.value.map((item) => item.goodsCount)

  return { labels, values }
})

const showGoodsCategoryFavor = computed(() => {
  const labels = goodsCategoryFavor.value.map((item) => item.name)
  const values = goodsCategoryFavor.value.map((item) => item.goodsFavor)

  return { labels, values }
})

const showGoodsAdressSale = computed(() => {
  return goodsAddressSale.value.map((item) => ({
    name: item.address,
    value: item.count
  }))
})
</script>

<style lang="less" scoped>
.el-row {
  padding-bottom: 10px;
}

.echart {
  height: 250px;
}
</style>
