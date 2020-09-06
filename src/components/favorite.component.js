import {Component} from "../core/component";
import {apiService} from "../services/api.service";
import {renderPost} from "../templates/post.template";


export class FavoriteComponent extends Component {
    constructor(id, loader) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener('click', favLinkHandler.bind(this));
    }

    onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'));
        const html = renderList(favorites);
        this.$el.innerHTML = html;
    }

    onHide() {
        this.$el.innerHTML = '';
    }
}

async function favLinkHandler(event) {
    event.preventDefault();
    if (event.target.classList.contains('fav-link')) {
        this.loader.show();
        const post = await apiService.fetchPostsById(event.target.getAttribute('href'));
        const html = renderPost(post, false);
        this.loader.hide();
        this.$el.innerHTML = html;
    }
}

function renderList(favorites = []) {
    if (favorites && favorites.length)
        return '<ul>' +
            favorites.map(item => `<li><a href="${item.id}" title="Отрыть избранный пост" class="fav-link">${item.title}</a></li>`).join(' ') +
            '</ul>';
    return `<p>У Вас нет избранного.</p>`;
}