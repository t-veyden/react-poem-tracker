export default {
  data() {
    return {
      search: "",
      dataStore: ""
    };
  },

  computed: {
    filteredPoems() {
      return this[this.dataStore].filter(poem => {
        return poem.title.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },

  methods: {
    findPoem(query) {
      this.search = query;
    }
  }
};
