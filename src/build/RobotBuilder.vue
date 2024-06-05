<template>
  <div class="content" v-if="partsStore.parts">
    <div class="preview">
      <CollapsibleSection>
        <template v-slot:collapse>&#x25B2; Hide</template>
        <template v-slot:expand>&#x25BC; Preview</template>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.imageUrl" alt="head" />
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.imageUrl" class="rotate-left" alt="left arm" />
            <img :src="selectedRobot.torso.imageUrl" alt="torso" />
            <img :src="selectedRobot.rightArm.imageUrl" class="rotate-right" alt="right arm" />
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.imageUrl" alt="base" />
          </div>
        </div>
      </CollapsibleSection>
      <button class="add-to-cart" @click="addToCart()">Add to Cart</button>
    </div>
    <div class="top-row">
      <div class="robot-name">
        {{ selectedRobot.head.title }}
        <span class="sale" v-if="selectedRobot.head.onSale">Sale!</span>
      </div>
      <PartSelector
        :parts="partsStore.parts.heads"
        position="top"
        @part-selected="part => selectedRobot.head = part"
      />
    </div>
    <div class="middle-row">
      <PartSelector
        :parts="partsStore.parts.arms"
        position="left"
        @part-selected="part => selectedRobot.leftArm = part"
      />
      <PartSelector
        :parts="partsStore.parts.torsos"
        position="center"
        @part-selected="part => selectedRobot.torso = part"
      />
      <PartSelector
        :parts="partsStore.parts.arms"
        position="right"
        @part-selected="part => selectedRobot.rightArm = part"
      />
    </div>
    <div class="bottom-row">
     <PartSelector
      :parts="partsStore.parts.bases"
      position="bottom"
      @part-selected="part => selectedRobot.base = part"
    />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';
import { useCartStore } from '../stores/cartStore';
import { usePartsStore } from '../stores/partsStore';

const cartStore = useCartStore();
const partsStore = usePartsStore();

partsStore.getParts();

const selectedRobot = ref({
  head: {},
  leftArm: {},
  rightArm: {},
  torso: {},
  base: {},
});
const headBorderClass = computed(() => (selectedRobot.value.head.onSale ? 'red' : '#aaa'));
const addToCart = () => {
  const robot = selectedRobot.value;
  const cost = robot.head.cost +
    robot.leftArm.cost +
    robot.torso.cost +
    robot.rightArm.cost +
    robot.base.cost;
  cartStore.cart.push({ ...robot, cost });
};
</script>

<style scoped>
.part {
  position: relative;
  width: 200px;
  height: 200px;
  border: 3px solid #aaa;
}

.part.top {
  border: 3px solid v-bind('headBorderClass');
}

.sale-border {
  border: 3px solid red;
}

.part img {
  width: 200px;
}

.top-row {
  display: flex;
  justify-content: space-around;
}

.middle-row {
  display: flex;
  justify-content: center;
}

.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}

.top {
  border-bottom: none;
}

.left {
  border-right: none;
}

.right {
  border-left: none;
}

.left img {
  transform: rotate(-90deg);
}

.right img {
  transform: rotate(90deg);
}

.bottom {
  border-top: none;
}

.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 206px;
}

.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 206px;
}

.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}

.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 179px;
  height: 25px;
}

.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 179px;
  height: 25px;
}

.right .next-selector {
  right: -3px;
}

.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}

.sale {
  color: red;
}

.content {
  position: relative;
}

.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 100px;
  height: 100px;
  padding: 5px;
}

.preview-content {
  border: 0px solid #999;
}

.preview img {
  width: 50px;
  height: 50px;
}

.rotate-right {
  transform: rotate(90deg);
}

.rotate-left {
  transform: rotate(-90deg);
}

.add-to-cart {
  position: absolute;
  width: 100px;
  padding: 3px;
  font-size: 16px;
  margin-top: 6px;
}

td,
th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}

.cost {
  text-align: right;
}
</style>
