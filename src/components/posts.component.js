import {Component} from "../core/component";
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";
import {renderPost} from "../templates/post.template";

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    async onShow() {
        this.loader.show();
        const data = await apiService.fetchPosts();
        const posts = TransformService.fbObjectToArray(data);
        const html = posts.map(post => renderPost(post));
        this.loader.hide();
        this.$el.insertAdjacentHTML('afterbegin', html.join(' '));
    }

    onHide() {
        this.$el.innerHTML = '';
    }

    init() {
        this.$el.addEventListener('click', buttonHandler.bind(this));
    }
}

/**
 * Функция обработки клика на кнопке сохранить/удалить пост из избанного
 * @param event
 */
function buttonHandler(event) {

    const id = event.target.dataset.id;
    const title = event.target.dataset.title;

    if (id) {
        let store = getFromLocalStorage('favorites');
        if(compareIdInLocalStorage(id))
        {
            store = store.filter(elementId => id !== elementId.id);
            event.target.innerText = 'Сохранить';
            event.target.classList.add('button-primary');
            event.target.classList.remove('button-danger');
        }
        else
        {
            store.push( {id,title} );
            event.target.innerText = 'Удалить';
            event.target.classList.remove('button-primary');
            event.target.classList.add('button-danger');
        }

        setToLocalStorage('favorites', store);
    }
}

/**
 * Функция для сравнения ID кнопки в LocalStorage
 */
function compareIdInLocalStorage(id)
{
    return getFromLocalStorage('favorites').find(item => id === item.id);
}

function getFromLocalStorage(name)
{
    return (JSON.parse(localStorage.getItem(name)) || []);
}

function setToLocalStorage(name, data)
{
    localStorage.setItem(name, JSON.stringify(data));
}
