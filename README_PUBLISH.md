Quick publish options

1) Fastest (requires a GitHub Personal Access Token - PAT)

- Create a PAT with `repo` scope.
- Run from repo root:

```bash
GITHUB_TOKEN=ghp_xxx ./publish_with_token.sh
```

This will set `origin` to use the token and push `main`.

2) SSH (recommended long-term)

- Generate an SSH key if you don't have one:

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
cat ~/.ssh/id_ed25519.pub
```

- Add the public key to https://github.com/settings/keys, then:

```bash
git remote set-url origin git@github.com:guneyguven/guneyguven.github.io.git
git push origin main:main
```

3) Web upload (no CLI auth)

- I created `site-deploy.zip` in the repo root. You can extract it locally and use GitHub's "Add file → Upload files" to upload the site files to the `main` branch.

4) After push: verify GitHub Pages at:

https://github.com/guneyguven/guneyguven.github.io/settings/pages

Ensure source is `main` branch and folder `/ (root)`. Visit https://guneyguven.github.io after build finishes.
