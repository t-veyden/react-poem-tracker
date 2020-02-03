import Vue from 'vue';
import Component from 'vue-class-component';

interface SearchOptions {
  query: string;
  searchBy: string;
}

@Component({
  name: 'searchMixin'
})
export default class searchMixin extends Vue {
  search: string = '';
  searchBy: string = 'title';
  dataStore: string = '';

  get filteredPoems(): object {
    return this[this.dataStore].filter(
      <T extends object, U extends keyof T>(poem: T) => {
        const key: U = this.searchBy;
        const target: string =
          poem[key] instanceof Object ? poem[key].name : poem[key];
        return target.toLowerCase().includes(this.search.toLowerCase());
      }
    );
  }

  findPoem({ query, searchBy }: SearchOptions) {
    this.search = query;
    this.searchBy = searchBy;
  }
}
