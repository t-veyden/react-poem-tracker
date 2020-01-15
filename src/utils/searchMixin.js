export default {
  data() {
    return {
      search: "",
      searchBy: "title",
      dataStore: ""
    };
  },

  computed: {
    filteredPoems() {
      return this[this.dataStore].filter(poem => {
        return poem[this.searchBy].toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },

  methods: {
    findPoem({query, searchBy}) {
      this.search = query;
      this.searchBy = searchBy;
    }
  }
};
