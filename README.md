
# CADT Test

This app is created with React JS, Vanilla Javascript and Sass.


## Instalation instructions

```
Clone the repository
npm i
npm run rundevel
```


## Dev Dependencies
```
@testing-library/jest-dom: "^5.12.0",
@testing-library/react: "^11.2.6",
concurrently: "^6.0.2",
json-server: "^0.16.3",
stylelint: "^13.13.1",
stylelint-config-sass-guidelines: "^8.0.0"
```


## Organization

As this is a simple app I decided that making a primitive component and then using it passing it it's props would be overdoing it so I've decided to use React pure components. 
I've used React Router Dom to make the routing and the NavLinks it provides to make the nav in the sidebar.
Components are separated in its own folder "components" and each one of them has its own styling and test in the same folder. I thought this would be the easiest way to find each related file.


## Instructions explanation

Testing is done as requested with React Testing Library and Jest. They are done before functional components to see them failing first (and make sure they are working) and then as the component is built, make sure they are passing.
Not gonna lie here, this is my first time applying testing to a React app and I know I have a lot to study still but I'm doing them as complete and deep as I possibly can with the knowledge I have.


## Styles

The styles were made in Sass. I made an index file for the global styles and then a module for each different functional component in each component's folder.



## María Luján Sanchez Cracco

Github: https://github.com/LoohanZero/ 
Linkedin: https://es.linkedin.com/in/lujansanchez