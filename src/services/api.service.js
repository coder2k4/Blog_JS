class ApiService {
    constructor(baseURL) {
        this.url = baseURL;
    }

    async createPost(post) {
        try {
            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            });
            return this.useRequest(request);
        } catch (e) {
            console.error(e);
        }

    }

    async fetchPosts() {
        try {
            const request = new Request(this.url + '/posts.json');
            return this.useRequest(request);
        } catch (e) {
            console.error(e);
        }
    }

    async fetchPostsById(id) {
        try {
            const request = new Request(this.url + `/posts/${id}.json`);
            return this.useRequest(request);
        } catch (e) {
            console.error(e);
        }
    }

    async useRequest(request){
        const response = await fetch(request);
        return await response.json();
    }
}


export const apiService = new ApiService('https://blogjs-bca89.firebaseio.com');