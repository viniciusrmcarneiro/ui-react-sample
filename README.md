Environment
-----------
- This project was not tested in MS Windows environment, so if it do no work, it is not a BUG.
- The application requires Node.JS version 4.4.4(you can use nvm to install it).
- After node is installed execute the command ```npm install``` on the root folder (would be better if you use npm version 3, it is a lot faster).

Style
-----
I'm not good creating design. However I do know how to transform a PSD into html, css and js precisely how it was defined. Also as you may see I'm not good picking colors as well, so I do need a PSD from a professional designer. 

Developmemt mode
----------------
- start the app execute the command ```npm start```
- to access the web page open http://localhost:4000/ on your browser
- to run the tests and see the mocha result page open http://localhost:4000/tests/index.html on your browser
This is a HOT load mode, which means every time you save a file it should update the page right away.
if you left the test page open it will re-run the tests related to the file that has been changed.

Production mode
----------------
- start the app execute the command ```npm run prod```
the app files will be minimized and each file will have hash in it name. 

Karma Tests Mode
----------------
This is used to run your test in each browser drive that is specified and installed. To add more browser you just have to install it's drive for karma. Once karma server is up and running it's possible just open the link http://localhost:9876/ on any browser to run the tests on it, including mobile's browser.

- To run the tests execute the command ```npm run test-coverage```. Now you can check out the coverage report on coverage/lcov-report/index.html or see the result on the terminal output.

- If you need to debug your test run the command ```npm run test-debug```, so it will not have any instrumentation code. Now you can open the http://localhost:9876/ in any browser and create a break point.

Architecture
------------
This project was test on chrome 51.0.2704.103, firefox 47.0, safari 9.1.1, and iPhone iOS 9.3
This is using the approach mobile first
The REACT application will be inside the folder app. As I've used react and redux you will find actions, components, reducers and store folders.
There is test for the actions, reducers and components, the folder tests are:
    ``app/reducers/__tests__``
    ``app/actions/__tests__``
    ``app/components/__tests__``
There are two webpack files one for production and another for development(hot load).
