<template>
  <div class="index">
    <LeftMenu></LeftMenu>
    <HeadNav></HeadNav>
    <div class="rightContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from "../components/LeftMenu";
import HeadNav from "../components/HeadNav";

export default {
  name: "index",
  components: {
    LeftMenu,
    HeadNav
  }
};
</script>
<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.rightContainer {
  position: relative;
  top: 0;
  left: 180px;
  width: calc(100% - 180px);
  height: calc(100% - 71px);
  overflow: auto;
}
</style>

