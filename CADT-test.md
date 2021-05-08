# CADT React Test

Create a project through **Create React App** and add json-server to it. Once installed json-server add the file **db.json** from the test zip to the root of the created project. This will work as a data base. Back end should be configured to start at port 5000. Create a script in package.json to run both front and back with **npm run rundevel**.

[json-server](https://www.npmjs.com/package/json-server)

- Create two views. /designs and /setouts
- Each view should get the designs and setouts view from the db.json file and show them on a list. The list component should be a re-usable component for both views. 
- You are free to use axios or fetch api. Both are fine.
- You are free to use your favorite UI kit between those: reactstrap, material ui or scss.
- 60% Test Coverage with Jest + React Testing Library.

Bonus points:

- 100% coverage. 
- Typescript usage. Not mandatory.
- List should show only the items that can be seen on the screen, the rest of the list should be loaded on scroll.
- Add a modal to edit a design or setout by clicking in any place within its row. 
- Responsive support. 


