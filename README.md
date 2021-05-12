
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
In the Designs page I tried firts to do the column title's through de json so I tried a reducer (it worked), but then I thought I had to capitalize every first letter and add spaces to the titles and decided against it (it seemed complicating it too much) and made an enum with the hardcoded names in an array.
I repeated the method on the Setouts page and decided to make the information perfectly legible before sending it to the List component so the logic would be only to display it, with barely logic except to show the modal.
On the Modal I started doing a reducer but the dispatchs were all too similar so I decided that with a very simple and reusable function with useState I would arrive to the same result.
When I started the modal to send the modified information back to de database I realized a context would have been better as the reducers all have similar calls (except for one or two) and the users information should be used as well in the modal when modifying the designs.
I finally refactored the app to be made with context and i reduced a lot of repeated code, then I moved all of the small functions to a helpers file to clean the main pages, list and modal.
Finally I tried with the tests (I was trying to make them before the front but I realized I was losing a lot of valuable time bumping into errors so I decided to keep them for last in the end, although I know it's not the procedure). I made most of the test work for the helpers except the ones that included the replaceAll function. Trying to find the reason why, I read that jest is not yet able to test it.
I tried doing the test of the context in the designs and setouts pages but i was not able to bring the information or mock the information itself so the only thing i could do is prove that the loader is removed.
I was able to manage all of the list test to pass except that i didn't test nulls or undefined although I know I should have and in the future I'm planning to make the reducer function.
I do know I still have a lot to learn but I really had fun with this test and even if you don't think i have the level to work with you, I'll still get this project better to keep on learning testing as it's actually my current goal.

Have a nice day and thank you for the opportunity.



## Styles

The styles were made in Sass. I made an index file for the global styles and then a module for each different functional component in each component's folder.



## María Luján Sanchez Cracco

Github: https://github.com/LoohanZero/ 
Linkedin: https://es.linkedin.com/in/lujansanchez