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
  console.log({title, article, imageUrl});
  clearBlogForm();
};

const form = document.getElementById("addBlogForm");
form.addEventListener("submit", addBlog);
