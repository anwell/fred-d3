# Federal Reserve Economic Data + D3

Visualizations of [Federal Reserve Economic Data](https://research.stlouisfed.org/fred2/) using the D3.js visualization library. Specifically, a look into the [`tags` API](http://api.stlouisfed.org/docs/fred/tags.html). I investigate with 2 types of D3 visualizations:

1. A force-directed graph layout that connects tags together which are related according to the api.
2. A bubble chart that gives a sense of how popular certain tags are among data sets.

## Acquiring the JSON data files
The web app doesn't make live API calls to avoid complexity over securing the API key. Instead, I store a copy of the data locally.

- `tags.json` is populated with data from [http://api.stlouisfed.org/fred/tags?api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json](http://api.stlouisfed.org/fred/tags?api_key=abcdefghijklmnopqrstuvwxyz123456&file_type=json)
- `tags_graph.json` is a processed version of `tags.json`. It runs with [Node.js](http://nodejs.org/). To create `tags_graph.json`, run the following inside the directory:
  1. `npm install`
  2. `node preprocess.js`
