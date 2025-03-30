## Deployment steps 

#### These steps are for intended only for package contributors, not for end users / consumers.

1. Create build files using the script available. Run `sh scripts/start.sh` which will create build files.
2. The above command could be useful if pipelines are used.
3. Alternatively run `npm run build` to build the files.
4. Validate if dist folder is generated with declaration files.
5. Do npm publish

## Developer advise

1. Always run npm test before publish, to make sure component does not break.
2. Write clean code with proper declarations.