# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### Bugfixes ###
* /node_modules/primereact/components/treetable/TreeTable.js
    
    add className on create p-treetable find and replace

var className = (0, _classnames.default)('p-treetable p-component', {
        'p-treetable-hoverable-rows': this.isRowSelectionMode(),
        'p-treetable-resizable': this.props.resizableColumns,
        'p-treetable-resizable-fit': this.props.resizableColumns && this.props.columnResizeMode === 'fit',
        'p-treetable-auto-layout': this.props.autoLayout
      }, this.props.className);