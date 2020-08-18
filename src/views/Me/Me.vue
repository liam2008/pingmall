<template>
  <div class="me">
    <select-login v-if="!userinfo.id" />
    <div v-else>
      <me-top />
    </div>
  </div>
</template>

<script>
import SelectLogin from 'components/Login/SelectLogin'
import MeTop from './MeTop'
import {mapState} from 'vuex'

export default {
  name: 'Me',
  data(){
    return {}
  },
  computed: {
    ...mapState(['userinfo'])
  },
  components: {
    SelectLogin,
    MeTop
  },
  created(){},
  mounted(){},
  methods: {}
}
</script>

<style lang="scss" scoped>
.me {
  background: #f5f5f5;
  width: 100%;
  height: 100%;
}
</style>
