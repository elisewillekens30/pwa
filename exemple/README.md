# Progressive Web Application

## muddygames.bitbucket.io

1. Follow instructions [Bitbucket.io](https://support.atlassian.com/bitbucket-cloud/docs/publishing-a-website-on-bitbucket-cloud/) and [Git.io](https://pages.github.com/)
2. Sample [website](https://muddygames.bitbucket.io/)
3. Create a file called register.js [src](./register.js). This file registers a service worker for offline operation of game.
4. Create a file called service_worker.js [src](./service_worker.js). This file sets applications offline parameters including accessing Webstorage Cache.
5. Create a file called manifest.json [src](./manifest.json), This file specifies how Applications format, icons and startup page.
6. Install Google Lighthouse in Firefox. Run audit and fix any issues in application. 
7. When all issues are corrected and PWA passes all tests install app on mobile or other device.  Installation [install menu](./img/screenshots/install.png). When installed PWA will appear in homescreen [install menu](./img/screenshots/home.png).

8. To setup NodeJS as a Webserver Install the follow
`NodeJs` using command `sudo apt-get install -y nodejs`

Install `npm` using command `sudo apt-get install -y npm`

Check versions of NodeJS and npm using `nodejs -v` and  `npm -v` or `npm --version`

9. To setup webserver create a file package.json in root [src](./package.json).
10. Open terminal in root of project directory
11. Install npm `npm install`
12. Install http-server `sudo npm install -g http-server`
13. Run http-server `http-server`

## Useful links
1. Installing NodeJS and Http-server [Node and Http Server](https://jasonwatmore.com/post/2016/06/22/nodejs-setup-simple-http-server-local-web-server)
2. Refreshing Cache [Force refresh Browser Cache](https://support.mozilla.org/en-US/questions/1103414)



