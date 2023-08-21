name: kaminocrm.com.br CI
on:
  push:
    branches:
      - main
      
jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout do repository
        uses: actions/checkout@v2
      - name: Use Node.js 16
        uses: actions/setup-node@v2
        with:
          node-version: 16
      - name: yarn cache
        uses: actions/cache@v3
        with:
          path: '**/node_modules'
          key: ${{ runner.os }}-modules-${{ hashFiles('**/yarn.lock') }}
      - name: Intall yarn
        run: npm install -g yarn
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn
      - name: Build
        run: yarn build
        env:
         CI: ""
      - name: Deploy no host
        uses: easingthemes/ssh-deploy@main
        env: 
          SSH_PRIVATE_KEY: ${{ secrets.SERVER_SSH_KEY }}
          ARGS: "-rltgoDzvO --delete"
          SOURCE: "./build"
          REMOTE_HOST: ${{ secrets.REMOTE_HOST }}
          REMOTE_USER: ${{ secrets.REMOTE_USER }}
          TARGET: ${{ secrets.REMOTE_TARGET }}
          EXCLUDE: "/node_modules/"
