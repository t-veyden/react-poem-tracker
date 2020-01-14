export default {
  data() {
    return {
      search: ""
    };
  },

  computed: {
    filteredPoems() {
      return this.completedPoems.filter(poem => {
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
