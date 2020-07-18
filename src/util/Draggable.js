// This file enables dragging for components
// Components must have a positions object with { clientX, clientY, movementX, movementY } values
export default {
  methods: {
    dragMouseDown ($event) {
      // event.preventDefault()
      // get the mouse cursor position at startup:
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY
      document.onmousemove = this.elementDrag
      document.onmouseup = this.closeDragElement
    },
    elementDrag: function (event) {
      // event.preventDefault()
      this.positions.movementX = this.positions.clientX - event.clientX
      this.positions.movementY = this.positions.clientY - event.clientY
      this.positions.clientX = event.clientX
      this.positions.clientY = event.clientY

      // set the element's new position:
      this.$refs.winapp.style.marginTop = (this.$refs.winapp.offsetTop - this.positions.movementY) + 'px'
      this.$refs.winapp.style.marginLeft = (this.$refs.winapp.offsetLeft - this.positions.movementX) + 'px'
    },
    closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  }
}
