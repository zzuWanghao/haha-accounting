declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
declare module '*.svg' {

  import { VNode } from 'vue';

  // DON'T DECLARE THIS INSIDE GLOBAL MODULE
  type Svg = VNode;

  const content: Svg;
  export default content;
}