# doorman

## Install and configure the Amplify CLI.

```bash
npm install -g @aws-amplify/cli
```

## amplify

```bash
amplify init
# app: doorman
# env: demo

amplify auth add
amplify analytics add
amplify push

amplify api add # users
amplify api add # history
amplify push

amplify hosting add
amplify publish
```

## rewrite

```
</^[^.]+$|\.(?!(js|css|gif|ico|jpg|png|svg|txt|json|map|woff|ttf)$)([^.]+$)/>    /index.html    200
```
