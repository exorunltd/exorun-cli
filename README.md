# Exorun CLI

![exorun logo](https://avatars0.githubusercontent.com/u/65603591?s=200&v=4)

[![Build Status](https://travis-ci.com/exorunltd/exorun-cli.svg?branch=master)](https://travis-ci.com/exorunltd/exorun-cli)
![npm](https://img.shields.io/npm/v/exorun-cli)
![GitHub](https://img.shields.io/github/license/exorunltd/exorun-cli)

The Exorun CLI is used to manage exorun apps from the command line.

# Installation

```
npm install -g exorun-cli
```

[![NPM](https://nodei.co/npm/exorun-cli.png)](https://nodei.co/npm/exorun-cli/)

# Issues

For problems directly related to the CLI, [add an issue on GitHub](https://github.com/exorunltd/exorun-cli/issues/new).

[Contributors](https://github.com/exorunltd/exorun-cli/contributors)

# Commands

### Login

Login into your account

```
 exorun login
```

### Logout

Logout of your account

```
 exorun logout
```

### Register

Create account on exorun

```
exorun register
```

### List all your instances

List all of your instances

```
exorun ls - List all your instances
```

### Regions

List all available regions

```
exorun regions
```

### Create new instance

Create a new instance

```
exorun create [name]
```

### Delete instance

Delete a instance by name

```
exorun delete [name]
```

### List templates

List all available premaide templates

```
exorun list-templates
```

## Template

Retrieve the template Dockerfile

```
exorun template [template-name]
```
