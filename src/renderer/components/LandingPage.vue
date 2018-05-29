<template>
  <div>
    <Row type="flex" class="div-line1">
      <i-col span="8">
        <img class="img-logo" v-bind:src="prImg" alt="">
      </i-col>
      <i-col span="8">
      </i-col>
      <i-col span="8">
      </i-col>
    </Row>
    <Row type="flex" class="div-line2">
      <i-col span="8">
      </i-col>
      <i-col span="8">
      </i-col>
      <i-col span="8">
      </i-col>
    </Row>
    <Row type="flex" class="div-line3">
      <i-col span="8">
      </i-col>
      <i-col span="8">
      </i-col>
      <i-col span="8">
      </i-col>
    </Row>
    <!-- <Row class="row-principal" type="flex">
      <i-col span="8">
        <div class="div-line1">
          
        </div>
      </i-col>
      <i-col span="8">
        <div class="div-line1"></div>
        <div class="div-line2"></div>
        <div class="div-line3"></div>
      </i-col>
      <i-col span="8">
        <div class="div-line1"></div>
        <div class="div-line2"></div>
        <div class="div-line3"></div>
      </i-col>
    </Row> -->
  </div>
</template>

<script>
  export default {
    name: 'LandingPage',
    data () {
      return {
        prImg: 'static/img/bacillumuilogo-500x48.png',
        prHeight: 48
      }
    },
    created () {

    }
  }
</script>

<style>
  .row-principal{
    padding: 20px;
  }
  .div-line1{
    padding: 10px;
    background-color: red;
  }
  .div-line2{
    height: 40px;
    background-color: blue;
  }
  .div-line3{
    /* height: 300px; */
    background-color: green;
  }
  .img-logo{
    width: 100%;
    vertical-align: middle;
  }
</style>
