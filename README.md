# MACRO4BIM

## blog with Vite+React TS

This is a quick yet efficient blog webapp empowering the use of MDX format to write blog posts.
To grant interactivity, the webapp is connected with a firestore database which permit user collections as well as metadata for posts such as comments, votes or visualizations.

### technical

the MDX rendering is permit thanks to the libraries

- mdx-js
- remark-frontmatter
- remark-gfm

and their import is quickly done through Vite function _import.meta.glob()_
