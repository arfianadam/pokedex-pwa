# Pokedex PWA
Live at: https://pokedex.arfianadam.com
![PokedexPWALogo](https://github.com/arfianadam/pokedex-pwa/raw/master/static/logo.png)

### Description
It is a pokedex full of all pokemon from all generations. It is a PWA so you can add it to your home screen and open it later even if you don't have internet connection (Android only, only on pokemons you already opened)! Here are some of the features:

- Scroll through hundreds of pokemon in one page
- Or, you can search a pokemon by its name. Searching using any substring of the pokemon still gives you the result
- Or, you can filter by its type (fighting, rock, ghost, etc)
- View the in-game sprites of each pokemon, including the shiny ones!
- Read some information about the pokemon. More detailed information will be coming soon! (look for roadmap below)
- Fully responsive and feels much like an android native application

### Running locally
1. Clone this repo

    ```
    git clone https://github.com/arfianadam/pokedex-pwa.git
    ```
2. Install the dependencies

    ```
    yarn
    ```
    or
    ```
    npm install
    ```
3. Run the dev server

    ```
    yarn dev
    ```
    or
    ```
    npm run dev
    ```
4. Visit the url

    ```
    http://localhost:3000
    ```

### Roadmap
I also decided to continue this development to create a truly immersive Pokedex on the web! I have a roadmap that will help me (or even you, contributors are welcome) to make it better.

- [ ] Display more detailed and more attractive information. Stats will be like radar, etc.
- [ ] More accurate loading indicators by keeping track of all outgoing requests.
- [ ] Better `Helmet` usage to improve SEO and social media cards.
- [ ] Enable a filter where users can filter the pokemon by pretty much anything, not only by its type.
- [ ] Enable a sorter to sort pokemons by some criterias, like stats, height, weight, etc.
- [ ] Implement better page navigation, save user scroll location by using persistance storage method for the pokemon list. Right now it is filtering on the component, so when the component unmounted and remounted again the page information is lost therefore user's scroll position is discarded.
- [ ] Add error image handler on every image by creating custom image component. Because some pokemon images are missing.
- [ ] Think a new caching strategy to ensure better offline viewing.
- [ ] ??? You decide

### About this application structures and how it works
- No server side data fetching because I want this to be as responsive as possible
- All pokemon are loaded in the initial render because the API doesn't have endpoint for searching a pokemon. So I need the complete list of pokemon to enable pokemon searching.
- But the detail of the pokemon is not chain-loaded after the load of the pokemon list because then it will take much much much longer to get the complete data. One pokemon's detail size can be as big as hundreds of kilobytes!
- Components must be separated into two components at least, one is smart component, the other is dumb component. Smart component will handle all data fetching and management including connecting to redux store and other side-effect things. Dumb component is for presentational only and for some DOM manipulation. This is to avoid spaghetti code when the application gets bigger and more complex.
- Any API response for more detailed information about pokemon or pokemon type is not stored on redux store, because it will increase the complexness of handling offline data (can be improved). All requests are cached by the service workers.
- The list of pokemon is limited only to 20 pokemons and gradually increase as the user scrolls through the page. Rendering all 800 pokemons at once will reduce site performance significantly.
