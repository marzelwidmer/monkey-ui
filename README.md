# Person App


## Create Project
```bash
oc new-project dev \
         --description="Development Stage" \
         --display-name="Development"
```


## Deploy App Docker Image
```
oc new-app --docker-image=c3smonkey/person-app:latest \
     --name='monkey-ui' \
    -l name='monkey-ui' \
    -e SELECTOR=monkey-ui
```

## Expose 
```
oc expose svc/monkey-ui --name=monkey-ui --port=8080
```

Now suppose you want to update to next version of the service, to version 1.1, 
so you need to run next commands to deploy next version of crimes service container, which is pushed at Docker Hub.

### Update Image
```
oc import-image person-app:1.1 --from=c3smonkey/person-app:1.1
```

Then let's prepare the application so when next rollout command is applied, the new image is deployed:
```
oc patch dc/person-app -p '{"spec": { "triggers":[ {"type": "ConfigChange", "type": "ImageChange" , "imageChangeParams": {"automatic": true, "containerNames":["person-app"],"from": {"name":"person-app:1.1"}}}]}}'
```
And finally you can do the rollout of the application by using:
```
oc rollout latest dc/person-app 
```

### Rolback
```
oc rollback person-app-1
```





## Deploy App S2i 
```
oc new-app nodeshift/centos7-s2i-web-app:latest~https://github.com/c3smonkey/person-app.git \
        --name='monkey-ui' \
        -l name='monkey-ui' \
        -e SELECTOR=monkey-ui


        
oc new-app bucharestgold/centos7-s2i-web-app~https://github.com/c3smonkey/person-app.git \
        --name='monkey-ui' \
        -l name='monkey-ui' \
        -e SELECTOR=monkey-ui
```
## Expose 
```
oc expose svc/monkey-ui
```


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
