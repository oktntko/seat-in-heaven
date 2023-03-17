<template>
  <div class="p-8">
    <!-- パンくず -->
    <nav class="mb-8 flex" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <p class="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-400">
            <Icon class="mr-2 h-4 w-4" icon="clarity:users-solid" />
            ユーザ管理
          </p>
        </li>
        <li>
          <div class="flex items-center">
            <Icon class="h-4 w-4 text-gray-400" icon="el:chevron-right" />
            <p class="ml-1 text-sm font-medium text-gray-700 dark:text-gray-400 md:ml-2">
              ユーザ一覧
            </p>
          </div>
        </li>
      </ol>
    </nav>
    <div class="z-10 w-44 divide-y divide-gray-100 rounded bg-white shadow dark:bg-gray-700">
      <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefault">
        <li>
          <a
            href="#"
            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Settings
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Earnings
          </a>
        </li>
        <li>
          <a
            href="#"
            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </a>
        </li>
      </ul>
    </div>
    <!-- メインコンテンツ -->
    <div class="flex gap-8">
      <!-- レイアウト -->
      <div class="flex flex-row justify-center">
        <div
          class="ruled-line relative max-h-[800px] min-h-[800px] min-w-[1440px] max-w-[1440px] overflow-auto border"
        >
          <!-- 座席 -->
          <VueDraggableResizable
            v-for="object of objects"
            :key="object.id"
            class-name="border border-black absolute"
            class-name-active="border border-dashed border-black"
            :w="object.width"
            :h="object.height"
            :min-width="5"
            :min-height="5"
            :x="object.x"
            :y="object.y"
            :z="object.z"
            :on-drag="(x, y) => onDragCallback(x, y, object)"
            :on-resize="
              (handle, x, y, width, height) => onResizeCallback(handle, x, y, width, height, object)
            "
            :grid="[20, 20]"
            parent
          >
            <div class="h-full w-full bg-white opacity-80" @click.right.prevent="openmenu"></div>
          </VueDraggableResizable>

          <!-- 仕切り -->
          <VueDraggableResizable
            class-name="border border-transparent absolute"
            class-name-active="!border border-dashed border-black"
            :w="10"
            :h="100"
            :min-width="5"
            :min-height="5"
            :x="10"
            :y="10"
            :z="10"
            :grid="[5, 5]"
            parent
            :handles="['tm', 'bm', 'ml', 'mr']"
          >
            <div class="h-full w-full bg-gray-500"></div>
          </VueDraggableResizable>

          <!-- ロッカー -->
          <VueDraggableResizable
            class-name="border border-transparent absolute"
            class-name-active="border border-dashed border-black"
            :w="40"
            :h="40"
            :min-width="5"
            :min-height="5"
            :x="10"
            :y="10"
            :z="10"
            :grid="[5, 5]"
            parent
          >
            <Icon class="h-full w-full" icon="bi:door-open-fill"></Icon>
          </VueDraggableResizable>
        </div>
      </div>

      <!-- メニュー -->
      <div class="w-64">
        <ul>
          <li>
            <p
              class="relative flex h-11 items-center border-transparent pr-6 text-sm text-gray-500"
            >
              <Icon class="h-5 w-5" icon="clarity:deploy-line" flip="horizontal" />
              <span class="ml-2 truncate tracking-wide">配置する</span>
            </p>
          </li>
          <ul class="pl-2">
            <li>
              <p
                class="relative flex h-8 items-center border-transparent pr-6 text-sm text-gray-500"
              >
                <span class="truncate tracking-wide">予約可能</span>
              </p>
            </li>
            <ul class="ml-2">
              <li>
                <button
                  class="relative flex h-10 items-center border-transparent pr-6 text-gray-700"
                  @click="addObject('ZASEKI')"
                >
                  <Icon class="h-5 w-5" icon="icon-park-solid:massage-table" />
                  <span class="ml-2 truncate tracking-wide">座席</span>
                </button>
              </li>
              <li>
                <button
                  class="relative flex h-10 items-center border-transparent pr-6 text-gray-700"
                >
                  <Icon class="h-5 w-5" icon="arcticons:locker-2" />
                  <span class="ml-2 truncate tracking-wide">ロッカー</span>
                </button>
              </li>
              <li>
                <button
                  class="relative flex h-10 items-center border-transparent pr-6 text-gray-700"
                >
                  <Icon
                    class="h-5 w-5"
                    icon="healthicons:group-discussion-meetingx3"
                    flip="horizontal"
                  />
                  <span class="ml-2 truncate tracking-wide">会議室</span>
                </button>
              </li>
            </ul>
            <li>
              <p
                class="relative flex h-8 items-center border-transparent pr-6 text-sm text-gray-500"
              >
                <span class="truncate tracking-wide">装飾</span>
              </p>
            </li>
            <ul class="ml-2">
              <li>
                <button
                  class="relative flex h-10 items-center border-transparent pr-6 text-gray-700"
                >
                  <Icon class="h-5 w-5" icon="ci:line-l" />
                  <span class="ml-2 truncate tracking-wide">仕切り線</span>
                </button>
              </li>
              <li>
                <button
                  class="relative flex h-10 items-center border-transparent pr-6 text-gray-700"
                >
                  <Icon class="h-5 w-5" icon="cil:room" />
                  <span class="ml-2 truncate tracking-wide">扉</span>
                </button>
              </li>
              <li>
                <button
                  class="relative flex h-10 items-center border-transparent pr-6 text-gray-700"
                >
                  <Icon class="h-5 w-5" icon="icon-park-solid:block-three" />
                  <span class="ml-2 truncate tracking-wide">スペース</span>
                </button>
              </li>
            </ul>
          </ul>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// レイアウト編集
// 固定席設定
// 予約
import Vue from "vue";
import VueDraggableResizable from "vue-draggable-resizable";

import "vue-draggable-resizable/dist/VueDraggableResizable.css";

export default Vue.extend({
  components: {
    VueDraggableResizable,
  },
  data() {
    return {
      seats: [],
      objects: [
        {
          id: 1,
          width: 40,
          height: 60,
          x: 10,
          y: 10,
          z: 1,
        },
        {
          id: 2,
          width: 140,
          height: 100,
          x: 50,
          y: 50,
          z: 1,
        },
      ],
    };
  },
  methods: {
    add() {
      this.seats.push();
    },
    onDragCallback(x: number, y: number, object: any) {
      console.log(x, y, object);
      object.x = x;
      object.y = y;
    },
    onResizeCallback(
      handle: string,
      x: number,
      y: number,
      width: number,
      height: number,
      object: any
    ) {
      console.log(handle, "x", x, "y", y, "width", width, "height", height, object);
      object.width = width;
      object.height = height;
      object.x = x;
      object.y = y;
    },
    openmenu(e: PointerEvent) {
      console.log(e);
    },
    copyObject(obj: {
      id: number;
      width: number;
      height: number;
      x: number;
      y: number;
      z: number;
    }) {
      this.objects.push({
        id: this.objects.length + 1,
        width: obj.width,
        height: obj.height,
        x: obj.x + 20,
        y: obj.y + 20,
        z: 1,
      });
    },
    addObject() {
      this.objects.push({
        id: this.objects.length + 1,
        width: 70,
        height: 60,
        x: 10,
        y: 10,
        z: 1,
      });
    },
  },
});
</script>

<style scoped>
.ruled-line {
  background: linear-gradient(-90deg, rgba(0, 0, 0, 0.1) 1px, transparent 0px) 10px 10px / 20px 20px,
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 0px) 10px 10px / 20px 20px;
}
</style>
