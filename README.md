# DeepPrior Website

Minimal static GitHub Pages site for DeepPrior.

## Structure

- `index.html`: landing page
- `assets/styles/main.css`: all styling and layout
- `assets/scripts/site-data.js`: editable brand and committee content
- `assets/scripts/main.js`: team rendering, reveal logic, and hero canvas animation
- `assets/media/`: placeholder brand assets

## Editing Content

- Update the organization name, tagline, committee copy, and member cards in `assets/scripts/site-data.js`.
- Replace `assets/media/deepprior-mark.svg` with the final DeepPrior logo when ready.
- Add portrait files to `assets/media/` and set each member `image` value in `assets/scripts/site-data.js`.

## Hero Animation

The moving background is a lightweight canvas animation, not a GIF. This is the usual premium approach for landing pages because it stays sharp, loads faster, and is easier to tune than a looping video or GIF.

## Deploy To GitHub Pages

1. Push to `main`.
2. In GitHub repository settings, enable Pages and set the source to `GitHub Actions`.
3. The workflow in `.github/workflows/deploy.yml` will publish the site.
