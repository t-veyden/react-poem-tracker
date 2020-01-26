import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
  name: 'searchMixin'
})
export default class searchMixin extends Vue {
  search: string = "";
  searchBy: string = "title";
  dataStore: string = "";

  get filteredPoems() {
    return this[this.dataStore].filter((poem: object) => {
      return poem[this.searchBy]
        .toLowerCase()
        .includes(this.search.toLowerCase());
    });
  }

  findPoem({ query, searchBy }: {query: string, searchBy: string}) {
    this.search = query;
    this.searchBy = searchBy;
  }
};
