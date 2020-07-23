<template>
  <div class="rating-stars">
    <div class="no-ratings" v-if="rating == 0">
      <div class="star no-fill" v-for="(star, index) in this.maxStars" :key="index">
        <font-awesome-icon :icon="['fa', 'star']" />
      </div>
    </div>

    <div v-if="rating > 0">
      <div v-for="(star, index) in this.maxStars" :key="index" class="star" :style="{ color: color, fontSize: size + 'em' }">
        <font-awesome-icon :icon="['fa', 'star']" v-if="(index+1) <= rating" />
        <font-awesome-icon :icon="['fa', 'star-half']" v-if="isHalfStar(index)" />
        <font-awesome-icon :icon="['fa', 'star']" class="no-fill" v-if="isEmptyStar(index)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rating-stars",
  props: {
    rating: {
      type: Number,
      default: 2.5,
      required: false
    },
    color: {
      type: String,
      default: 'rgb(255, 187, 0)',
      required: false
    },
    size: {
      type: Number,
      default: '.8',
      required: false
    }
  },
  components: {},
  data() {
    return {
      maxStars: 5
    };
  },
  methods: {
    isHalfStar(pos) {
      pos++;
      if (this.rating > pos - 1 && this.rating < pos) {
        return true;
      }
      return false;
    },
    // Returns true if there should be an empty star at a given position
    isEmptyStar(index) {
      if ((index+1) > this.rating && index <= this.maxStars && ((index + 1) - this.rating) >= 1) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped lang="scss">
.rating-stars {
  display: flex;
  padding: 5px 0px 5px 0px;
}
.star {
  margin-right: 5px;
  color: $orange;
  transition: 0.12s;
  font-size: 0.8em;
}

.no-fill {
  color: $lighter-grey;
}
</style>
