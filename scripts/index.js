import {localStorageUtil} from "./browserStorageUtil.js";

const clearBlogForm = () => {
  document.getElementById("blogImage").value = "";
  document.getElementById("blogArticle").value = "";
  document.getElementById("blogTitle").value = "";
};

const addBlog = (event) => {
  event.preventDefault();
  const imageUrl = document.getElementById("blogImage").value;
  const article = document.getElementById("blogArticle").value;
  const title = document.getElementById("blogTitle").value;
  const blogRow = document.getElementById("blogRow");
  const id = localStorageUtil.getEntry("blogs").length + 1;
  blogRow.innerHTML =
    blogRow.innerHTML + getBlogHtml({id, article, title, imageUrl});
  const blogs = localStorageUtil.getEntry("blogs");
  blogs.push({id, article, imageUrl, title});
  localStorageUtil.setEntry("blogs", blogs);
  clearBlogForm();
  $("#addBlogModal").modal("hide");
  blogRow.scrollIntoView();
};

const getBlogHtml = ({id, title, imageUrl, article}) => `
  <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
      <div class="card h-100">
        <img src="${imageUrl}" class="img img-fluid blogCardImage card-img-top" alt="${title}">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text blogPara" >${article}</p>
          <button class="btn btn-success" data-bs-toggle="modal"
          data-bs-target="#blog${id}">View Full Blog</button>
        </div>
      </div>
      <div
      class="modal fade"
      id="blog${id}"
      tabindex="-1"
      aria-labelledby="blog${id}"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
          </div>

          <div class="modal-body">          
          <p class="card-text blogContentModal" >${article}</p>
          <img src="${imageUrl}" class="img img-fluid" alt="${title}">
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
   </div>
  `;

const init = () => {
  const blogs = localStorageUtil.getEntry("blogs");
  if (blogs && blogs.length > 0) {
    let blogHtml = "";
    blogs.forEach((blog) => {
      blogHtml = `${blogHtml}
        ${getBlogHtml(blog)}
      `;
    });
    let blogRow = document.getElementById("blogRow");
    blogRow.innerHTML = blogRow.innerHTML + blogHtml;
  } else {
    const blogsToSave = [
      {
        id: 1,
        title: "Sample Blog 1",
        article:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkIPFEMROTEzpsTz0Mxfs477vaMsKPQs6tOg&usqp=CAU",
      },
      {
        id: 2,
        title: "Sample Blog 2",
        article:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",
        imageUrl:
          "data:image/jpeg;base64,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",
      },
      {
        id: 3,
        title: "Sample Blog 3",
        article:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.",
        imageUrl:
          "data:image/jpeg;base64,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",
      },
    ];
    let blogHtml = "";
    blogsToSave.forEach((blog) => {
      blogHtml = `${blogHtml}
        ${getBlogHtml(blog)}
      `;
    });
    let blogRow = document.getElementById("blogRow");
    blogRow.innerHTML = blogRow.innerHTML + blogHtml;
    localStorageUtil.setEntry("blogs", blogsToSave);
  }
};

const form = document.getElementById("addBlogForm");
form.addEventListener("submit", addBlog);
window.onload = () => {
  init();
};
