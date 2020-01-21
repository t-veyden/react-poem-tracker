export default {
  data() {
    return {
      noTitle: false
    };
  },
  
  methods: {
    updateTitle(source) {
      if (this.noTitle) {
        const middle = this[source].text.length / 2;
        let firstLine = this[source].text
          .split('')
          .splice(0, middle)
          .join(''); // what if the text is huge? // what if it's tiny?
        firstLine = firstLine.replace(/(<.*?>)/g, '');
        firstLine =
          firstLine
            .split('')
            .splice(0, 20)
            .join('') + '...';

        this[source].title = firstLine;
      } else {
        this[source].title = '';
      }
    }
  }
};
