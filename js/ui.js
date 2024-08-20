//スクロール固定オブジェクトセット
const bodyScroll = {
  scrollY: 0,

  styles: {
    position: 'fixed',
    left: 0,
    width: '100%',
    boxSizing: 'border-box',
  },

  fixed: function (isFixed) {
    //スクロール固定
    if (isFixed) {
      this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
      this.styles.top = (this.scrollY * -1) + 'px';
      this.styles.paddingRight = (window.innerWidth - document.body.clientWidth) + 'px'
      Object.keys(this.styles).forEach(function (key) {
        document.body.style[key] = this.styles[key];
      }.bind(this));


    } else {

      Object.keys(this.styles).forEach(function (key) {
        document.body.style[key] = '';
      });

      window.scrollTo(0, this.scrollY);
    }
  }
};