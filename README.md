# guneyguven.github.io

Güven's Personal Portfolio Website

## About

This is a personal portfolio website built with Bootstrap for responsive design and Jekyll for static site generation and blogging capabilities. The site is hosted on GitHub Pages.

## Features

- 📱 Responsive Bootstrap-based design
- 📝 Jekyll-powered blogging system
- 🎨 Modern and clean portfolio layout
- 🚀 GitHub Pages compatible

## Technologies

- **Bootstrap 5**: For responsive front-end design
- **Jekyll**: Static site generator for blogging
- **HTML5/CSS3**: Core web technologies
- **GitHub Pages**: Hosting platform

## Getting Started

### Prerequisites

- Ruby (version 2.7 or higher)
- Bundler gem
- Jekyll gem

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/guneyguven/guneyguven.github.io.git
   cd guneyguven.github.io
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the Jekyll development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:4000
   ```

### Building for Production

To build the site for production:

```bash
bundle exec jekyll build
```

The generated site will be in the `_site` directory.

## Project Structure

```
.
├── _includes/          # Reusable HTML components
├── _layouts/           # Page templates
├── _posts/             # Blog posts (Markdown files)
├── assets/             # CSS, JavaScript, images
│   ├── css/
│   ├── js/
│   └── images/
├── _config.yml         # Jekyll configuration
├── index.html          # Homepage
├── .gitignore          # Git ignore rules
├── LICENSE             # MIT License
└── README.md           # This file
```

## Writing Blog Posts

Create new blog posts in the `_posts` directory with the following naming convention:

```
YYYY-MM-DD-title-of-post.md
```

Example post structure:

```markdown
---
layout: post
title: "Your Post Title"
date: 2025-12-24
categories: blog
---

Your content here...
```

## Customization

- **Site Settings**: Edit `_config.yml` to update site title, description, and other settings
- **Styling**: Modify CSS files in `assets/css/`
- **Layouts**: Edit templates in `_layouts/` to change page structure
- **Components**: Update reusable components in `_includes/`

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please reach out through the contact form on the website or via GitHub.
