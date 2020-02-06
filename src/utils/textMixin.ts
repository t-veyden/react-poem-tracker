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

  updateTitle(source: string):void {
    const match = this[source].text.match(/^.*?(?=(<\w+>))/);
    if(match === null) {
      this[source].title = this[source].text;
    } else if(!match[0]) {
      // if there are chars before any tags
      const newMatch = this[source].text.match(/<(\w+)\b[^>]*>.*?<\/\1>/);
      const str = newMatch[0].replace(/<[^>]+>/g, '');
      this[source].title = str;
    } else {
      this[source].title = match[0];
    }
  }
};
