'use strict';

const block = document.querySelector('.blogs');
const url = 'https://jsonplaceholder.typicode.com/posts';

const createNode = (elem) => document.createElement(elem);

const append = (parent, element) => parent.appendChild(element);

function getInfo(link, setFunc) {
  fetch(link)
    .then((res) => res.json())
    .then((data) => setFunc(data))
    .catch((error) => console.log(error));
}

const handler = (event) => {
  const postId = event.currentTarget.getAttribute('post-id');
  const commentLink = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

  const setComments = (postComment) => {
    const newBlock = document.querySelector(`[post-id = "${postId}"]`);

    const blockComments = createNode('div');
    const commentTitle = createNode('h4');

    blockComments.classList.add('comments');
    commentTitle.classList.add('comment__title');

    append(newBlock, blockComments);
    append(blockComments, commentTitle);

    commentTitle.textContent = 'Комментарии';

    postComment.forEach((element) => {
      const name = createNode('div');
      const email = createNode('div');
      const message = createNode('div');

      name.classList.add('user');
      email.classList.add('mail');
      message.classList.add('userMessage');

      append(blockComments, name);
      append(blockComments, email);
      append(blockComments, message);

      name.textContent = element.name;
      email.textContent = element.email;
      message.textContent = element.body;
    });

    newBlock.removeEventListener('click', handler);
  };

  getInfo(commentLink, setComments);
};

const setData = (dataInfo) => {
  dataInfo.forEach((dataBlog) => {
    const newBlock = createNode('div');
    const title = createNode('div');
    const body = createNode('div');

    newBlock.classList.add('post');
    newBlock.setAttribute('post-id', dataBlog.id);
    title.classList.add('post__title');
    body.classList.add('post__body');

    title.textContent = dataBlog.title;
    body.textContent = dataBlog.body;

    if (dataBlog.id <= 10) {
      append(newBlock, title);
      append(newBlock, body);
      append(block, newBlock);
    }
  });

  const posts = document.querySelectorAll('.post');
  posts.forEach((post) => {
    post.addEventListener('click', handler);
  });
};

getInfo(url, setData);
