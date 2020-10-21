const paginationApp = new Vue({
    el: '#pagination-app',
    data: {
        posts: [],
        baseUrl: 'https://nikomax.ru/get_products/section/cooper_cable.json',
        page: 1,
        perPage: 8,
        pages: [],
        checkView: true
    },
    methods: {
        newView(){
            this.checkView = !this.checkView
            console.log(this.checkView)
        },




        getPosts () {
            axios.get(this.baseUrl)
            .then(response => {
                this.posts = response.data;
            })
            .catch(response => {
                console.log(response);
            });
        },
        setPages () {
            let numberOfPages = Math.ceil(this.posts.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate (posts) {
            let page = this.page;
            let perPage = this.perPage;
            let from = (page * perPage) - perPage;
            let to = (page * perPage);
            return posts.slice(from, to);
        },
    },
    computed: {
        displayedPosts () {
            return this.paginate(this.posts);
        }
    },
    watch: {
        posts () {
            this.setPages();
        }
    },
    created () {
        this.getPosts();
    }
});