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
      
* /node_modules/primereact/components/treetable/TreeTableScrollableView.js
          
          not working auto set Scroll Height
          
    key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState, snapshot) {
          if (!this.props.frozen) {
            this.alignScrollBar();
          }
          if (this.props.scrollHeight !== prevProps.scrollHeight) { this.setScrollHeight(); }
        }
   
* /node_modules/primereact/components/treetable/TreeTableScrollableView.js
             
          not added style and class for col
          
    key: "renderColGroup",
        value: function renderColGroup() {
          if (this.props.columns && this.props.columns.length) {
            return /*#__PURE__*/_react.default.createElement("colgroup", {
              className: "p-treetable-scrollable-colgroup"
            }, this.props.columns.map(function (col, i) {
              return /*#__PURE__*/_react.default.createElement("col", {
                key: col.field + '_' + i,
                style: col.props.headerStyle || col.props.style,
                className: col.props.headerClassName || col.props.className
              });
            }));
          } else {
            return null;
          }
        }
