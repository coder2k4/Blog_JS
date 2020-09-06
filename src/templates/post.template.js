export function renderPost(post, showButton=true) {
    const postType = post.type === 'news'
        ? '<li class="tag tag-blue tag-rounded">Новость</li>'
        : '<li class="tag tag-green tag-rounded">Заметка</li>';

    const button =  (JSON.parse(localStorage.getItem('favorites')) || []).find(item => item.id === post.id)
            ? `<button class="button-danger button-round button-shadow" type="submit" data-id="${post.id}">Удалить</button>`
            : `<button class="button-primary button-round button-shadow" type="submit" data-id="${post.id}" data-title="${post.title}">Сохранить</button>`;

    const html =
        `
            <div class="panel">
              <div class="panel-head">
                <p class="panel-title">${post.title}</p>
                <ul class="tags">
                  ${postType}
                </ul>
              </div>
              <div class="panel-body">
                <p class="multi-line">${post.fulltext}</p>
              </div>
              <div class="panel-footer w-panel-footer">
                <small>${post.date}</small>
                ${showButton ? button : ''}
              </div>
            </div>
        `;
    return html;
}