const fs = require('fs');
const path = require('path');

const files = [
  'ux-blog/index.html',
  'ux-blog.html',
  'ux_blog.html'
];

files.forEach(f => {
  const fullPath = path.join(__dirname, '..', 'implementation', f);
  if (!fs.existsSync(fullPath)) return;

  let content = fs.readFileSync(fullPath, 'utf8');

  // Replace postit-title and postit-excerpt in renderCards template
  content = content.replace(
    '<h3 class="postit-title">${post.title}</h3>',
    '<h3 class="postit-title"><a href="/ux-blog/post-${post.id}/" style="color:inherit; text-decoration:none;">${post.title}</a></h3>'
  );

  content = content.replace(
    '<p class="postit-excerpt">${post.excerpt}</p>',
    '<p class="postit-excerpt"><a href="/ux-blog/post-${post.id}/" style="color:inherit; text-decoration:none;">${post.excerpt}</a></p>'
  );

  // Add click handler to postit-body container
  content = content.replace(
    '<div class="postit-body">',
    '<div class="postit-body" onclick="if (!event.target.closest(\'.icon-action-btn\')) location.href=\'/ux-blog/post-\' + post.id + \'/\';" style="cursor:pointer;">'
  );

  // Add hover effect for postit-title links in CSS
  if (!content.includes('.postit-title a:hover')) {
    content = content.replace(
      '.postit-title {',
      '.postit-title a:hover { text-decoration: underline; }\n    .postit-title {'
    );
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Made title and excerpt clickable in:', f);
});
