<template>
  <div id="scichart-root"></div>
</template>

<script setup>
import {onMounted} from "vue";
import {initSciChart} from "./utils/scichart";
import {filterDataByTime} from "./utils/dataset";
import {getData} from "../api";

onMounted(async () => {
  const data = await getData();
  await initSciChart(filterDataByTime(data));
});

</script>

<style>
#scichart-root {
  width: 800px;
  height: 500px;
  margin: auto;
}
</style>
