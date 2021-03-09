<template>
  <div>
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="triangle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="page-section">
      <div class="full-width-screen">
        <div class="container-fluid p-0">
          <div class="particles-bg" >
            <div class="content-detail">
              <h1 class="global-title">
                <span>4</span>
                <span>0</span>
                <span>4</span>
              </h1>
              <h4 class="sub-title">Oops!</h4>
              <p class="detail-text">
                We\'re sorry, <br />The page you were looking for doesn\'t exist
                anymore.
              </p>
              <div class="back-btn">
                <router-link to="/home" class="btn">Back to Home </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {};
  },
  components: {},
  methods: {},
  mounted() {},
};
</script>

<style scoped>
#particles-js {
  height: 100vh;
  background-image: url("../assets/img/background.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: overlay;
  background-color: rgba(0, 0, 0, 0.85);
}
.page-section .particles-bg .particles-js-canvas-el {
  position: relative;
}
.page-section .content-detail {
  margin: auto;
  max-width: 450px;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.page-section .content-detail .sub-title,
.page-section .content-detail .detail-text {
  display: block;
  color: #fff;
  text-align: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.page-section .content-detail .sub-title {
  margin-bottom: 15px;
  font-weight: 600;
  font-size: 30px;
}
.page-section .content-detail .global-title {
  display: block;
  color: #fff;
  font-size: 150px;
  font-weight: 800;
  opacity: 0.5;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.page-section .content-detail .global-title span {
  animation: animateblur 1s linear forwards;
}
.page-section .content-detail .global-title span:nth-child(1) {
  animation-delay: 1s;
}
.page-section .content-detail .global-title span:nth-child(2) {
  animation-delay: 2s;
}
.page-section .content-detail .global-title span:nth-child(3) {
  animation-delay: 3s;
}
@keyframes animateblur {
  0% {
    opacity: 0;
    filter: blur(10px);
  }
  100% {
    opacity: 1;
    filter: blur(0px);
  }
}
.page-section .content-detail .back-btn {
  margin-top: 30px;
  z-index: 5;
}
.page-section .content-detail .back-btn .btn {
  padding: 8px 15px;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 30px;
  font-size: 14px;
}
.page-section .content-detail .back-btn .btn:hover {
  background-color: #5076db;
  color: #fff;
}
</style>