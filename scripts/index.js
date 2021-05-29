function addBlog(event) {
  console.log(event);
  event.preventDefault();
}

const form = document.getElementById("addBlogForm");
form.addEventListener("submit", addBlog);
