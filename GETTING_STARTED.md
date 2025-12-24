# Getting Started Guide

This guide will help you set up and customize your personal portfolio website.

## Quick Start

### 1. Install Dependencies

Make sure you have Ruby installed (2.7 or higher), then run:

```bash
gem install bundler
bundle install
```

### 2. Test Locally

Start the Jekyll development server:

```bash
bundle exec jekyll serve
```

Visit `http://localhost:4000` to see your site.

### 3. Customize Your Site

#### Update Site Information

Edit `_config.yml` to update:
- `title`: Your name
- `email`: Your email address
- `description`: Brief description of your site
- `twitter_username`: Your Twitter handle
- `github_username`: Your GitHub username

#### Update Homepage Content

Edit `index.html` to:
- Update the hero section with your introduction
- Add your projects to the projects section
- Update contact information

#### Add Your Blog Posts

Create new posts in `_posts/` directory:

```bash
touch _posts/$(date +%Y-%m-%d)-my-new-post.md
```

Use this template:

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-12-24 10:00:00 +0000
categories: blog
author: Your Name
---

Your content here...
```

#### Customize Styles

Edit `assets/css/style.css` to:
- Change colors (update CSS variables at the top)
- Adjust spacing and fonts
- Add custom animations

### 4. Deploy to GitHub Pages

1. Push your changes to the main branch
2. Go to your repository Settings > Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Save and wait for deployment

Your site will be available at: `https://yourusername.github.io`

## Tips

- Test changes locally before pushing
- Use descriptive commit messages
- Keep images optimized for web
- Write regularly to keep your blog active
- Update your projects as you complete new work

## Need Help?

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [Bootstrap Documentation](https://getbootstrap.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Common Issues

### Port Already in Use

If port 4000 is already in use:

```bash
bundle exec jekyll serve --port 4001
```

### Gem Installation Issues

If you have issues with gems:

```bash
bundle update
bundle install
```

Happy coding! 🚀
