import Vue from 'vue';
import Component from 'vue-class-component';

export interface Author {
  name: string;
  id: string;
}

export interface RootObject {
  author: Author;
  title: string;
  text: string;
  completed: boolean;
  in_progress: boolean;
  lang: string;
}

@Component
export default class textMixin extends Vue {
  noTitle: boolean = false;

  updateTitle(source: string) {
    if (this.noTitle) {
      const middle = Math.floor(this[source].text.length / 2);
      console.log('middle', middle);
      let firstLine = this[source].text
        .split('')
        .splice(0, middle)
        .join(''); // what if the text is huge? // what if it's tiny?
      console.log('before replace', firstLine);
      firstLine = firstLine.replace(/(<([^>]+)>)/ig, '');
      console.log('after replace', firstLine);
      firstLine =
        firstLine
          .split('')
          .splice(0, 20)
          .join('') + '...';
      console.log('final title', firstLine);

      this[source].title = firstLine;
    } else {
      this[source].title = '';
    }
  }

};
